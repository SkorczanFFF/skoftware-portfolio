import { type RefObject, useEffect } from 'react';

import { gsap } from '@/lib/gsap';

/** How far past its edges the element starts to pull, in px. */
const REACH = 48;
/** Displacement when the pointer sits on the element's edge, in px. */
const PULL_X = 18;
const PULL_Y = 10;

/**
 * The element leans toward a nearby pointer and springs back once it leaves.
 * Displacement is normalised to the element's size, so a wide CTA and a
 * small button travel the same distance at their edges. Pointer devices with
 * hover only — on touch there is no "nearby" — and never under reduced motion.
 * The cursor pulls the other way (CustomCursor), so the two meet halfway.
 */
export function useMagnetic(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        let held = false;

        const release = () => {
          if (!held) return;
          held = false;
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.9,
            ease: 'elastic.out(1, 0.45)',
            overwrite: 'auto',
          });
        };

        const onMove = (event: PointerEvent) => {
          // Measured live: the element is already displaced, and reading its
          // moved box is what lets it settle instead of overshooting.
          const box = el.getBoundingClientRect();
          const dx = event.clientX - (box.left + box.width / 2);
          const dy = event.clientY - (box.top + box.height / 2);
          const near =
            Math.abs(dx) < box.width / 2 + REACH &&
            Math.abs(dy) < box.height / 2 + REACH;
          if (!near) {
            release();
            return;
          }
          held = true;
          gsap.to(el, {
            x: (dx / (box.width / 2)) * PULL_X,
            y: (dy / (box.height / 2)) * PULL_Y,
            duration: 0.45,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        return () => window.removeEventListener('pointermove', onMove);
      },
    );

    return () => mm.revert();
  }, [ref]);
}
