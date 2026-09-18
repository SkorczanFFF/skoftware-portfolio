import React, { useRef } from 'react';

import { techIconMap } from '@/lib/shared/techMap';
import { useReveal } from '@/hooks/useReveal';

import Section from '@/components/ui/Section';

import { useLocale } from '@/locale/LocaleContext';

/** The load-bearing part of the stack — the full list lives on /cv. */
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
 * A raspberry band splitting the dark-blue Process above from the dark-blue
 * WhyMe below, so it carries arrows on both sides (`blue` in, `raspberry` out
 * on WhyMe). Lead and icons stay light; the icon opacity is a contrast floor.
 */
export default function TechStrip(): React.JSX.Element {
  const { t } = useLocale();
  const rowRef = useRef<HTMLUListElement>(null);

  useReveal(rowRef, {
    selector: 'li',
    y: 12,
    duration: 0.5,
    stagger: 0.06,
    ease: 'power2.out',
    start: 'top 90%',
  });

  return (
    <Section
      tone='raspberry'
      arrow='blue'
      aria-label={t.techStripLabel}
      className='px-6 pb-[60px] pt-[56px] md:pb-[80px] md:pt-[80px]'
    >
      <div className='mx-auto flex max-w-wide flex-col items-center gap-8'>
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
    </Section>
  );
}
