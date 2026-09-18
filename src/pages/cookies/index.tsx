import Link from 'next/link';
import React from 'react';

import { CookieIcon } from '@/lib/shared/Icons';

import { COOKIE_DAYS, showCookiePreferences } from '@/components/CookieConsent';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { useLocale } from '@/locale/LocaleContext';

export default function CookiesPage() {
  const { t } = useLocale();

  const cookieTable = [
    {
      name: t.cookiePolicyCookieCC,
      provider: (
        process.env.NEXT_PUBLIC_SITE_URL || 'https://skoftware.pl'
      ).replace(/^https?:\/\//, ''),
      purpose: t.cookiePolicyCookieCCPurpose,
      category: t.cookieNecessaryTitle,
      type: 'HTTP Cookie',
      duration: `${COOKIE_DAYS} days`,
    },
    {
      name: t.cookiePolicyCookieLocale,
      provider: (
        process.env.NEXT_PUBLIC_SITE_URL || 'https://skoftware.pl'
      ).replace(/^https?:\/\//, ''),
      purpose: t.cookiePolicyCookieLocalePurpose,
      category: t.cookieNecessaryTitle,
      type: 'localStorage',
      duration: 'Persistent',
    },
    {
      name: t.cookiePolicyCookieVercelAnalytics,
      provider: 'Vercel Inc.',
      purpose: t.cookiePolicyCookieVercelAnalyticsPurpose,
      category: t.cookieAnalyticsTitle,
      type: 'Cookieless script',
      duration: 'Session',
    },
    {
      name: t.cookiePolicyCookieVercelSpeed,
      provider: 'Vercel Inc.',
      purpose: t.cookiePolicyCookieVercelSpeedPurpose,
      category: t.cookieAnalyticsTitle,
      type: 'Cookieless script',
      duration: 'Session',
    },
  ];

  const rights = [
    t.cookiePolicyRightAccess,
    t.cookiePolicyRightRectification,
    t.cookiePolicyRightErasure,
    t.cookiePolicyRightRestriction,
    t.cookiePolicyRightPortability,
    t.cookiePolicyRightObject,
    t.cookiePolicyRightWithdraw,
    t.cookiePolicyRightComplaint,
  ];

  return (
    <Layout>
      <Seo templateTitle={t.cookiePolicyTitle} />
      <main className='font-grotesk min-h-screen bg-white pt-[60px] text-primary-blue'>
        <section className='mx-auto max-w-4xl px-6 pb-24 pt-20 md:px-12'>
          {/* Header */}
          <div className='mb-12 flex items-start gap-4'>
            <CookieIcon className='shrink-0 text-4xl text-raspberry md:text-[80px]' />
            <div>
              <h1 className='font-unica text-4xl font-bold tracking-tight md:text-5xl'>
                {t.cookiePolicyTitle}
              </h1>
              <p className='mt-2 text-sm tracking-wide text-primary-blue/50'>
                {t.cookiePolicyLastUpdated}
              </p>
            </div>
          </div>

          {/* Intro */}
          <p className='mb-12 text-base leading-relaxed text-primary-blue/70'>
            <StyledText text={t.cookiePolicyIntro} />
          </p>

          {/* 1. What Are Cookies */}
          <Section title={t.cookiePolicyWhatAreCookiesTitle}>
            <p>{t.cookiePolicyWhatAreCookies}</p>
          </Section>

          {/* 2. Data Controller */}
          <Section title={t.cookiePolicyControllerTitle}>
            <p>
              <StyledText text={t.cookiePolicyController} />
            </p>
          </Section>

          {/* 3. Cookies We Use */}
          <Section title={t.cookiePolicyCookiesWeUseTitle}>
            <p className='mb-6'>{t.cookiePolicyCookiesWeUseIntro}</p>
            <div className='overflow-x-auto rounded-[3px] border-2 border-raspberry/20'>
              <table className='w-full min-w-[640px] text-left text-sm'>
                <thead>
                  <tr className='border-b-2 border-raspberry/20 bg-primary-blue text-white'>
                    <th scope='col' className='px-4 py-3 font-medium'>
                      {t.cookiePolicyTableName}
                    </th>
                    <th scope='col' className='px-4 py-3 font-medium'>
                      {t.cookiePolicyTableProvider}
                    </th>
                    <th scope='col' className='px-4 py-3 font-medium'>
                      {t.cookiePolicyTablePurpose}
                    </th>
                    <th scope='col' className='px-4 py-3 font-medium'>
                      {t.cookiePolicyTableCategory}
                    </th>
                    <th scope='col' className='px-4 py-3 font-medium'>
                      {t.cookiePolicyTableType}
                    </th>
                    <th scope='col' className='px-4 py-3 font-medium'>
                      {t.cookiePolicyTableDuration}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cookieTable.map((cookie, i) => (
                    <tr
                      key={cookie.name}
                      className={`border-b border-primary-blue/10 ${i % 2 === 0 ? 'bg-white' : 'bg-primary-blue/3'}`}
                    >
                      <td className='px-4 py-3 font-medium'>{cookie.name}</td>
                      <td className='px-4 py-3 text-primary-blue/60'>
                        {cookie.provider}
                      </td>
                      <td className='px-4 py-3 text-primary-blue/70'>
                        {cookie.purpose}
                      </td>
                      <td className='px-4 py-3'>
                        <span
                          className={`inline-block rounded-[3px] px-2 py-0.5 text-xs font-medium ${
                            cookie.category === t.cookieNecessaryTitle
                              ? 'bg-orange/10 text-orange'
                              : 'bg-raspberry/10 text-raspberry'
                          }`}
                        >
                          {cookie.category}
                        </span>
                      </td>
                      <td className='px-4 py-3 text-primary-blue/60'>
                        {cookie.type}
                      </td>
                      <td className='px-4 py-3 text-primary-blue/60'>
                        {cookie.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* 4. Legal Basis */}
          <Section title={t.cookiePolicyLegalBasisTitle}>
            <p>{t.cookiePolicyLegalBasis}</p>
          </Section>

          {/* 5. How to Manage Consent */}
          <Section title={t.cookiePolicyManageTitle}>
            <p className='mb-4'>{t.cookiePolicyManage}</p>
            <button
              type='button'
              onClick={showCookiePreferences}
              className='mb-6 inline-flex items-center gap-2 rounded-[3px] border-2 border-raspberry bg-raspberry px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-orange-dark'
            >
              <CookieIcon className='text-lg' />
              {t.cookiePolicyResetButton}
            </button>
            <p>{t.cookiePolicyManageBrowser}</p>
          </Section>

          {/* 6. Third-Party Services */}
          <Section title={t.cookiePolicyThirdPartyTitle}>
            <p>{t.cookiePolicyThirdParty}</p>
          </Section>

          {/* 7. GDPR Rights */}
          <Section title={t.cookiePolicyRightsTitle}>
            <p className='mb-4'>{t.cookiePolicyRightsIntro}</p>
            <ul className='mb-4 list-inside list-disc space-y-2 pl-2 text-primary-blue/70'>
              {rights.map((right) => (
                <li key={right}>{right}</li>
              ))}
            </ul>
            <p>{t.cookiePolicyRightsOutro}</p>
          </Section>

          {/* 8. International Transfers */}
          <Section title={t.cookiePolicyTransfersTitle}>
            <p>{t.cookiePolicyTransfers}</p>
          </Section>

          {/* 9. Changes */}
          <Section title={t.cookiePolicyChangesTitle}>
            <p>{t.cookiePolicyChanges}</p>
          </Section>

          {/* Back link */}
          <div className='mt-16 border-t-2 border-primary-blue/10 pt-8'>
            <Link
              href='/'
              className='inline-flex items-center gap-2 text-sm font-medium text-raspberry transition-colors duration-200 hover:text-orange-dark'
            >
              &larr; {t.cookiePolicyBackHome}
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}

const COMPANY_NAME = 'SKOFTWARE Maciej Skorus';

/** Renders text with "SKOFTWARE Maciej Skorus" in font-unica. */
function StyledText({ text }: { text: string }) {
  const idx = text.indexOf(COMPANY_NAME);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className='font-unica font-bold'>{COMPANY_NAME}</span>
      {text.slice(idx + COMPANY_NAME.length)}
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='mb-10'>
      <h2 className='font-unica mb-4 text-2xl font-bold tracking-tight text-primary-blue'>
        {title}
      </h2>
      <div className='space-y-3 text-base leading-relaxed text-primary-blue/70'>
        {children}
      </div>
    </div>
  );
}
