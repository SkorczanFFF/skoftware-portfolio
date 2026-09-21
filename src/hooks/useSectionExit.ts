import { type RefObject, useEffect } from 'react';

import { BREAKPOINTS } from '@/lib/breakpoints';
import { gsap } from '@/lib/gsap';

/**
 * Scroll-linked exit: as the block leaves through the top it settles back —
 * dimmer, slightly smaller, drifting up — so the next section reads as the
 * foreground. Never fades out fully (a reader mid-paragraph keeps the text)
 * and only from md: scrubbing on touch tends to stutter, and the motion
 * preference is honoured via the media query.
 */
export function useSectionExit(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(
      `(min-width: ${BREAKPOINTS.md}px) and (prefers-reduced-motion: no-preference)`,
      () => {
        gsap.to(el, {
          opacity: 0.35,
          scale: 0.98,
          y: -16,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'bottom 60%',
            end: 'bottom 10%',
            scrub: 0.6,
          },
        });
      },
    );

    return () => mm.revert();
  }, [ref]);
}
