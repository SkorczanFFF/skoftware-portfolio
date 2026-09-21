import { type RefObject, useEffect } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';

/** Class toggled while an item sits in the middle band of the viewport. */
export const SCROLL_ACTIVE_CLASS = 'is-active';

/**
 * Hover stand-in for touch: items matching `selector` get `is-active` while
 * they pass through the middle of the screen, and the `scroll-active:`
 * Tailwind variant (globals.css) styles them like `group-hover:` does on
 * pointer devices. Only registered where hover does not exist.
 */
export function useActiveOnScroll(
  ref: RefObject<HTMLElement | null>,
  selector: string,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add('(hover: none)', () => {
      gsap.utils.toArray<Element>(selector, el).forEach((item) =>
        ScrollTrigger.create({
          trigger: item,
          start: 'top 60%',
          end: 'bottom 40%',
          toggleClass: SCROLL_ACTIVE_CLASS,
        }),
      );
    });

    return () => mm.revert();
  }, [ref, selector]);
}
