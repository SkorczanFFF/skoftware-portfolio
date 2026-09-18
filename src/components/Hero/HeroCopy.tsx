import React, { useEffect, useRef } from 'react';

import { prefersReducedMotion } from '@/lib/motion';
import { scrambleReveal } from '@/lib/scrambleReveal';

import Button from '@/components/ui/Button';

import { useLocale } from '@/locale/LocaleContext';

/**
 * The offer layer. Rendered on the server so the headline and calls to action
 * are in the first byte of HTML — crawlers and slow connections must never
 * depend on the WebGL scene loading.
 *
 * Layout: side by side (copy left, portrait right) only on lg+ landscape.
 * Anywhere narrower or portrait — phones, every tablet held upright — the
 * portrait sits under the copy, so the copy splits: headline pinned under the
 * header, pitch and CTAs pinned to the bottom, face clear in between. Copy is
 * left-aligned, not centred like the rest of the site, so it does not strand
 * in a dead gap on wide screens; `xxl:` bumps it up for 1440p+ monitors only.
 */
export default function HeroCopy(): React.JSX.Element {
  const { t } = useLocale();
  const eyebrowRef = useRef<HTMLSpanElement>(null);

  // The scramble is a post-hydration flourish on the brand mark only. The
  // headline is never scrambled — it would put garbage text in the DOM.
  useEffect(() => {
    const el = eyebrowRef.current;
    if (!el || prefersReducedMotion()) return;

    const tween = scrambleReveal(el, t.heroEyebrow, 1.2);
    return () => {
      tween.kill();
      el.textContent = t.heroEyebrow;
    };
  }, [t.heroEyebrow]);

  return (
    <div className='pointer-events-none relative z-20 flex flex-1 items-center'>
      <div className='flex h-full w-full flex-col justify-between px-6 pb-8 pt-20 md:px-10 lg:px-16 xl:pl-20 2xl:pl-28 xxl:pl-40 lg:landscape:block lg:landscape:h-auto lg:landscape:pb-0 lg:landscape:pt-0'>
        <div className='max-w-[680px] xxl:max-w-[900px]'>
          <span
            ref={eyebrowRef}
            className='gradient bg-linear-to-r from-raspberry to-orange-dark inline-block px-4 py-1 text-xs font-medium tracking-[0.35em] text-white sm:text-sm xxl:text-base'
          >
            {t.heroEyebrow}
          </span>

          <h1 className='font-unica mt-6 text-4xl font-extrabold leading-[0.95] tracking-tighter drop-shadow-[0_2px_10px_#000000a0] sm:text-5xl lg:text-6xl xl:text-7xl xxl:text-8xl'>
            <span className='block text-white/70'>{t.heroH1Line1}</span>
            <span className='block text-white'>{t.heroH1Line2}</span>
          </h1>
        </div>

        <div className='max-w-[680px] xxl:max-w-[900px]'>
          <p className='max-w-[560px] text-[14px] font-light leading-normal text-white/80 drop-shadow-[0_1px_6px_#000000a0] sm:text-[15px] sm:leading-relaxed md:text-[17px] lg:landscape:mt-6 xxl:max-w-[660px] xxl:text-[20px]'>
            {t.heroSubtitle}
          </p>

          <div className='pointer-events-auto mt-5 flex flex-col gap-3 sm:flex-row sm:items-center lg:landscape:mt-8'>
            <Button href='/#contact' className='xxl:text-base'>
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
          <ul className='mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-[11px] lg:landscape:mt-8 xxl:text-[13px]'>
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
    </div>
  );
}
