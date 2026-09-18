import * as React from 'react';

import Faq from '@/components/Faq/Faq';
import Hero from '@/components/Hero/Hero';
import Footer from '@/components/layout/Footer/Footer';
import Layout from '@/components/layout/Layout';
import Portfolio from '@/components/Portfolio/Portfolio';
import Process from '@/components/Process/Process';
import Seo from '@/components/Seo';
import Services from '@/components/Services/Services';
import TechStrip from '@/components/TechStrip/TechStrip';
import WhyMe from '@/components/WhyMe/WhyMe';

export default function HomePage() {
  return (
    <Layout>
      <Seo />
      <main className='overflow-x-clip'>
        <Hero />
        <Services />
        <Process />
        <TechStrip />
        <WhyMe />
        <Faq />
        <Portfolio />
        <Footer />
      </main>
    </Layout>
  );
}
