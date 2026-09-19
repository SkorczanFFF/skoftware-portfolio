import Head from 'next/head';
import React, { useRef, useState } from 'react';

import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import { useReveal } from '@/hooks/useReveal';
import { useSectionExit } from '@/hooks/useSectionExit';

import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';

import { useLocale } from '@/locale/LocaleContext';

/**
 * Single-open accordion. Answers ship in the SSR HTML (collapsed via
 * `height: 0`) and the FAQPage JSON-LD mirrors them, so crawlers read the Q&A
 * without JS. Must stay white: Portfolio below drips in with a white arrow.
 */
export default function Faq(): React.JSX.Element {
  const { t } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const panelsRef = useRef<Array<HTMLDivElement | null>>([]);
  const listRef = useRef<HTMLUListElement>(null);

  useReveal(listRef, { selector: 'li', y: 16, stagger: 0.06 });
  useSectionExit(listRef);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const openPanel = (i: number) => {
    const panel = panelsRef.current[i];
    if (!panel) return;
    const inner = panel.firstElementChild;
    gsap.killTweensOf([panel, inner]);
    if (prefersReducedMotion()) {
      gsap.set(panel, { height: 'auto' });
      gsap.set(inner, { opacity: 1, y: 0 });
      return;
    }
    // Measure the natural height, then tween from 0; restore `auto` so the panel
    // stays responsive to later reflows.
    gsap.set(panel, { height: 'auto' });
    const full = panel.offsetHeight;
    gsap.fromTo(
      panel,
      { height: 0 },
      {
        height: full,
        duration: 0.5,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(panel, { height: 'auto' });
        },
      },
    );
    gsap.fromTo(
      inner,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', delay: 0.08 },
    );
  };

  const closePanel = (i: number) => {
    const panel = panelsRef.current[i];
    if (!panel) return;
    const inner = panel.firstElementChild;
    gsap.killTweensOf([panel, inner]);
    if (prefersReducedMotion()) {
      gsap.set(panel, { height: 0 });
      gsap.set(inner, { opacity: 0 });
      return;
    }
    gsap.set(panel, { height: panel.offsetHeight });
    gsap.to(panel, { height: 0, duration: 0.38, ease: 'power2.inOut' });
    gsap.to(inner, { opacity: 0, y: 6, duration: 0.25, ease: 'power1.in' });
  };

  const handleToggle = (i: number) => {
    const current = openIndex;
    if (current === i) {
      closePanel(i);
      setOpenIndex(null);
      return;
    }
    if (current !== null) closePanel(current);
    openPanel(i);
    setOpenIndex(i);
  };

  return (
    <Section
      id='faq'
      tone='white'
      arrow='blue'
      className='pb-[100px] pt-[80px] md:pb-[130px] md:pt-[120px]'
    >
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <SectionTitle tone='dark'>{t.faqSectionTitle}</SectionTitle>

      <ul ref={listRef} className='mx-auto w-full max-w-prose px-6 md:px-10'>
        {t.faqItems.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <li
              key={item.q}
              className='border-primary-blue/10 border-t last:border-b'
            >
              <button
                type='button'
                id={`faq-header-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => handleToggle(i)}
                className='group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left'
              >
                <span
                  className={`font-unica text-lg uppercase leading-tight tracking-tight transition-colors duration-300 md:text-xl ${isOpen ? 'text-raspberry' : 'text-primary-blue group-hover:text-raspberry'}`}
                >
                  {item.q}
                </span>
                <span
                  className={`text-raspberry shrink-0 text-2xl leading-none transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  aria-hidden='true'
                >
                  +
                </span>
              </button>
              <div
                id={`faq-panel-${i}`}
                role='region'
                aria-labelledby={`faq-header-${i}`}
                ref={(el) => {
                  panelsRef.current[i] = el;
                }}
                className='overflow-hidden'
                style={{ height: 0 }}
              >
                <p className='text-primary-blue/70 max-w-[680px] pb-5 text-[15px] leading-relaxed'>
                  {item.a}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
