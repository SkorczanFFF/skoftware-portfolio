import type { RefObject } from 'react';

import { gsap } from '@/lib/gsap';
import { useScrollTriggers } from '@/hooks/useScrollTriggers';

type RevealOptions = {
  /** Children of `ref` to stagger in. */
  selector: string;
  y?: number;
  /** Start scale — items settle in from slightly behind the page. */
  scale?: number;
  /** Rules inside the items that draw in from the left once the item lands. */
  draw?: string;
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
    scale = 0.96,
    draw,
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

    const scrollTrigger = {
      trigger: ref.current,
      start,
      toggleActions: 'play none none reverse',
    };

    gsap.set(items, { opacity: 0, y, scale });
    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      stagger,
      ease,
      scrollTrigger,
    });
    const triggers = [tween.scrollTrigger];

    const rules = draw ? gsap.utils.toArray<Element>(draw, ref.current) : [];
    if (rules.length) {
      gsap.set(rules, { scaleX: 0, transformOrigin: 'left center' });
      const drawTween = gsap.to(rules, {
        scaleX: 1,
        duration: 0.6,
        stagger,
        ease,
        delay: 0.25,
        scrollTrigger,
      });
      triggers.push(drawTween.scrollTrigger);
    }

    return triggers;
  }, []);
}
