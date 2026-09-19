import dynamic from 'next/dynamic';
import React from 'react';

import ScrollButton from '@/components/Hero/Partials/ScrollButton';
import Button from '@/components/ui/Button';

import { useLocale } from '@/locale/LocaleContext';

// Decoration only, client-side only — it must never gate the offer copy.
const HeroScene = dynamic(() => import('@/components/Hero/HeroScene'), {
  ssr: false,
  loading: () => null,
});

/**
 * The copy renders on the server so the headline and calls to action are in
 * the first byte of HTML — crawlers and slow connections must never depend on
 * the WebGL scene loading; only the scene is a client-only chunk.
 *
 * Layout: side by side (copy left, portrait right) only on lg+ landscape,
 * where the trust line closes the copy under the CTAs. Anywhere narrower or
 * portrait — phones, every tablet held upright — the portrait sits under the
 * copy, so the copy splits: trust line and headline pinned under the header
 * (the trust line doubles as an eyebrow there), pitch and CTAs pinned to the
 * bottom, face clear in between. Copy is left-aligned, not centred like the
 * rest of the site, so it does not strand in a dead gap on wide screens;
 * `xxl:` bumps it up for 1440p+ monitors only.
 *
 * Headline size is fluid below `sm`: the longest line (EN "Working software
 * out.") is ~8.4em wide, so (100vw - 2 × px-6) / 8.7 keeps both lines
 * unbroken down to 360px viewports. Re-measure if the headline copy changes.
 */
export default function Hero(): React.JSX.Element {
  const { t } = useLocale();

  return (
    <section
      id='home'
      className='font-grotesk bg-primary-blue relative flex h-[99vh] w-full flex-col overflow-hidden'
    >
      <HeroScene />

      {/* Contrast floor for the copy — the particle field is unpredictable.
          Follows the copy: top/bottom bands for the split layout
          (face clear in the middle), left-to-right for the side-by-side one. */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-primary-blue/75 via-transparent via-45% to-primary-blue/90 lg:landscape:bg-gradient-to-r lg:landscape:from-primary-blue/85 lg:landscape:via-primary-blue/25 lg:landscape:via-50% lg:landscape:to-transparent'
      />

      <div className='pointer-events-none relative z-20 flex flex-1 items-center'>
        <div className='flex h-full w-full flex-col px-6 pb-10 pt-16 md:px-10 lg:px-16 xl:pl-20 2xl:pl-28 xxl:pl-40 lg:landscape:block lg:landscape:h-auto lg:landscape:pb-0 lg:landscape:pt-0'>
          <h1 className='font-unica max-w-[680px] text-[clamp(2.25rem,calc((100vw_-_3rem)/8.7),3rem)] font-extrabold leading-[0.95] tracking-tighter drop-shadow-[0_2px_10px_#000000a0] sm:text-5xl lg:text-6xl xl:text-7xl xxl:max-w-[900px] xxl:text-8xl'>
            <span className='block text-white/70'>{t.heroH1Line1}</span>
            <span className='block text-white'>{t.heroH1Line2}</span>
          </h1>

          <p className='mt-auto max-w-[560px] text-[14px] font-light leading-normal text-white/80 drop-shadow-[0_1px_6px_#000000a0] sm:text-[15px] sm:leading-relaxed md:text-[17px] lg:landscape:mt-6 xxl:max-w-[660px] xxl:text-[20px]'>
            {t.heroSubtitle}
          </p>

          <div className='pointer-events-auto mt-2 flex flex-col gap-3 sm:flex-row sm:items-center lg:landscape:mt-8'>
            <Button
              href='/#contact'
              variant='gradient'
              className='xxl:text-base'
            >
              {t.heroCtaPrimary}
            </Button>
            <Button
              href='/#portfolio'
              variant='ghost'
              className='xxl:text-base'
            >
              {t.heroCtaSecondary}
            </Button>
          </div>

          {/* TODO: prepend the project count once there is a verified figure. */}
          {/* Tighter below xsm so the line never wraps on 360px phones — a dangling
              separator looks broken where the list acts as the eyebrow. */}
          <ul className='order-first mb-2 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-[10px] uppercase tracking-widest text-white/60 xsm:gap-x-3 xsm:tracking-[0.2em] sm:text-[11px] lg:landscape:mb-0 lg:landscape:mt-8 xxl:text-[13px]'>
            {t.heroTrust.map((item, i) => (
              <React.Fragment key={item}>
                {i > 0 && (
                  <li aria-hidden='true' className='text-white/25'>
                    ·
                  </li>
                )}
                <li>{item}</li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>

      <ScrollButton />

      <div className='flex w-full'>
        <div className='z-20 -mt-[20px] h-[20px] w-full bg-white' />
        <div className='arrow-down blue-hero' />
        <div className='z-20 -mt-[20px] h-[20px] w-full bg-white' />
      </div>
    </section>
  );
}
