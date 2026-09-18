import React, { useEffect, useRef } from 'react';

import { prefersReducedMotion } from '@/lib/motion';

export type Pulse = {
  startedAt: number;
  ndcX: number;
  ndcY: number;
};

export type TactilePulseRefs = {
  pulses: React.RefObject<Pulse[]>;
  duration: number;
};

type Options = {
  durationMs: number;
  maxPulses?: number;
  haptic?: boolean;
  onTap?: (e: { clientX: number; clientY: number }) => void;
};

// Shared canvas-tap source. Pushes each pointerdown into a ring of recent
// pulses (NDC + timestamp); consumers compute their own envelope per frame.
export function useTactilePulse(opts: Options): TactilePulseRefs {
  const { durationMs, maxPulses = 4, haptic = false, onTap } = opts;

  const pulses = useRef<Pulse[]>([]);

  // Ref-stashed so callback identity changes don't reattach DOM listeners.
  const onTapRef = useRef(onTap);
  useEffect(() => {
    onTapRef.current = onTap;
  }, [onTap]);

  useEffect(() => {
    let canvas: HTMLCanvasElement | null = null;
    let attached = false;

    const reduceMotion = prefersReducedMotion();

    const onDown = (e: PointerEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pulses.current.push({ startedAt: performance.now(), ndcX: x, ndcY: y });
      while (pulses.current.length > maxPulses) pulses.current.shift();
      if (
        haptic &&
        !reduceMotion &&
        typeof navigator !== 'undefined' &&
        'vibrate' in navigator
      ) {
        try {
          navigator.vibrate?.(12);
        } catch {
          /* ignore */
        }
      }
      onTapRef.current?.({ clientX: e.clientX, clientY: e.clientY });
    };

    const attach = () => {
      if (attached) return;
      canvas = document.querySelector('canvas');
      if (!canvas) return;
      canvas.addEventListener('pointerdown', onDown);
      attached = true;
    };

    attach();
    const onReady = () => attach();
    window.addEventListener('hero:ready', onReady);

    // Prune expired pulses so consumers can iterate without bookkeeping.
    const prune = window.setInterval(() => {
      const now = performance.now();
      pulses.current = pulses.current.filter(
        (p) => now - p.startedAt < durationMs,
      );
    }, 250);

    return () => {
      window.clearInterval(prune);
      window.removeEventListener('hero:ready', onReady);
      if (canvas && attached) {
        canvas.removeEventListener('pointerdown', onDown);
      }
    };
  }, [durationMs, maxPulses, haptic]);

  return { pulses, duration: durationMs };
}
