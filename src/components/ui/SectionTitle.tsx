import React from 'react';

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

export default function SectionTitle({
  tone,
  layout = 'default',
  className = '',
  children,
}: SectionTitleProps) {
  return (
    <h2
      className={`scroll-lean font-grotesk text-xl font-normal leading-3 tracking-[10px] xl:absolute xl:origin-top-left xl:rotate-90 ${TONE_CLASS[tone]} ${layout === 'default' ? DEFAULT_LAYOUT : ''} ${className}`}
    >
      {children}
    </h2>
  );
}
