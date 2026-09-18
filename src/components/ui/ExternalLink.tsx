import React from 'react';

import { useLocale } from '@/locale/LocaleContext';

type ExternalLinkProps = {
  href: string;
  /** Accessible name; the "opens in a new tab" hint is appended. */
  label: string;
  className?: string;
  children: React.ReactNode;
};

export default function ExternalLink({
  href,
  label,
  className,
  children,
}: ExternalLinkProps) {
  const { t } = useLocale();
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`${label} ${t.opensInNewTab}`}
      className={className}
    >
      {children}
    </a>
  );
}
