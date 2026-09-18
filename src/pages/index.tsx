import * as React from 'react';

import Hero from '@/components/Hero/Hero';
import Footer from '@/components/layout/Footer/Footer';
import Layout from '@/components/layout/Layout';
import Portfolio from '@/components/Portfolio/Portfolio';
import Seo from '@/components/Seo';
import Services from '@/components/Services/Services';

export default function HomePage() {
  return (
    <Layout>
      <Seo />
      <main className='overflow-x-clip'>
        <Hero />
        <Services />
        <Portfolio />
        <Footer />
      </main>
    </Layout>
  );
}
