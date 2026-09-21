import { useLayoutEffect } from 'react';

import { BREAKPOINTS } from '@/lib/breakpoints';
import { gsap, ScrollTrigger } from '@/lib/gsap';

type Vars = gsap.TweenVars;

// Each panel part rests in `hidden`, slides to its natural state while the
// panel enters from the right, then leaves to `exit` on the way out. Enter
// windows are measured on the panel's left edge, exit on its right.
const PANEL_PARTS: Array<{
  selector: string | null;
  hidden: Vars;
  exit: Vars;
  enter: [start: string, end: string];
}> = [
  {
    selector: null,
    hidden: { opacity: 0.2, x: 150, scale: 0.92 },
    exit: { opacity: 0.2, x: -150, scale: 0.92 },
    enter: ['left 90%', 'left 40%'],
  },
  {
    selector: '.project-title',
    hidden: { x: 300 },
    exit: { x: -300 },
    enter: ['left 95%', 'left 30%'],
  },
  {
    selector: '.project-overlay',
    hidden: { opacity: 0, y: 50 },
    exit: { opacity: 0, y: 50 },
    enter: ['left 60%', 'left 30%'],
  },
  {
    selector: '.project-meta',
    hidden: { opacity: 0, y: -30 },
    exit: { opacity: 0, y: -30 },
    enter: ['left 55%', 'left 25%'],
  },
];

const EXIT: [start: string, end: string] = ['right 60%', 'right 10%'];

/** The visible counterpart of a hidden/exit state: opaque, full size, at rest. */
const shown = (vars: Vars): Vars =>
  Object.fromEntries(
    Object.keys(vars).map((key) => [
      key,
      key === 'opacity' || key === 'scale' ? 1 : 0,
    ]),
  );

export function usePortfolioScroll(
  sectionRef: React.RefObject<HTMLElement | null>,
  trackRef: React.RefObject<HTMLDivElement | null>,
) {
  useLayoutEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const mm = gsap.matchMedia();

    // Same boundary as Tailwind's `md:`, which switches the panel layout.
    mm.add(`(min-width: ${BREAKPOINTS.md}px)`, () => {
      const getScroll = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${getScroll()}`,
          invalidateOnRefresh: true,
        },
      });

      track.querySelectorAll<HTMLElement>('.project-panel').forEach((panel) => {
        const scrub = (start: string, end: string): Vars => ({
          immediateRender: false,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start,
            end,
            scrub: true,
          },
        });

        for (const part of PANEL_PARTS) {
          const el = part.selector
            ? panel.querySelector<HTMLElement>(part.selector)
            : panel;
          if (!el) continue;

          // `immediateRender: false` leaves the element untouched until its
          // trigger fires, so the resting state is set explicitly. GSAP
          // mutates the vars it is handed, hence the copies of the shared table.
          gsap.set(el, { ...part.hidden });
          gsap.fromTo(
            el,
            { ...part.hidden },
            { ...shown(part.hidden), ...scrub(...part.enter) },
          );
          gsap.fromTo(el, shown(part.exit), {
            ...part.exit,
            ...scrub(...EXIT),
          });
        }
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    mm.add(`(max-width: ${BREAKPOINTS.md - 1}px)`, () => {
      const triggers: ScrollTrigger[] = [];
      section.querySelectorAll<HTMLElement>('.mobile-fade').forEach((el) => {
        const tw = gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom-=80',
              toggleActions: 'play none none reverse',
            },
          },
        );
        if (tw.scrollTrigger) triggers.push(tw.scrollTrigger);
      });

      return () => triggers.forEach((st) => st.kill());
    });

    ScrollTrigger.refresh();
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
