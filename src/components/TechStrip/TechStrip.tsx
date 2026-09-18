import React, { useRef } from 'react';

import { gsap } from '@/lib/gsap';
import { techIconMap } from '@/lib/shared/techMap';
import { useScrollTriggers } from '@/hooks/useScrollTriggers';

import { useLocale } from '@/locale/LocaleContext';

/**
 * The load-bearing part of the stack, not the whole inventory. The full
 * icon wall lives on /o-firmie — a buyer does not shop for MobX.
 */
const HEADLINE_TECH = [
  'React',
  'Next.js',
  'TypeScript',
  'Python',
  'Three.js',
  'PostgreSQL',
  'Docker',
  'TailwindCSS',
] as const;

/**
 * Load-bearing tech, on a raspberry band that splits the dark chapter: the
 * dark-blue Process above and WhyMe below would otherwise run together as
 * ~1200px of unbroken ground. Hence an arrow on both sides — `blue` here,
 * `raspberry` on WhyMe (CLAUDE.md §4). Top padding clears the 20px arrow;
 * it was 24px back when the band shared Process's ground and carried none.
 * Lead and icons stay light — raspberry-on-raspberry vanishes. Their opacity
 * is a contrast floor, not taste: white/45 icons measured 2.67:1 on this
 * ground, under the 3:1 WCAG 1.4.11 asks of labelled graphics.
 */
export default function TechStrip(): React.JSX.Element {
  const { t } = useLocale();
  const rowRef = useRef<HTMLUListElement>(null);

  useScrollTriggers(() => {
    if (!rowRef.current) return [];

    const icons = gsap.utils.toArray<Element>('li', rowRef.current);
    if (!icons.length) return [];

    gsap.set(icons, { opacity: 0, y: 12 });

    const tween = gsap.to(icons, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: rowRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    });

    return [tween.scrollTrigger];
  }, []);

  return (
    <section
      aria-label='Technologie'
      className='font-grotesk relative w-full overflow-hidden bg-raspberry px-6 pb-[60px] pt-[56px] md:pb-[80px] md:pt-[80px]'
    >
      <div className='arrow-down blue absolute -top-[2px] left-0 right-0 mx-auto'></div>
      <div className='mx-auto flex max-w-[1000px] flex-col items-center gap-8'>
        <p className='text-balance text-center text-[14px] font-medium leading-relaxed text-white/90'>
          {t.techStripLead}
        </p>

        <ul
          ref={rowRef}
          className='flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14'
        >
          {HEADLINE_TECH.map((label) => {
            const Icon = techIconMap[label];
            if (!Icon) return null;
            return (
              <li key={label}>
                <Icon
                  className='text-3xl text-white/70 transition-colors duration-200 hover:text-white md:text-4xl'
                  role='img'
                  aria-label={label}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
