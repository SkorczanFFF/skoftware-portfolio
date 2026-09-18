import React, { useRef } from 'react';

import { gsap } from '@/lib/gsap';
import { useScrollTriggers } from '@/hooks/useScrollTriggers';

import { useLocale } from '@/locale/LocaleContext';

/**
 * The trust/human beat that replaces a standalone `/o-firmie` page (pivot
 * 2026-08-08): craft positioning, not an employer timeline. Rendered on the
 * dark-blue ground, closing the chapter Process opens — the raspberry
 * TechStrip band splits the two, so this section's own top arrow is
 * `raspberry`, and `arrow-down blue` on Faq below hands the white body
 * back (CLAUDE.md §4).
 */
export default function WhyMe(): React.JSX.Element {
  const { t } = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);

  useScrollTriggers(() => {
    if (!rootRef.current) return [];

    const items = gsap.utils.toArray<Element>('.why-me-item', rootRef.current);
    if (!items.length) return [];

    gsap.set(items, { opacity: 0, y: 20 });

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: rootRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    return [tween.scrollTrigger];
  }, []);

  return (
    <section
      id='why-me'
      className='font-grotesk relative w-full overflow-hidden bg-primary-blue pb-[100px] pt-[80px] md:pb-[130px] md:pt-[120px] [contain:paint]'
    >
      <div className='arrow-down raspberry absolute -top-[2px] left-0 right-0 mx-auto'></div>
      <h2 className='font-grotesk text-center mb-12 text-xl font-normal leading-3 tracking-[10px] text-white xl:absolute xl:left-[80px] xl:top-[60px] xl:mb-0 xl:origin-top-left xl:rotate-90 xl:py-0'>
        {t.whyMeSectionTitle}
      </h2>

      <div ref={rootRef} className='mx-auto w-full max-w-[1100px] px-6 md:px-10'>
        <h3 className='why-me-item font-unica max-w-[900px] text-3xl uppercase leading-tight tracking-tight text-white md:text-5xl'>
          {t.whyMeHeading}
        </h3>

        <p className='why-me-item mt-6 max-w-[620px] text-[15px] leading-relaxed text-white/60 md:text-[17px]'>
          {t.whyMeBody}
        </p>

        <ul className='why-me-item mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-3'>
          {t.whyMePoints.map((point, i) => (
            <li key={point} className='border-white/10 border-t pt-4'>
              <span
                className={`mb-3 block h-[2px] w-10 ${i % 2 === 0 ? 'bg-raspberry' : 'bg-orange'}`}
                aria-hidden='true'
              />
              <span className='text-white/80 block text-[15px] font-medium leading-snug'>
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
