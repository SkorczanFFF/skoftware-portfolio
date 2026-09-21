import React, { useRef } from 'react';

import { useActiveOnScroll } from '@/hooks/useActiveOnScroll';
import { useReveal } from '@/hooks/useReveal';
import { useSectionExit } from '@/hooks/useSectionExit';

import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';

import { useLocale } from '@/locale/LocaleContext';

/**
 * The trust beat: one contractor, idea to maintenance. Closes the dark
 * chapter — Faq below hands the white body back with its own `blue` arrow.
 */
export default function WhyMe(): React.JSX.Element {
  const { t } = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);

  useReveal(rootRef, { selector: '.why-me-item', y: 20, draw: '.why-me-rule' });
  useSectionExit(rootRef);
  useActiveOnScroll(rootRef, 'li');

  return (
    <Section
      id='why-me'
      tone='dark'
      arrow='gradient'
      className='pb-[100px] pt-[80px] md:pb-[130px] md:pt-[120px]'
    >
      <SectionTitle tone='light'>{t.whyMeSectionTitle}</SectionTitle>

      <div ref={rootRef} className='mx-auto w-full max-w-wide px-6 md:px-10'>
        <h3 className='why-me-item font-unica max-w-[900px] text-3xl uppercase leading-tight tracking-tight text-white md:text-5xl'>
          {t.whyMeHeading}
        </h3>

        <p className='why-me-item mt-6 max-w-[620px] text-[15px] leading-relaxed text-white/60 md:text-[17px]'>
          {t.whyMeBody}
        </p>

        <ul className='mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-3'>
          {t.whyMePoints.map((point, i) => (
            <li
              key={point}
              className='why-me-item group border-white/10 border-t pt-4'
            >
              {/* Full literals on purpose: Tailwind only sees classes written out.
                  The rule widens and brightens on hover, or on touch while the
                  item crosses mid-screen (`scroll-active:`). */}
              <span
                className={`why-me-rule mb-3 block h-[2px] w-10 transition-[width,background-color] duration-300 ${
                  i % 2 === 0
                    ? 'bg-raspberry group-hover:w-20 group-hover:bg-raspberry-bright scroll-active:w-20 scroll-active:bg-raspberry-bright'
                    : 'bg-orange group-hover:w-20 group-hover:bg-orange-bright scroll-active:w-20 scroll-active:bg-orange-bright'
                }`}
                aria-hidden='true'
              />
              <span className='block text-[15px] font-medium leading-snug text-white/80 transition-colors duration-300 group-hover:text-white scroll-active:text-white'>
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
