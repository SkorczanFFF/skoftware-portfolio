import { useEffect } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

/** px/s that counts as a full flick; anything faster saturates. */
const FULL_FLICK = 2500;

/**
 * Publishes the scroll velocity on <html> as `--scroll-velocity`, −1..1, for
 * CSS to read the way a shader reads a uniform: the section arrows stretch
 * with it and `.scroll-lean` text leans into it (globals.css).
 *
 * ScrollTrigger only reports while the page moves, so the value is handed
 * to a decay tween — that is what lets it settle to zero instead of freezing
 * at the last reading when the scroll stops.
 */
export function useScrollVelocity() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const root = document.documentElement;
    const state = { velocity: 0 };
    const publish = () =>
      root.style.setProperty('--scroll-velocity', state.velocity.toFixed(3));

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const next = gsap.utils.clamp(-1, 1, self.getVelocity() / FULL_FLICK);
        // A faster reading takes over, a slower one rides the decay already
        // running — so the value peaks and eases out instead of flickering
        // with every scroll event. A change of direction always takes over.
        const turned = next * state.velocity < 0;
        if (!turned && Math.abs(next) <= Math.abs(state.velocity)) return;

        state.velocity = next;
        gsap.to(state, {
          velocity: 0,
          duration: 0.8,
          ease: 'power3',
          overwrite: true,
          onUpdate: publish,
        });
      },
    });

    return () => {
      trigger.kill();
      gsap.killTweensOf(state);
      root.style.removeProperty('--scroll-velocity');
    };
  }, []);
}
