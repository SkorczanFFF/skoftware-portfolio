/**
 * Single source of truth for the domain and business identity. Everything
 * that needs these values imports them from here — the only exception is
 * `next-sitemap.config.js`, which runs outside the TS build and keeps a copy
 * of the domain by hand.
 */

/** Normalised — never carries a trailing slash, so `${SITE_URL}${path}` is safe. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://skoftware.pl'
).replace(/\/+$/, '');

/** Bare host, for prose and table cells. */
export const SITE_DOMAIN = SITE_URL.replace(/^https?:\/\//, '');

export const COMPANY_NAME = 'SKOFTWARE Maciej Skorus';
export const COMPANY_SHORT_NAME = 'SKOFTWARE';
export const COMPANY_FOUNDER = 'Maciej Skorus';

/** EU-prefixed, as schema.org expects. Strip `PL` for the bare NIP. */
export const VAT_ID = 'PL6252501911';
export const VAT_NUMBER = VAT_ID.replace(/^PL/, '');

// TODO: switch to kontakt@skoftware.pl once the mailbox exists.
export const CONTACT_EMAIL = 'skorusmaciej94@gmail.com';

/** E.164, for `tel:` links and structured data. */
export const CONTACT_PHONE = '+48668366648';
/** The same number as people read it. */
export const CONTACT_PHONE_DISPLAY = '+48 668 366 648';

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/SkorczanFFF' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mskorus/' },
] as const;
