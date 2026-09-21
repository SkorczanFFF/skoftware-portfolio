import { type RefObject, useEffect } from 'react';

import { gsap } from '@/lib/gsap';

/**
 * The letters of a heading stand up one after another as it scrolls in: each
 * flips up from lying flat, hinged on its baseline. Plays once per entry and
 * folds back down on the way out — letters are too small to scrub, the
 * cascade is the point. `key` re-arms it when the text itself changes.
 */
export function useLetterReveal(
  ref: RefObject<HTMLElement | null>,
  key: string | null,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const letters = gsap.utils.toArray<HTMLElement>('[data-letter]', el);
      if (!letters.length) return;

      gsap.set(el, { perspective: 400 });
      gsap.from(letters, {
        opacity: 0,
        yPercent: 50,
        rotationX: -90,
        transformOrigin: '50% 100%',
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.04,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => mm.revert();
  }, [ref, key]);
}
