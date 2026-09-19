import Lenis from 'lenis';
import { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import '@/styles/globals.css';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

import CookieConsentBanner from '@/components/CookieConsent';
import CustomCursor from '@/components/CustomCursor';
import Header from '@/components/layout/Header/Header';
import LoaderOverlay from '@/components/LoaderOverlay';
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
  const router = useRouter();
  const [routeLoading, setRouteLoading] = useState(false);

  const onStart = useCallback(() => setRouteLoading(true), []);
  const onEnd = useCallback(() => setRouteLoading(false), []);

  useEffect(() => {
    router.events.on('routeChangeStart', onStart);
    router.events.on('routeChangeComplete', onEnd);
    router.events.on('routeChangeError', onEnd);
    return () => {
      router.events.off('routeChangeStart', onStart);
      router.events.off('routeChangeComplete', onEnd);
      router.events.off('routeChangeError', onEnd);
    };
  }, [router, onStart, onEnd]);

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
        <LoaderOverlay visible={routeLoading} />
        <Component {...pageProps} />
        <ScrollToTop />
        <CookieConsentBanner />
        <CustomCursor />
      </LocaleProvider>
    </div>
  );
}

export default MyApp;
