import React from 'react';

import SectionArrow, { type ArrowColor } from '@/components/ui/SectionArrow';

type Tone = 'white' | 'dark' | 'gradient';

const TONE_CLASS: Record<Tone, string> = {
  white: 'bg-white',
  dark: 'bg-primary-blue',
  // The animated brand gradient (globals.css `.gradient`).
  gradient: 'gradient',
};

type SectionProps = {
  id?: string;
  tone: Tone;
  /** Background colour of the section above, if it should drip in. */
  arrow?: ArrowColor;
  /** Vertical padding and anything else section-specific. */
  className?: string;
  'aria-label'?: string;
  children: React.ReactNode;
};

/** Full-width home section: brand font, clipped overflow, optional arrow. */
export default function Section({
  id,
  tone,
  arrow,
  className = '',
  'aria-label': ariaLabel,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`font-grotesk relative w-full overflow-hidden [contain:paint] ${TONE_CLASS[tone]} ${className}`}
    >
      {arrow && <SectionArrow color={arrow} />}
      {children}
    </section>
  );
}
