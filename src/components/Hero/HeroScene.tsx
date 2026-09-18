import { Float } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useInView } from 'react-intersection-observer';

import { pulseEnvelope } from '@/lib/envelope';
import {
  type GyroRef,
  useDeviceOrientation,
} from '@/hooks/useDeviceOrientation';
import {
  type TactilePulseRefs,
  useTactilePulse,
} from '@/hooks/useTactilePulse';
import { useViewport } from '@/hooks/useViewport';

import Scene from '@/components/Hero/Partials/Scene';
import TapRipple, { type Ripple } from '@/components/Hero/Partials/TapRipple';

import { useLocale } from '@/locale/LocaleContext';

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

export default function HeroScene(): React.JSX.Element {
  const { t } = useLocale();
  const { tier } = useViewport();
  const isMobile = tier === 'mobile';
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // useTactilePulse binds its pointer listener to the <canvas>, which does not
  // exist on first mount — this is how it learns to retry.
  useEffect(() => {
    if (!sceneReady) return;
    window.dispatchEvent(new Event('hero:ready'));
  }, [sceneReady]);

  const handleReady = useCallback(() => setSceneReady(true), []);

  return (
    <div ref={ref} className='absolute inset-0 z-0' aria-hidden='true'>
      <ErrorBoundary
        fallback={
          <div className='flex h-full w-full items-center justify-center text-white/60'>
            <p>{t.heroErrorFallback}</p>
          </div>
        }
      >
        {isMounted && (
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
                    viewport={tier}
                    gyroRef={isMobile ? gyroRef : undefined}
                    pulse={pulse}
                  />
                </Float>
              </Suspense>
            </Canvas>
          </div>
        )}
      </ErrorBoundary>

      <TapRipple ripples={ripples} />
    </div>
  );
}
