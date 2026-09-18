import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { scrambleReveal } from '@/lib/scrambleReveal';
import {
  CallIcon,
  GithubIcon,
  GlobeIcon,
  LinkedinIcon,
  MailIcon,
  PdfIcon,
} from '@/lib/shared/Icons';

import BottomBar from '@/components/layout/BottomBar';

import { useLocale } from '@/locale/LocaleContext';

const networkLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mskorus/',
    icon: LinkedinIcon,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/SkorczanFFF',
    icon: GithubIcon,
  },
] as const;

const FOREIGN_HEADINGS = [
  'LASS UNS REDEN.', // German
  'PARLIAMO.', // Italian
  'HABLEMOS.', // Spanish
  'PROMLUVME SI.', // Czech
  'ПОГОВОРИМО.', // Ukrainian
] as const;

export default function Footer(): React.JSX.Element {
  const { locale, t } = useLocale();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const cycleRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const baseText = t.footerHeading;

    const startCycling = () => {
      let foreignIdx = 0;
      let showingBase = true;

      const scheduleNext = () => {
        cycleRef.current = gsap.delayedCall(5, () => {
          tlRef.current?.kill();
          const tl = gsap.timeline();

          if (showingBase) {
            tl.add(scrambleReveal(el, FOREIGN_HEADINGS[foreignIdx], 1.5));
            showingBase = false;
          } else {
            tl.add(scrambleReveal(el, baseText, 1.5));
            foreignIdx = (foreignIdx + 1) % FOREIGN_HEADINGS.length;
            showingBase = true;
          }

          tlRef.current = tl;
          scheduleNext();
        });
      };

      scheduleNext();
    };

    const playRevealAndCycle = () => {
      tlRef.current?.kill();
      cycleRef.current?.kill();
      const tl = gsap.timeline();
      tl.add(scrambleReveal(el, baseText, 1.5));
      tl.call(startCycling);
      tlRef.current = tl;
    };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: playRevealAndCycle,
      onEnterBack: playRevealAndCycle,
    });

    return () => {
      trigger.kill();
      tlRef.current?.kill();
      cycleRef.current?.kill();
    };
  }, [t.footerHeading]);

  return (
    <footer id='contact' className='font-grotesk w-full overflow-hidden'>
      {/* Gradient bar + arrows */}
      <div className='relative flex w-full flex-col items-center top-6'>
        <div className='gradient h-[8px] w-full' />
        <div className='arrow-down gradient' />
        <div className='arrow-down blue absolute -top-[2px]' />
      </div>

      {/* Main footer content */}
      <div className='w-full bg-[#f9f9f9] pt-4'>
        <div className='mx-auto flex max-w-7xl flex-col gap-16 px-[22px] sm:px-8 py-24 md:flex-row md:justify-between md:gap-24 md:px-12'>
          {/* Narrative column */}
          <div className='md:w-3/5'>
            <h2
              ref={headingRef}
              className={`font-unica mb-12 ${locale === 'pl' ? 'text-5xl sm:text-6xl' : 'text-6xl'} font-extrabold tracking-tighter text-deep-blue md:text-7xl lg:text-8xl mt-2 break-words`}
            >
              {t.footerHeading}
            </h2>

            <p className='mb-8 max-w-md text-lg font-light leading-tight text-deep-blue/60 md:text-xl'>
              {t.footerNarrative}
            </p>

            <div className='flex flex-col gap-2'>
              <span className='text-[0.65rem] uppercase tracking-[0.2em] text-deep-blue/40'>
                {t.footerDirectLabel}
              </span>
              <a
                href={`mailto:${t.contactEmail}`}
                className='group flex items-center gap-2 text-lg font-semibold text-deep-blue transition-all duration-200 hover:translate-x-1 hover:text-raspberry'
              >
                {t.contactEmail}
                <MailIcon
                  className='text-base opacity-0 transition-opacity duration-200 group-hover:opacity-100'
                  aria-hidden='true'
                />
              </a>
              <a
                href={`tel:${t.contactPhone.replace(/\s/g, '')}`}
                className='group flex items-center gap-2 text-lg font-semibold text-deep-blue transition-all duration-200 hover:translate-x-1 hover:text-raspberry'
              >
                {t.contactPhone}
                <CallIcon
                  className='text-base opacity-0 transition-opacity duration-200 group-hover:opacity-100'
                  aria-hidden='true'
                />
              </a>
            </div>
          </div>

          {/* Identity & links column */}
          <div className='flex flex-col items-start justify-between text-left md:w-1/3 md:items-end md:text-right'>
            <div className='mb-12 md:mb-0'>
              <div className='mb-8'>
                <h3 className='text-2xl font-extrabold tracking-tighter'>
                  <span className='text-orange'>SKO</span>
                  <span className='text-raspberry'>FT</span>
                  <span className='text-deep-blue'>ware</span>
                  <span className='text-deep-blue'> Maciej Skorus</span>
                </h3>
                <p className='mt-1 text-sm font-medium tracking-wide text-deep-blue/60'>
                  {t.contactCompanyInfo}
                </p>
              </div>

              <div className='flex flex-col gap-4 md:items-end'>
                <span className='text-[0.65rem] uppercase tracking-[0.2em] text-deep-blue/50'>
                  {t.footerNetworkLabel}
                </span>
                <nav className='flex flex-col gap-3 md:items-end'>
                  {networkLinks.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`${label} (opens in new tab)`}
                      className='flex items-center gap-2 font-bold text-deep-blue/60 transition-all duration-200 hover:translate-x-1 hover:text-raspberry md:flex-row-reverse'
                    >
                      <Icon className='text-base' aria-hidden='true' />
                      <span>{label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              <div className='flex flex-col gap-4 md:items-end mt-6'>
                <span className='text-[0.65rem] uppercase tracking-[0.2em] text-deep-blue/40'>
                  {t.footerResume}
                </span>
                <nav className='flex flex-col gap-3 md:items-end'>
                  <Link
                    href='/cv'
                    className='flex items-center gap-2 font-bold text-deep-blue/60 transition-all duration-200 hover:translate-x-1 hover:text-raspberry md:flex-row-reverse'
                  >
                    <GlobeIcon className='text-base' aria-hidden='true' />
                    <span>{t.footerResumeOnline}</span>
                  </Link>
                  <a
                    href={`/Maciej Skorus - CV [${locale.toUpperCase()}].pdf`}
                    download
                    className='flex items-center gap-2 font-bold text-deep-blue/60 transition-all duration-200 hover:translate-x-1 hover:text-raspberry md:flex-row-reverse'
                  >
                    <PdfIcon className='text-base' aria-hidden='true' />
                    <span>{t.footerResumeDownload}</span>
                  </a>
                </nav>
              </div>
            </div>

            <div className='mt-auto'>
              <p className='mb-2 text-xs uppercase tracking-widest text-deep-blue/50'>
                {t.contactLocation} · {t.contactInvoiceInfo}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <BottomBar />
    </footer>
  );
}
