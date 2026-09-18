import {
  ThreeElements,
  useFrame,
  useLoader,
  useThree,
} from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { pulseEnvelope } from '@/lib/envelope';
import type { TactilePulseRefs } from '@/hooks/useTactilePulse';

import {
  getImageSourceFromTexture,
  sampleTextureToParticleGeometry,
} from '@/components/Hero/Partials/imageParticles/geometryFromImageSource';
import fragmentShader from '@/components/Hero/Partials/shaders/heroParticles.frag.glsl';
import vertexShader from '@/components/Hero/Partials/shaders/heroParticles.vert.glsl';

type CoreProps = ThreeElements['group'] & {
  texture: THREE.Texture;
  threshold?: number;
  targetWidth?: number;
  maxSampleWidth?: number;
  particlesPosition?: [number, number, number];
  enableHover?: boolean;
  enableYawWobble?: boolean;
  idleRandom?: number;
  hoverRandom?: number;
  idleSize?: number;
  hoverSize?: number;
  idleOpacity?: number;
  hoverOpacity?: number;
  // When set, click pulses overlay/override the hover path with envelope-driven
  // shockwaves.
  pulse?: TactilePulseRefs;
  excludeY?: [number, number];
};

function sampleAlphaMap(
  texture: THREE.Texture,
  sampleSize = 256,
): ImageData | null {
  const src = texture.image as
    | HTMLImageElement
    | HTMLCanvasElement
    | ImageBitmap
    | undefined;
  if (!src) return null;
  const w = 'naturalWidth' in src ? src.naturalWidth : src.width;
  const h = 'naturalHeight' in src ? src.naturalHeight : src.height;
  if (!w || !h) return null;

  const scale = Math.min(1, sampleSize / Math.max(w, h));
  const sw = Math.max(1, Math.round(w * scale));
  const sh = Math.max(1, Math.round(h * scale));

  const canvas = document.createElement('canvas');
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.drawImage(src as CanvasImageSource, 0, 0, sw, sh);
  const data = ctx.getImageData(0, 0, sw, sh);
  canvas.width = 0;
  canvas.height = 0;
  return data;
}

function isOpaqueAtUv(
  alphaMap: ImageData,
  u: number,
  v: number,
  alphaThreshold = 30,
): boolean {
  const px = Math.floor(u * (alphaMap.width - 1));
  const py = Math.floor((1 - v) * (alphaMap.height - 1));
  const idx = (py * alphaMap.width + px) * 4 + 3;
  return alphaMap.data[idx] > alphaThreshold;
}

function ImageParticleFieldCore({
  texture,
  threshold = 20,
  targetWidth = 6.8,
  maxSampleWidth = 260,
  particlesPosition = [0, 0, 0],
  enableHover = true,
  enableYawWobble = true,
  idleRandom = 0.06,
  hoverRandom = 2,
  idleSize = 0.06,
  hoverSize = 0.075,
  idleOpacity = 0.7,
  hoverOpacity = 0.15,
  pulse,
  excludeY,
  ...props
}: CoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const particleMeshRef = useRef<THREE.Mesh>(null);
  const hoveringRef = useRef(false);
  const alphaMap = useMemo(() => sampleAlphaMap(texture), [texture]);
  const { camera, pointer } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const localMouse = useMemo(() => new THREE.Vector3(9999, 9999, 0), []);
  const _wPos = useMemo(() => new THREE.Vector3(), []);
  const _hitPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 0, 1)),
    [],
  );
  const _hit = useMemo(() => new THREE.Vector3(), []);
  const _ndc = useMemo(() => new THREE.Vector2(), []);
  // pulse.startedAt → cached local-space tap position (world-anchored).
  const localPulsesRef = useRef<Map<number, { x: number; y: number }>>(
    new Map(),
  );

  const geometryData = useMemo(() => {
    const src = getImageSourceFromTexture(texture);
    if (!src) return null;
    return sampleTextureToParticleGeometry(
      src.source,
      src.width,
      src.height,
      threshold,
      targetWidth,
      maxSampleWidth,
      excludeY,
    );
  }, [maxSampleWidth, targetWidth, texture, threshold, excludeY]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRandom: { value: idleRandom },
      uDepth: { value: 0.06 },
      uSize: { value: idleSize },
      uOpacity: { value: idleOpacity },
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector3(9999, 9999, 0) },
      uRepelRadius: { value: 1.7 },
      uRepelStrength: { value: 0.9 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- idle* are initial uniform seeds only
    [texture],
  );

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  useEffect(() => {
    const geo = geometryData?.geometry;
    return () => {
      geo?.dispose();
    };
  }, [geometryData]);

  useFrame((state, delta) => {
    uniforms.uTime.value = state.clock.getElapsedTime();

    if (enableYawWobble && groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.18) * 0.045;
    }

    const t = 1 - Math.pow(0.1, delta);

    // Probe pulses for strongest envelope + latest tap. Click branch runs only
    // while an envelope is active, otherwise we fall through to hover.
    let pulseActive = false;
    let maxEnv = 0;
    let latestLocal: { x: number; y: number } | null = null;

    if (pulse && particleMeshRef.current) {
      const now = performance.now();
      const wPos = particleMeshRef.current.getWorldPosition(_wPos);
      _hitPlane.constant = -wPos.z;
      let latestStartedAt = -1;

      const arr = pulse.pulses.current;
      for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        const age = (now - p.startedAt) / pulse.duration;
        if (age < 0 || age >= 1) continue;
        const env = pulseEnvelope(age);
        if (env > maxEnv) maxEnv = env;
        if (p.startedAt > latestStartedAt) {
          latestStartedAt = p.startedAt;
          let local = localPulsesRef.current.get(p.startedAt);
          if (!local) {
            _ndc.set(p.ndcX, p.ndcY);
            raycaster.setFromCamera(_ndc, camera);
            if (raycaster.ray.intersectPlane(_hitPlane, _hit)) {
              particleMeshRef.current.worldToLocal(_hit);
              local = { x: _hit.x, y: _hit.y };
              localPulsesRef.current.set(p.startedAt, local);
            }
          }
          if (local) latestLocal = local;
        }
      }
      pulseActive = maxEnv > 0;

      // Drop cached locals for pulses that have aged out.
      if (localPulsesRef.current.size > 0) {
        for (const key of Array.from(localPulsesRef.current.keys())) {
          if ((now - key) / pulse.duration >= 1) {
            localPulsesRef.current.delete(key);
          }
        }
      }
    }

    if (pulseActive && latestLocal && particleMeshRef.current) {
      // Click branch. Snap (don't lerp) — lerping from the parked sentinel
      // would sweep uMouse across the cluster from offscreen to the tap. The
      // ramp is supplied by uRepelStrength's envelope, not by uMouse motion;
      // at age ≈ 0 the envelope is ~0 so the position jump applies no force.
      localMouse.x = latestLocal.x;
      localMouse.y = latestLocal.y;
      uniforms.uMouse.value.copy(localMouse);
      uniforms.uRepelStrength.value = 0.9 * Math.max(maxEnv, 0.001);
      uniforms.uRepelRadius.value = 1.7 * (0.55 + 0.45 * maxEnv);

      const targetRandom = idleRandom + (hoverRandom - idleRandom) * maxEnv;
      uniforms.uRandom.value += (targetRandom - uniforms.uRandom.value) * t;
      const targetSize = idleSize + (hoverSize - idleSize) * maxEnv;
      uniforms.uSize.value += (targetSize - uniforms.uSize.value) * t;
      const targetOpacity = idleOpacity + (hoverOpacity - idleOpacity) * maxEnv;
      uniforms.uOpacity.value += (targetOpacity - uniforms.uOpacity.value) * t;
    } else {
      // Hover branch (desktop hover; idles on mobile when no pulse).
      const targetRandom = hoveringRef.current ? hoverRandom : idleRandom;
      uniforms.uRandom.value += (targetRandom - uniforms.uRandom.value) * t;

      const targetSize = hoveringRef.current ? hoverSize : idleSize;
      uniforms.uSize.value += (targetSize - uniforms.uSize.value) * t;

      const targetOpacity = hoveringRef.current ? hoverOpacity : idleOpacity;
      uniforms.uOpacity.value += (targetOpacity - uniforms.uOpacity.value) * t;

      // Ease repel uniforms back to defaults so click→hover handoff is smooth.
      uniforms.uRepelStrength.value +=
        (0.9 - uniforms.uRepelStrength.value) * t;
      uniforms.uRepelRadius.value += (1.7 - uniforms.uRepelRadius.value) * t;

      if (enableHover && particleMeshRef.current) {
        raycaster.setFromCamera(pointer, camera);
        const wPos = particleMeshRef.current.getWorldPosition(_wPos);
        _hitPlane.constant = -wPos.z;
        if (raycaster.ray.intersectPlane(_hitPlane, _hit)) {
          particleMeshRef.current.worldToLocal(_hit);
          localMouse.copy(_hit);
        }
      } else {
        // No hover plane: state.pointer defaults to (0, 0) (NDC centre) until
        // a real event, which would project into the cluster and produce a
        // phantom repel before the first tap. Park at the sentinel.
        localMouse.set(9999, 9999, 0);
      }
      uniforms.uMouse.value.copy(localMouse);
    }
  });

  if (!geometryData) return null;

  return (
    <group ref={groupRef} {...props}>
      <mesh
        position={[
          particlesPosition[0],
          particlesPosition[1],
          particlesPosition[2] - 0.08,
        ]}
      >
        <planeGeometry
          args={[geometryData.planeWidth, geometryData.planeHeight]}
        />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={1}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>

      <mesh
        ref={particleMeshRef}
        geometry={geometryData.geometry}
        position={particlesPosition}
        frustumCulled={false}
      >
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          depthTest={false}
          blending={THREE.MultiplyBlending}
          premultipliedAlpha
          toneMapped={false}
        />
      </mesh>

      {enableHover ? (
        <mesh
          position={particlesPosition}
          onPointerMove={(e) => {
            if (!alphaMap || !e.uv) {
              hoveringRef.current = false;
              return;
            }
            hoveringRef.current = isOpaqueAtUv(alphaMap, e.uv.x, e.uv.y);
          }}
          onPointerLeave={() => {
            hoveringRef.current = false;
          }}
        >
          <planeGeometry
            args={[geometryData.planeWidth, geometryData.planeHeight]}
          />
          <meshBasicMaterial
            transparent
            opacity={0.0001}
            depthWrite={false}
            depthTest={false}
          />
        </mesh>
      ) : null}
    </group>
  );
}

type ImageParticleFieldProps = Omit<CoreProps, 'texture'> & {
  imagePath: string;
};

export default function ImageParticleField({
  imagePath,
  ...rest
}: ImageParticleFieldProps) {
  const texture = useLoader(THREE.TextureLoader, imagePath);
  return <ImageParticleFieldCore texture={texture} {...rest} />;
}
