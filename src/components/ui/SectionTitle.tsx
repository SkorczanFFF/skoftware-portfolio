import React, { useRef } from 'react';

import { useLetterReveal } from '@/hooks/useLetterReveal';

type Tone = 'light' | 'dark';

const TONE_CLASS: Record<Tone, string> = {
  light: 'text-white',
  dark: 'text-primary-blue',
};

// Centred above the content on small screens, rotated down the left edge
// from xl up. The rotated copy is absolutely positioned, so the mobile
// margin must be zeroed there or it shifts the pivot.
const DEFAULT_LAYOUT =
  'mb-12 text-center xl:left-[80px] xl:top-[60px] xl:mb-0 xl:py-0';

type SectionTitleProps = {
  tone: Tone;
  /**
   * `bare` drops the default placement — for sections whose title floats
   * over a pinned or scrolling body and positions itself.
   */
  layout?: 'default' | 'bare';
  className?: string;
  children: React.ReactNode;
};

/**
 * A string title is split into one inline-block per letter so each can stand
 * up on its own (useLetterReveal). Spaces stay as plain text — an inline-block
 * holding only a space collapses to nothing. Assistive technology gets the
 * whole title from `aria-label`; the letters are hidden from it, so nothing
 * is read out one character at a time.
 */
export default function SectionTitle({
  tone,
  layout = 'default',
  className = '',
  children,
}: SectionTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const text = typeof children === 'string' ? children : null;
  useLetterReveal(ref, text);

  return (
    <h2
      ref={ref}
      aria-label={text ?? undefined}
      className={`scroll-lean font-grotesk text-xl font-normal leading-3 tracking-[10px] xl:absolute xl:origin-top-left xl:rotate-90 ${TONE_CLASS[tone]} ${layout === 'default' ? DEFAULT_LAYOUT : ''} ${className}`}
    >
      {text === null ? (
        children
      ) : (
        <span aria-hidden='true'>
          {[...text].map((letter, i) =>
            letter === ' ' ? (
              ' '
            ) : (
              <span key={i} data-letter className='inline-block'>
                {letter}
              </span>
            ),
          )}
        </span>
      )}
    </h2>
  );
}
