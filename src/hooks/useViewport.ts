import { useEffect, useState } from 'react';

import { BREAKPOINTS } from '@/lib/breakpoints';

export type ViewportTier = 'mobile' | 'tablet' | 'desktop';

type Viewport = { width: number; height: number; tier: ViewportTier };

// Tiers follow Tailwind's `md:` / `xl:` boundaries so JS and CSS agree at 768px.
function tierOf(width: number): ViewportTier {
  if (width < BREAKPOINTS.md) return 'mobile';
  if (width < BREAKPOINTS.xl) return 'tablet';
  return 'desktop';
}

function read(): Viewport {
  const width = window.innerWidth;
  return { width, height: window.innerHeight, tier: tierOf(width) };
}

// Deterministic SSR seed; the effect syncs to real dimensions after hydration.
const SSR_FALLBACK: Viewport = { width: 1920, height: 900, tier: 'desktop' };

export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>(SSR_FALLBACK);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setViewport(read());
    };
    const onResize = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('resize', onResize);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return viewport;
}
