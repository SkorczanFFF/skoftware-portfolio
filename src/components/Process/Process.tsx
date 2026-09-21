import React, { useRef } from 'react';

import { useActiveOnScroll } from '@/hooks/useActiveOnScroll';
import { useReveal } from '@/hooks/useReveal';
import { useSectionExit } from '@/hooks/useSectionExit';

import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';

import { useLocale } from '@/locale/LocaleContext';

/** "How I work" — opens the dark chapter that TechStrip splits and WhyMe closes. */
export default function Process(): React.JSX.Element {
  const { t } = useLocale();
  const listRef = useRef<HTMLDivElement>(null);

  useReveal(listRef, { selector: '.process-step', draw: '.process-rule' });
  useSectionExit(listRef);
  useActiveOnScroll(listRef, '.process-step');

  return (
    <Section
      id='process'
      tone='dark'
      arrow='white'
      className='pb-[100px] pt-[80px] md:pb-[80px] md:pt-[120px]'
    >
      <SectionTitle tone='light'>{t.processSectionTitle}</SectionTitle>

      <div
        ref={listRef}
        className='mx-auto grid w-full max-w-wide gap-x-8 gap-y-10 px-6 sm:grid-cols-2 md:px-10 xl:grid-cols-4'
      >
        {/* One column below sm: the numeral and title share a line so a step
            is not a lone "01" over a full-width gap. From sm the wrapper
            dissolves (`contents`) and `order` restores numeral / rule / title. */}
        {t.processSteps.map((step, i) => (
          <div
            key={step.title}
            className='process-step group max-w-[440px] sm:flex sm:max-w-none sm:flex-col'
          >
            <div className='flex items-baseline gap-3 sm:contents'>
              <span
                className='font-unica text-3xl leading-none tracking-tighter text-white/30 transition-colors duration-300 group-hover:text-white/60 scroll-active:text-white/60 sm:text-5xl md:text-6xl'
                aria-hidden='true'
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className='font-unica text-xl uppercase leading-tight tracking-tight text-white sm:order-2 md:text-2xl'>
                {step.title}
              </h3>
            </div>
            <span
              className='process-rule mb-4 mt-4 block h-[2px] w-10 bg-white transition-[width] duration-300 group-hover:w-16 scroll-active:w-16 sm:order-1'
              aria-hidden='true'
            />
            <p className='mt-3 text-[14px] font-light leading-relaxed text-white/70 sm:order-3 md:text-[15px]'>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
