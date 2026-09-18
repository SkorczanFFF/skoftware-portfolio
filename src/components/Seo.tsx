import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  COMPANY_FOUNDER,
  COMPANY_NAME,
  COMPANY_SHORT_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_URL,
  SOCIALS,
  VAT_ID,
} from '@/lib/site';

import { DEFAULT_LOCALE, useLocale } from '@/locale/LocaleContext';
import type { Locale } from '@/locale/types';

type SeoProps = {
  /** Page name; rendered as `{templateTitle} | {site name}`. */
  templateTitle?: string;
  description?: string;
};

const OG_LOCALES: Record<Locale, string> = {
  pl: 'pl_PL',
  en: 'en_US',
};

const OG_IMAGE = `${SITE_URL}/favicon/large-og.ico`;

export default function Seo({ templateTitle, description }: SeoProps) {
  const router = useRouter();
  const { locale, t } = useLocale();

  // `asPath` excludes the locale prefix when i18n routing is on, so each
  // language's URL is built from the same clean path.
  const path = router.asPath.split(/[?#]/)[0];
  const suffix = path === '/' ? '' : path;
  const urlForLocale = (l: Locale) =>
    l === DEFAULT_LOCALE
      ? `${SITE_URL}${suffix || '/'}`
      : `${SITE_URL}/${l}${suffix}`;
  const canonical = urlForLocale(locale);

  const title = templateTitle
    ? `${templateTitle} | ${t.seoSiteName}`
    : t.seoTitle;
  const desc = description ?? t.seoDescription;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY_NAME,
    alternateName: COMPANY_SHORT_NAME,
    description: desc,
    url: SITE_URL,
    logo: `${SITE_URL}/logo_short.png`,
    image: OG_IMAGE,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    vatID: VAT_ID,
    founder: { '@type': 'Person', name: COMPANY_FOUNDER },
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'śląskie',
      addressCountry: 'PL',
    },
    areaServed: [
      { '@type': 'Country', name: 'Poland' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    knowsLanguage: ['pl', 'en'],
    sameAs: SOCIALS.map((s) => s.href),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.servicesSectionTitle,
      itemListElement: t.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
        },
      })),
    },
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name='robots' content='follow, index' />
      <meta name='description' content={desc} />

      <link rel='canonical' href={canonical} />
      <link rel='alternate' hrefLang='pl' href={urlForLocale('pl')} />
      <link rel='alternate' hrefLang='en' href={urlForLocale('en')} />
      <link rel='alternate' hrefLang='x-default' href={urlForLocale('pl')} />

      <meta property='og:url' content={canonical} />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content={t.seoSiteName} />
      <meta property='og:description' content={desc} />
      <meta property='og:title' content={title} />
      <meta name='image' property='og:image' content={OG_IMAGE} />
      <meta property='og:locale' content={OG_LOCALES[locale]} />
      {(Object.keys(OG_LOCALES) as Locale[])
        .filter((l) => l !== locale)
        .map((l) => (
          <meta
            key={l}
            property='og:locale:alternate'
            content={OG_LOCALES[l]}
          />
        ))}

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={desc} />
      <meta name='twitter:image' content={OG_IMAGE} />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-config' content='/favicon/browserconfig.xml' />
      <meta name='theme-color' content='#001a25' />
    </Head>
  );
}

const favicons: Array<React.ComponentPropsWithoutRef<'link'>> = [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/favicon/android-chrome-192x192.png',
  },
  {
    rel: 'icon',
    type: 'image/x-icon',
    sizes: '32x32',
    href: '/favicon/favicon32x32.ico',
  },
  {
    rel: 'icon',
    type: 'image/x-icon',
    sizes: '16x16',
    href: '/favicon/favicon16x16.ico',
  },
  { rel: 'manifest', href: '/favicon/site.webmanifest' },
  {
    rel: 'mask-icon',
    href: '/favicon/safari-pinned-tab.svg',
    color: '#001a25',
  },
  { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
];
