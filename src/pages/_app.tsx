import Lenis from 'lenis';
import { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import '@/styles/globals.css';

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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
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
