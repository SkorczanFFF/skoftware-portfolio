import Link from 'next/link';
import React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import { type IconType } from '@/lib/shared/Icons';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { useLocale } from '@/locale/LocaleContext';

const WarningIcon = RiAlarmWarningFill as IconType;

export default function NotFoundPage() {
  const { t } = useLocale();

  return (
    <Layout>
      <Seo templateTitle={t.notFoundTitle} />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
            <WarningIcon className='text-red-500' aria-hidden='true' />
            <h1 className='mt-8 text-4xl md:text-6xl'>{t.notFoundTitle}</h1>
            <Link
              href='/'
              className='mt-4 text-lg text-blue-600 underline hover:text-blue-800'
            >
              {t.notFoundBack}
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
