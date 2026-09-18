import React, { useRef } from 'react';

import { gsap } from '@/lib/gsap';
import { useScrollTriggers } from '@/hooks/useScrollTriggers';

import { useLocale } from '@/locale/LocaleContext';

/**
 * "How I work" — the process beat of the craft-leaning home, opening the dark
 * chapter that the raspberry TechStrip band then splits before WhyMe closes
 * it (transition arrows, CLAUDE.md §4). Accents must be light literals:
 * Tailwind scans source text, so no interpolated color classes.
 */
export default function Process(): React.JSX.Element {
  const { t } = useLocale();
  const listRef = useRef<HTMLDivElement>(null);

  useScrollTriggers(() => {
    if (!listRef.current) return [];

    const steps = gsap.utils.toArray<Element>('.process-step', listRef.current);
    if (!steps.length) return [];

    gsap.set(steps, { opacity: 0, y: 24 });

    const tween = gsap.to(steps, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: listRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    return [tween.scrollTrigger];
  }, []);

  return (
    <section
      id='process'
      className='font-grotesk relative w-full overflow-hidden bg-primary-blue pb-[100px] pt-[80px] md:pb-[80px] md:pt-[120px] [contain:paint]'
    >
      <div className='arrow-down white absolute -top-[2px] left-0 right-0 mx-auto'></div>
      <h2 className='font-grotesk text-center mb-12 text-xl font-normal leading-3 tracking-[10px] text-white xl:absolute xl:left-[80px] xl:top-[60px] xl:mb-0 xl:origin-top-left xl:rotate-90 xl:py-0'>
        {t.processSectionTitle}
      </h2>

      <div
        ref={listRef}
        className='mx-auto grid w-full max-w-[1100px] gap-x-8 gap-y-10 px-6 sm:grid-cols-2 md:px-10 xl:grid-cols-4'
      >
        {t.processSteps.map((step, i) => {
          const isOdd = i % 2 === 1;
          return (
            <div key={step.title} className='process-step'>
              <span
                className={`font-unica text-5xl leading-none tracking-tighter md:text-6xl ${isOdd ? 'text-white/30' : 'text-white/30'}`}
                aria-hidden='true'
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`mb-4 mt-4 block h-[2px] w-10 ${isOdd ? 'bg-white' : 'bg-white'}`}
                aria-hidden='true'
              />
              <h3 className='font-unica text-xl uppercase leading-tight tracking-tight text-white md:text-2xl'>
                {step.title}
              </h3>
              <p className='mt-3 text-[14px] font-light leading-relaxed text-white/70 md:text-[15px]'>
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
