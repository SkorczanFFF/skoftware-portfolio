import { ThreeElements, useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import type { TactilePulseRefs } from '@/hooks/useTactilePulse';
import type { ViewportTier } from '@/hooks/useViewport';

import Background, {
  Vector3Tuple,
} from '@/components/Hero/Partials/Background';
import HeroBioParticles from '@/components/Hero/Partials/imageParticles/HeroBioParticles';
import ImageParticleField from '@/components/Hero/Partials/imageParticles/ImageParticleField';

useLoader.preload(THREE.TextureLoader, '/me.png');

type GyroRef = React.MutableRefObject<{ x: number; y: number }>;

const SCENE_CONFIG = {
  mobile: { scale: 0.9, groupX: 0, targetX: 0 },
  tablet: { scale: 1.15, groupX: -4, targetX: -1 },
  desktop: { scale: 1.5, groupX: -10, targetX: -6 },
} as const;

const Scene = (
  props: ThreeElements['group'] & {
    onReady?: () => void;
    isMobile?: boolean;
    viewport?: ViewportTier;
    gyroRef?: GyroRef;
    pulse?: TactilePulseRefs;
  },
) => {
  const {
    onReady,
    isMobile = false,
    viewport = 'desktop',
    gyroRef,
    pulse,
    ...groupProps
  } = props;
  const group = useRef<THREE.Group | null>(null);
  const cfg = SCENE_CONFIG[viewport];

  useEffect(() => {
    if (onReady) requestAnimationFrame(() => onReady());
  }, [onReady]);
  const groupScale = cfg.scale;
  const portraitGroupX = cfg.groupX;
  const portraitWorldTargetX = cfg.targetX;
  const portraitParticlesLocalX =
    (portraitWorldTargetX - portraitGroupX) / groupScale;

  return (
    <>
      <group ref={group} {...groupProps} dispose={null} scale={groupScale}>
        <ImageParticleField
          position={
            [portraitGroupX, isMobile ? -2.429 : -1.029, -2.504] as Vector3Tuple
          }
          imagePath='/me.png'
          targetWidth={12.5}
          threshold={80}
          maxSampleWidth={220}
          particlesPosition={[portraitParticlesLocalX, 0, 0]}
          enableHover={!isMobile}
          pulse={pulse}
          excludeY={[106, 432]}
        />
        <HeroBioParticles pulse={pulse} isMobile={isMobile} />
        <Background
          variant={isMobile ? 'mobile' : 'desktop'}
          gyroRef={gyroRef}
        />
      </group>
    </>
  );
};

export default React.memo(Scene);
