const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/** One-off check for effects and non-React code; components use the hook. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.(REDUCED_MOTION).matches === true
  );
}

export function reducedMotionQuery(): MediaQueryList {
  return window.matchMedia(REDUCED_MOTION);
}
