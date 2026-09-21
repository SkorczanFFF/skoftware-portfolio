import { type RefObject, useEffect } from 'react';

import { gsap } from '@/lib/gsap';

type RevealOptions = {
  /** Children of `ref` that each arrive on their own. */
  selector: string;
  /** Starting rise, in px. */
  y?: number;
  /** Starting depth, in px behind the page. */
  z?: number;
  /** Starting tip backwards, in degrees around the item's bottom edge. */
  rotationX?: number;
  /** Rule inside an item that draws in from the left as the item lands. */
  draw?: string;
  /** ScrollTrigger `start` / `end`, relative to each item. */
  start?: string;
  end?: string;
};

const PERSPECTIVE = 1000;

/**
 * Scroll-linked depth: every matched item approaches from behind the page
 * while it enters the viewport and recedes again if the reader scrolls back,
 * so the section reads as a space moved through rather than a slideshow.
 *
 * The perspective goes on each item's parent, not on `ref` — the CSS property
 * only reaches direct children, and WhyMe spreads its items over two parents.
 * One vanishing point per list is what makes off-centre items converge as
 * they recede; a per-item perspective would only shrink them.
 */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  {
    selector,
    y = 24,
    z = -180,
    rotationX = 0,
    draw,
    start = 'top 92%',
    end = 'top 55%',
  }: RevealOptions,
) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const items = gsap.utils.toArray<HTMLElement>(selector, root);
      const parents = new Set(items.map((item) => item.parentElement));
      gsap.set([...parents], { perspective: PERSPECTIVE });

      items.forEach((item) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start, end, scrub: 0.5 },
        });
        // Durations are shares of the scroll range, so both tweens end at 1:
        // the item takes the whole approach, the rule the second half of it.
        tl.fromTo(
          item,
          { opacity: 0, y, z, rotationX, transformOrigin: '50% 100%' },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotationX: 0,
            duration: 1,
            ease: 'power2.out',
          },
        );

        const rule = draw ? item.querySelector(draw) : null;
        if (rule) {
          tl.fromTo(
            rule,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.55, ease: 'power2.out' },
            0.45,
          );
        }
      });
    });

    return () => mm.revert();
  }, [ref, selector, y, z, rotationX, draw, start, end]);
}
