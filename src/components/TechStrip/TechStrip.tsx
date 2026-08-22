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
 * Load-bearing tech, on the same raspberry ground as Process above — the two
 * read as one chapter, so there is no arrow between them; the raspberry→white
 * handoff arrow lives on Industries below (CLAUDE.md §4). Lead and icons go
 * light, and the icon hover flips to white (raspberry-on-raspberry vanishes).
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
      className='font-grotesk w-full bg-raspberry px-6 pb-[60px] pt-[24px] md:pb-[80px]'
    >
      <div className='mx-auto flex max-w-[1000px] flex-col items-center gap-8'>
        <p className='max-w-[520px] text-center text-[13px] leading-relaxed text-white/70'>
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
                  className='text-3xl text-white/45 transition-colors duration-200 hover:text-white md:text-4xl'
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
