import dynamic from 'next/dynamic';
import * as React from 'react';
import { useEffect, useState } from 'react';

import Services from '@/components/About/About';
import Footer from '@/components/layout/Footer/Footer';
import Layout from '@/components/layout/Layout';
import LoaderOverlay from '@/components/LoaderOverlay';
import Portfolio from '@/components/Portfolio/Portfolio';
import Seo from '@/components/Seo';

const HeroNoSSR = dynamic(() => import('@/components/Hero/Hero'), {
  ssr: false,
  loading: () => <section className='h-[99vh] w-full bg-[#001a25]' />,
});

export default function HomePage() {
  const [heroReady, setHeroReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onReady = () => setHeroReady(true);
    window.addEventListener('hero:ready', onReady);
    const timeout = setTimeout(onReady, 5000);
    return () => {
      window.removeEventListener('hero:ready', onReady);
      clearTimeout(timeout);
    };
  }, []);

  const loaderVisible = !heroReady || !minTimeElapsed;

  return (
    <Layout>
      <Seo />
      <LoaderOverlay visible={loaderVisible} />
      <main className='overflow-x-clip'>
        <HeroNoSSR />
        <Services />
        <Portfolio />
        <Footer />
      </main>
    </Layout>
  );
}
