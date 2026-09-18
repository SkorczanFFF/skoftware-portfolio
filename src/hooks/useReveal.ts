import type { RefObject } from 'react';

import { gsap } from '@/lib/gsap';
import { useScrollTriggers } from '@/hooks/useScrollTriggers';

type RevealOptions = {
  /** Children of `ref` to stagger in. */
  selector: string;
  y?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  /** ScrollTrigger `start`, relative to `ref`. */
  start?: string;
};

/** Fade-and-rise the matched children once `ref` scrolls into view. */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  {
    selector,
    y = 24,
    duration = 0.7,
    stagger = 0.1,
    ease = 'power3.out',
    start = 'top 85%',
  }: RevealOptions,
) {
  useScrollTriggers(() => {
    if (!ref.current) return [];

    const items = gsap.utils.toArray<Element>(selector, ref.current);
    if (!items.length) return [];

    gsap.set(items, { opacity: 0, y });
    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: 'play none none reverse',
      },
    });

    return [tween.scrollTrigger];
  }, []);
}
