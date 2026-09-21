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

type InternalClick = {
  /** Path with the locale prefix the rendered anchor already carries. */
  path: string;
  samePage: boolean;
  hash: string;
};

/**
 * The internal link a click is aimed at, or null when the click belongs to
 * the browser: modified clicks, downloads, new tabs, other origins.
 */
function internalClick(event: MouseEvent): InternalClick | null {
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

  return {
    path: url.pathname + url.search + url.hash,
    samePage: url.pathname === window.location.pathname,
    hash: url.hash,
  };
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
    let stayPut = false;

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

    // Re-measure every trigger, then put the page at `y` ourselves. A refresh
    // scrolls around to measure pins and afterwards restores the position from
    // its own memory — which right after a route swap is the clamped position
    // of the page that just left, not the one the new page should open at.
    const remeasure = (y: number) => {
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();
      window.scrollTo({ top: y, behavior: 'instant' });
    };

    const land = (path: string) => {
      // Explicitly instant: <html> carries `scroll-smooth`, so a bare jump
      // would animate out from under the curtain and `scrollY` would still
      // read the old position. Lenis adopts the new one from the scroll event.
      const hash = path.includes('#') ? path.slice(path.indexOf('#') + 1) : '';
      const anchor = hash ? document.getElementById(hash) : null;
      if (anchor) anchor.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
      remeasure(window.scrollY);
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
      if (stayPut) {
        stayPut = false;
        return;
      }
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
        // Queued behind Next's own 0ms timer: its root container re-scrolls
        // to `location.hash` on every update, and this must land after it.
        const y = window.scrollY;
        window.setTimeout(() => remeasure(y), 0);
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
      const click = internalClick(event);
      if (!click) return;

      if (click.samePage) {
        // An in-page anchor only moves the hash and never reaches the router.
        // A link to the page itself does, and re-renders it in place — not a
        // change of view, so it gets neither the curtain nor the blink.
        if (!click.hash) stayPut = true;
        return;
      }

      event.preventDefault();
      if (phase !== 'idle') return;
      // Pushed verbatim with `locale: false`: the rendered href already carries
      // the locale prefix, and Next would otherwise add a second one.
      cover(click.path);
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
