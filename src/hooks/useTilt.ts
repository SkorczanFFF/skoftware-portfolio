import { useCallback, useRef } from 'react';

import { gsap } from '@/lib/gsap';

const MAX_TILT = 8;

type TiltOptions = {
  /** Rotation range in degrees at the card edges. */
  maxTilt?: number;
  /** Scale applied while the pointer is over the card. */
  hoverScale?: number;
};

/**
 * Pointer-following 3D tilt for a card. The consumer is responsible for the
 * `perspective` wrapper and `transform-style: preserve-3d` on the tilted node.
 */
export function useTilt(
  prefersReducedMotion: boolean,
  { maxTilt = MAX_TILT, hoverScale = 1.1 }: TiltOptions = {},
) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(cardRef.current, {
        rotateX: -y * maxTilt,
        rotateY: x * maxTilt,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    },
    [prefersReducedMotion, maxTilt],
  );

  const onMouseEnter = useCallback(() => {
    if (prefersReducedMotion || !cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: hoverScale,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [prefersReducedMotion, hoverScale]);

  const onMouseLeave = useCallback(() => {
    if (prefersReducedMotion || !cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: true,
    });
  }, [prefersReducedMotion]);

  return { cardRef, onMouseMove, onMouseEnter, onMouseLeave };
}
