import Router from 'next/router';
import { type RefObject, useEffect } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const COVER = 0.32;
const REVEAL = 0.42;
const CROSSFADE = 0.26;

/** Past this the curtain stops pretending the page was instant. */
const SLOW_ROUTE_MS = 400;
/** A closed curtain with nothing behind it is the one unrecoverable state. */
const STUCK_MS = 10000;

type Phase = 'idle' | 'covering' | 'covered' | 'revealing' | 'crossfade';

/**
 * The path a click should hand to the curtain, or null when the click belongs
 * to the browser or to the page: modified clicks, downloads, new tabs, other
 * origins, and same-document anchors, which scroll instead of navigating.
 */
function curtainPath(event: MouseEvent): string | null {
  if (event.defaultPrevented || event.button !== 0) return null;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return null;
  }

  const node = event.target;
  if (!(node instanceof Element)) return null;

  const anchor = node.closest('a');
  if (!(anchor instanceof HTMLAnchorElement)) return null;
  if (anchor.hasAttribute('download')) return null;
  if (anchor.target && anchor.target !== '_self') return null;

  // Rejects mailto: and tel: as well — neither carries the page origin.
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  if (url.pathname === window.location.pathname) return null;

  // The rendered href already carries the locale prefix, so it is pushed
  // verbatim with `locale: false` rather than being prefixed a second time.
  return url.pathname + url.search + url.hash;
}

/**
 * Route transitions in two registers.
 *
 * A deliberate navigation gets the curtain: it covers, the route is pushed
 * behind it, the page lands scrolled and re-measured, and the panel leaves
 * upward. The click is caught on `document` in the capture phase and only
 * defaultPrevented — `next/link` runs the element's own `onClick` first and
 * reads `defaultPrevented` after, so handlers such as closing the mobile menu
 * still fire.
 *
 * Everything the curtain did not start — the locale toggle, back and forward —
 * only blinks. Those keep their scroll position, and a full-screen panel would
 * throw the reader out of the view they are sitting in.
 */
export function useRouteTransition(
  curtainRef: RefObject<HTMLDivElement | null>,
  wordmarkRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const curtain = curtainRef.current;
    const wordmark = wordmarkRef.current;
    const content = contentRef.current;
    if (!curtain || !wordmark || !content) return;

    let phase: Phase = 'idle';
    let slowTimer = 0;
    let stuckTimer = 0;

    const block = (event: Event) => event.preventDefault();

    // No overflow lock: hiding the scrollbar shifts the page sideways, and the
    // curtain is still climbing at the moment that would be visible.
    const holdScroll = () => {
      window.addEventListener('wheel', block, { passive: false });
      window.addEventListener('touchmove', block, { passive: false });
    };
    const releaseScroll = () => {
      window.removeEventListener('wheel', block);
      window.removeEventListener('touchmove', block);
    };

    const land = (path: string) => {
      // Instant, never smooth: Lenis adopts the position from the native
      // scroll event, and the jump has to happen while the curtain hides it.
      const hash = path.includes('#') ? path.slice(path.indexOf('#') + 1) : '';
      const anchor = hash ? document.getElementById(hash) : null;
      if (anchor) anchor.scrollIntoView();
      else window.scrollTo(0, 0);

      // The page measured its triggers while mounting, under the previous
      // scroll position; re-measure before anything can be scrubbed.
      ScrollTrigger.refresh();
    };

    const reveal = () => {
      if (phase === 'idle' || phase === 'revealing') return;
      phase = 'revealing';
      window.clearTimeout(slowTimer);
      window.clearTimeout(stuckTimer);
      gsap.killTweensOf(wordmark);
      gsap.set(wordmark, { opacity: 0 });

      gsap.to(curtain, {
        yPercent: -100,
        duration: REVEAL,
        ease: 'expo.out',
        onComplete: () => {
          phase = 'idle';
          gsap.set(curtain, { yPercent: 100, visibility: 'hidden' });
          releaseScroll();
        },
      });
    };

    const cover = (path: string) => {
      phase = 'covering';
      holdScroll();
      gsap.killTweensOf(curtain);
      gsap.set(curtain, { yPercent: 100, visibility: 'visible' });

      gsap.to(curtain, {
        yPercent: 0,
        duration: COVER,
        ease: 'power3.in',
        onComplete: () => {
          phase = 'covered';
          slowTimer = window.setTimeout(
            () => gsap.to(wordmark, { opacity: 1, duration: 0.3 }),
            SLOW_ROUTE_MS,
          );
          stuckTimer = window.setTimeout(reveal, STUCK_MS);

          Router.push(path, undefined, { locale: false, scroll: false })
            .then((navigated) => {
              // A push the router declined leaves the page in place, and no
              // route event follows to lift the curtain.
              if (!navigated) reveal();
            })
            .catch(() => reveal());
        },
      });
    };

    const restoreContent = () => {
      gsap.to(content, {
        opacity: 1,
        duration: CROSSFADE,
        ease: 'power2.out',
        onComplete: () => {
          phase = 'idle';
          gsap.set(content, { clearProps: 'opacity' });
        },
      });
    };

    const onRouteStart = () => {
      if (reduced || phase !== 'idle') return;
      phase = 'crossfade';
      gsap.killTweensOf(content);
      // Opacity only: a transform here would become the containing block for
      // every pinned section and for the fixed header.
      gsap.set(content, { opacity: 0 });
    };

    const onRouteDone = (path: string) => {
      if (phase === 'crossfade') {
        // The other language sets different copy heights, and nothing
        // remounts on a locale switch, so every trigger is stale by now.
        ScrollTrigger.refresh();
        restoreContent();
        return;
      }
      if (phase === 'covered' || phase === 'covering') {
        land(path);
        reveal();
      }
    };

    const onRouteError = () => {
      if (phase === 'crossfade') restoreContent();
      else reveal();
    };

    const onClick = (event: MouseEvent) => {
      if (reduced) return;
      const path = curtainPath(event);
      if (!path) return;

      event.preventDefault();
      if (phase !== 'idle') return;
      cover(path);
    };

    document.addEventListener('click', onClick, true);
    Router.events.on('routeChangeStart', onRouteStart);
    Router.events.on('routeChangeComplete', onRouteDone);
    Router.events.on('routeChangeError', onRouteError);

    return () => {
      document.removeEventListener('click', onClick, true);
      Router.events.off('routeChangeStart', onRouteStart);
      Router.events.off('routeChangeComplete', onRouteDone);
      Router.events.off('routeChangeError', onRouteError);
      window.clearTimeout(slowTimer);
      window.clearTimeout(stuckTimer);
      releaseScroll();
      gsap.killTweensOf([curtain, wordmark, content]);
      gsap.set(content, { clearProps: 'opacity' });
    };
  }, [reduced, curtainRef, wordmarkRef, contentRef]);
}
