import dynamic from 'next/dynamic';
import React from 'react';

import HeroCopy from '@/components/Hero/HeroCopy';
import ScrollButton from '@/components/Hero/Partials/ScrollButton';

// Decoration only, client-side only — it must never gate the offer copy.
const HeroScene = dynamic(() => import('@/components/Hero/HeroScene'), {
  ssr: false,
  loading: () => null,
});

export default function Hero(): React.JSX.Element {
  return (
    <section
      id='home'
      className='font-grotesk bg-primary-blue relative flex h-[99vh] w-full flex-col overflow-hidden'
    >
      <HeroScene />

      {/* Contrast floor for the copy — the particle field is unpredictable.
          Follows the copy (HeroCopy): top/bottom bands for the split layout
          (face clear in the middle), left-to-right for the side-by-side one. */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-primary-blue/75 via-transparent via-45% to-primary-blue/90 lg:landscape:bg-gradient-to-r lg:landscape:from-primary-blue/85 lg:landscape:via-primary-blue/25 lg:landscape:via-50% lg:landscape:to-transparent'
      />

      <HeroCopy />

      <ScrollButton />

      <div className='flex w-full'>
        <div className='z-20 -mt-[20px] h-[20px] w-full bg-white' />
        <div className='arrow-down blue-hero' />
        <div className='z-20 -mt-[20px] h-[20px] w-full bg-white' />
      </div>
    </section>
  );
}
