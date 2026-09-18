import { Float } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useInView } from 'react-intersection-observer';

import { pulseEnvelope } from '@/lib/envelope';
import { gsap } from '@/lib/gsap';
import { randomizeText, scrambleReveal } from '@/lib/scrambleReveal';
import { useDeviceOrientation } from '@/hooks/useDeviceOrientation';
import {
  type TactilePulseRefs,
  useTactilePulse,
} from '@/hooks/useTactilePulse';
import { useViewport } from '@/hooks/useViewport';

import Scene from '@/components/Hero/Partials/Scene';
import ScrollButton from '@/components/Hero/Partials/ScrollButton';
import TapRipple, { type Ripple } from '@/components/Hero/Partials/TapRipple';

import { useLocale } from '@/locale/LocaleContext';

type GyroRef = React.MutableRefObject<{ x: number; y: number }>;

function Rig({
  isMobile,
  gyroRef,
  pulse,
}: {
  isMobile: boolean;
  gyroRef: GyroRef;
  pulse: TactilePulseRefs;
}) {
  useFrame((state, delta) => {
    let inputX = isMobile ? gyroRef.current.x * 0.6 : state.pointer.x;
    let inputY = isMobile ? gyroRef.current.y * 0.6 : state.pointer.y;

    // Camera kick: blend the loudest active pulse NDC into the input via the
    // shared envelope so camera and particle wave breathe together.
    const now = performance.now();
    let bestEnv = 0;
    let kickX = 0;
    let kickY = 0;
    const arr = pulse.pulses.current;
    for (let i = 0; i < arr.length; i++) {
      const p = arr[i];
      const age = (now - p.startedAt) / pulse.duration;
      if (age < 0 || age >= 1) continue;
      const env = pulseEnvelope(age);
      if (env > bestEnv) {
        bestEnv = env;
        kickX = p.ndcX;
        kickY = p.ndcY;
      }
    }
    if (bestEnv > 0) {
      inputX = inputX * (1 - bestEnv) + kickX * bestEnv;
      inputY = inputY * (1 - bestEnv) + kickY * bestEnv;
    }

    easing.damp3(
      state.camera.position,
      [Math.sin(-inputX) * 1.5, inputY * 1.75, 15 + Math.cos(inputX) * 5],
      0.2,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function FrameloopController({ inView }: { inView: boolean }) {
  const setFrameloop = useThree((s) => s.setFrameloop);
  const hasBeenVisible = React.useRef(false);

  useEffect(() => {
    if (inView) {
      hasBeenVisible.current = true;
      setFrameloop('always');
    } else if (hasBeenVisible.current) {
      setFrameloop('never');
    }
  }, [inView, setFrameloop]);

  return null;
}

export default function Hero(): React.JSX.Element {
  const { t } = useLocale();
  const viewport = useViewport();
  const isMobile = viewport === 'mobile';
  const gyroRef = useDeviceOrientation(isMobile);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.01,
  });
  const [isMounted, setIsMounted] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Shared tap source: drives Rig kick, particle shockwaves, haptic + ripples.
  const pulse = useTactilePulse({
    durationMs: 2000,
    maxPulses: 2,
    haptic: true,
    onTap: useCallback(
      ({ clientX, clientY }: { clientX: number; clientY: number }) => {
        const id =
          typeof performance !== 'undefined' ? performance.now() : Date.now();
        setRipples((prev) => [...prev, { id, x: clientX, y: clientY }]);
        window.setTimeout(
          () => setRipples((prev) => prev.filter((r) => r.id !== id)),
          700,
        );
      },
      [],
    ),
  });

  const headlineRef = useRef<HTMLDivElement>(null);
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const headlinePart1Ref = useRef<HTMLSpanElement>(null);
  const headlinePart2Ref = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (sceneReady) {
      canvasElRef.current = document.querySelector('canvas');
    }
  }, [sceneReady]);

  const forwardPointerToCanvas = useCallback((e: React.PointerEvent) => {
    canvasElRef.current?.dispatchEvent(
      new PointerEvent(e.type, {
        clientX: e.clientX,
        clientY: e.clientY,
        pointerId: e.pointerId,
        pointerType: e.pointerType,
        bubbles: true,
      }),
    );
  }, []);

  const handleReady = useCallback(() => setSceneReady(true), []);

  useEffect(() => {
    if (!sceneReady) return;
    window.dispatchEvent(new Event('hero:ready'));
    if (
      !headlineRef.current ||
      !greetingRef.current ||
      !nameRef.current ||
      !headlinePart1Ref.current ||
      !headlinePart2Ref.current
    )
      return;

    // Pre-fill both with scrambled text right away
    greetingRef.current!.textContent = randomizeText(t.heroGreeting);
    nameRef.current!.textContent = randomizeText(t.heroName);

    const tl = gsap.timeline({ delay: 0.3 });
    tlRef.current = tl;

    // 1. Slide headline container in
    tl.fromTo(
      headlineRef.current,
      { yPercent: 50, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
    );

    // 2. Scramble-reveal greeting
    tl.add(scrambleReveal(greetingRef.current!, t.heroGreeting, 1.5), 0);

    // 3. Scramble-reveal name
    tl.add(scrambleReveal(nameRef.current!, t.heroName, 1.5), '+=0.3');

    // 5. Headline part 1 — slide in from left
    tl.fromTo(
      headlinePart1Ref.current,
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
      '+=0.3',
    );

    // 6. Headline part 2 — slide in from right
    tl.fromTo(
      headlinePart2Ref.current,
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
      '+=0.2',
    );

    return () => {
      tl.kill();
    };
  }, [sceneReady, t.heroGreeting, t.heroName, t.heroHeadline]);

  return (
    <section
      ref={ref}
      id='home'
      className='font-grotesk relative flex h-[99vh] w-full flex-col items-center justify-center bg-[#001a2500] overflow-hidden'
    >
      {isMounted ? (
        <ErrorBoundary
          fallback={
            <div className='flex h-full w-full items-center justify-center text-white'>
              <p>{t.heroErrorFallback}</p>
            </div>
          }
        >
          <div
            className={`h-full w-full transition-opacity duration-700 ease-out ${sceneReady ? 'opacity-100' : 'opacity-0'}`}
          >
            <Canvas
              shadows='percentage'
              frameloop='always'
              camera={{ position: [0, 0, -21], fov: 50 }}
              dpr={[0.25, 1]}
              eventPrefix='client'
              gl={{ antialias: false }}
              className='min-h-[97vh]'
            >
              <color
                attach='background'
                args={[0 / 3072, 26 / 3072, 37 / 3072]}
              />
              <FrameloopController inView={inView} />
              <Rig isMobile={isMobile} gyroRef={gyroRef} pulse={pulse} />
              <spotLight
                position={[20, 20, 10]}
                penumbra={1}
                castShadow
                angle={0.2}
              />
              <Suspense fallback={null}>
                <Float
                  speed={0.8}
                  floatIntensity={0.2}
                  floatingRange={[-3.5, 3.5]}
                  rotationIntensity={0.5}
                >
                  <Scene
                    onReady={handleReady}
                    isMobile={isMobile}
                    viewport={viewport}
                    gyroRef={isMobile ? gyroRef : undefined}
                    pulse={pulse}
                  />
                </Float>
              </Suspense>
            </Canvas>
          </div>

          {/* Names */}
          <div className='absolute z-20 top-[100px] left-[20px] md:top-[80px] md:left-auto md:right-[20px] lg:top-1/3 lg:right-[5%] pointer-events-none'>
            <div
              className='pointer-events-auto select-text md:text-right'
              onPointerMove={forwardPointerToCanvas}
            >
              <h2
                ref={greetingRef}
                className='inline-block gradient bg-linear-to-r from-raspberry to-orange-dark px-6 py-2 text-3xl sm:text-4xl xl:text-6xl xxl:text-8xl font-medium text-white tracking-wider mb-3 min-h-[1.2em]'
              >
                &nbsp;
              </h2>
              <br />
              <h2
                ref={nameRef}
                className='inline-block gradient bg-linear-to-r from-orange-dark to-raspberry px-6 py-2 text-3xl sm:text-4xl xl:text-6xl xxl:text-8xl font-medium text-white tracking-wider mb-6 min-h-[1.2em]'
              >
                &nbsp;
              </h2>
            </div>
          </div>

          {/* Headline */}
          <div
            ref={headlineRef}
            className='absolute z-20 bottom-[140px] right-[20px] lg:bottom-auto lg:top-[55%] lg:right-[5%] pointer-events-none opacity-0 text-right p-4'
          >
            <div className='flex flex-col gap-2 items-end xl:gap-6'>
              <span
                ref={headlinePart1Ref}
                className='block w-fit text-2xl sm:text-3xl xl:text-4xl xxl:text-6xl text-white font-medium tracking-wide drop-shadow-[0_2px_8px_#00000080] uppercase opacity-0 backdrop-blur-[10px] px-4 py-2'
              >
                {t.heroHeadline.split('. ')[0]}.
              </span>
              <span
                ref={headlinePart2Ref}
                className='block w-fit text-2xl sm:text-3xl xl:text-4xl xxl:text-6xl text-white font-medium tracking-wide drop-shadow-[0_2px_8px_#00000080] uppercase opacity-0 backdrop-blur-[10px] px-4 py-2'
              >
                {t.heroHeadline.split('. ')[1]}
              </span>
            </div>
          </div>
        </ErrorBoundary>
      ) : (
        <div className='flex h-full w-full items-center justify-center'>
          <span className='loader' />
        </div>
      )}
      <TapRipple ripples={ripples} />
      <ScrollButton />
      <div className='flex w-full'>
        <div className='z-20 -mt-[20px] h-[20px] w-full bg-white' />
        <div className='arrow-down blue-hero' />
        <div className='z-20 -mt-[20px] h-[20px] w-full bg-white' />
      </div>
    </section>
  );
}
