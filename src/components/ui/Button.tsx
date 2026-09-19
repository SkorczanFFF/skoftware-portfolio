import Link from 'next/link';
import React from 'react';

type Variant = 'primary' | 'ghost' | 'gradient';

// Focus ring is a light-inside / dark-outside pair: variants live on both the
// dark hero and the light Services section, and no single colour clears 3:1
// against both backgrounds.
const BASE =
  'rounded-[2px] px-6 py-3 text-center text-sm font-medium uppercase tracking-widest transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-white),0_0_0_4px_var(--color-primary-blue)]';

const VARIANT_CLASS: Record<Variant, string> = {
  primary: 'bg-raspberry text-white hover:bg-orange',
  // `.gradient` is unlayered, so it beats any bg-* utility: hover goes through
  // a filter instead of a background swap.
  gradient: 'gradient text-white transition-[filter] hover:brightness-110',
  ghost:
    'border border-white/30 text-white/90 backdrop-blur-[6px] hover:border-white hover:bg-white/10',
};

type ButtonProps = {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

// scroll={false}: CTAs point at in-page anchors, so Next must not jump to the top.
export default function Button({
  href,
  variant = 'primary',
  className = '',
  children,
}: ButtonProps) {
  return (
    <Link
      href={href}
      scroll={false}
      className={`${BASE} ${VARIANT_CLASS[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
