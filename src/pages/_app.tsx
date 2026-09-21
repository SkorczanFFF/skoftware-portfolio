import Lenis from 'lenis';
import { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { useEffect, useRef } from 'react';

import '@/styles/globals.css';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import { useScrollVelocity } from '@/hooks/useScrollVelocity';

import CookieConsentBanner from '@/components/CookieConsent';
import CustomCursor from '@/components/CustomCursor';
import Header from '@/components/layout/Header/Header';
import RouteTransition from '@/components/RouteTransition';
import ScrollToTop from '@/components/ScrollToTop';

import { LocaleProvider } from '@/locale/LocaleContext';

const spaceGrotesk = localFont({
  src: [
    { path: '../../public/fonts/SpaceGrotesk-Latin.woff2', style: 'normal' },
    { path: '../../public/fonts/SpaceGrotesk-LatinExt.woff2', style: 'normal' },
  ],
  variable: '--font-grotesk',
  display: 'swap',
});

const unicaOne = localFont({
  src: '../../public/fonts/UnicaOne-Regular.ttf',
  variable: '--font-unica',
  display: 'swap',
});

function MyApp({ Component, pageProps }: AppProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollVelocity();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // One clock for scroll and animation: Lenis ticks from GSAP's ticker and
    // reports back to ScrollTrigger, so scrubbed tweens land on the same frame
    // as the scroll position instead of one behind it.
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className={`${spaceGrotesk.variable} ${unicaOne.variable}`}>
      <LocaleProvider>
        <Header />
        <RouteTransition contentRef={contentRef} />
        {/* The page, and only the page: a locale switch crossfades this while
            the header stays put as the frame around it. */}
        <div ref={contentRef}>
          <Component {...pageProps} />
        </div>
        <ScrollToTop />
        <CookieConsentBanner />
        <CustomCursor />
      </LocaleProvider>
    </div>
  );
}

export default MyApp;
