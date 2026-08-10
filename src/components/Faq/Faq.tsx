import Head from 'next/head';
import React from 'react';

import { useLocale } from '@/locale/LocaleContext';

/**
 * FAQ built on native <details> — accordion behaviour with zero JS, and the
 * answers ship in the SSR HTML for crawlers. Emits FAQPage JSON-LD (same
 * pattern as Seo.tsx). Kept `bg-white`: it sits directly above Portfolio, whose
 * top `arrow-down white` needs a white section above it (CLAUDE.md §4).
 */
export default function Faq(): React.JSX.Element {
  const { t } = useLocale();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <section
      id='faq'
      className='font-grotesk relative w-full overflow-hidden bg-white pb-[100px] pt-[80px] md:pb-[130px] md:pt-[120px] [contain:paint]'
    >
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <h2 className='font-grotesk text-primary-blue text-center text-xl font-normal leading-3 tracking-[10px] xl:absolute xl:left-[80px] xl:top-[60px] xl:origin-top-left xl:rotate-90 xl:py-0'>
        {t.faqSectionTitle}
      </h2>

      <ul className='mx-auto w-full max-w-[820px] px-6 md:px-10'>
        {t.faqItems.map((item) => (
          <li key={item.q} className='border-primary-blue/10 border-t last:border-b'>
            <details className='group'>
              <summary className='flex cursor-pointer list-none items-center justify-between gap-6 py-5'>
                <span className='font-unica text-primary-blue text-lg uppercase leading-tight tracking-tight md:text-xl'>
                  {item.q}
                </span>
                <span
                  className='text-raspberry shrink-0 text-2xl leading-none transition-transform duration-300 group-open:rotate-45'
                  aria-hidden='true'
                >
                  +
                </span>
              </summary>
              <p className='text-primary-blue/70 max-w-[680px] pb-5 text-[15px] leading-relaxed'>
                {item.a}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
