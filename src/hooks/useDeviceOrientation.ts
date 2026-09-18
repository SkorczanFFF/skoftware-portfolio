import { RefObject, useEffect, useRef } from 'react';

type OrientationInput = { x: number; y: number };
/** Normalised device tilt, −1…1 on both axes; mutated in place per event. */
export type GyroRef = RefObject<OrientationInput>;

const NEUTRAL_BETA = 45;
const RANGE = 45;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

// iOS 13+ exposes a static requestPermission() that must run on a user gesture.
type PermissionedOrientationEvent = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<string>;
};
const orientationEvent = () =>
  DeviceOrientationEvent as PermissionedOrientationEvent;

function needsPermission(): boolean {
  return (
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof orientationEvent().requestPermission === 'function'
  );
}

export function useDeviceOrientation(enabled: boolean): GyroRef {
  const ref = useRef<OrientationInput>({ x: 0, y: 0 });
  const listeningRef = useRef(false);
  const permissionRequestedRef = useRef(false);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    if (typeof DeviceOrientationEvent === 'undefined') return;

    const handler = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0;
      const beta = e.beta ?? 0;
      ref.current.x = clamp(gamma / RANGE, -1, 1);
      ref.current.y = clamp((beta - NEUTRAL_BETA) / RANGE, -1, 1);
    };

    const startListening = () => {
      if (listeningRef.current) return;
      listeningRef.current = true;
      window.addEventListener('deviceorientation', handler);
    };

    if (needsPermission()) {
      const onTouch = async () => {
        if (permissionRequestedRef.current) return;
        permissionRequestedRef.current = true;
        try {
          const perm = await orientationEvent().requestPermission!();
          if (perm === 'granted') startListening();
        } catch {
          // Permission denied — graceful degradation (camera stays centered)
        }
        window.removeEventListener('touchstart', onTouch, true);
      };
      window.addEventListener('touchstart', onTouch, {
        capture: true,
        once: true,
      });

      return () => {
        window.removeEventListener('touchstart', onTouch, true);
        window.removeEventListener('deviceorientation', handler);
        listeningRef.current = false;
      };
    }

    // Non-iOS — listen immediately
    startListening();
    return () => {
      window.removeEventListener('deviceorientation', handler);
      listeningRef.current = false;
    };
  }, [enabled]);

  return ref;
}
