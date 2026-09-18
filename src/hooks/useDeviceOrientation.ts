import { MutableRefObject, useEffect, useRef } from 'react';

type OrientationInput = { x: number; y: number };

const NEUTRAL_BETA = 45;
const RANGE = 45;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function needsPermission(): boolean {
  return (
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof (
      DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      }
    ).requestPermission === 'function'
  );
}

export function useDeviceOrientation(
  enabled: boolean,
): MutableRefObject<OrientationInput> {
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
      // iOS 13+ — request permission on first user gesture
      const onTouch = async () => {
        if (permissionRequestedRef.current) return;
        permissionRequestedRef.current = true;
        try {
          const perm = await (
            DeviceOrientationEvent as unknown as {
              requestPermission: () => Promise<string>;
            }
          ).requestPermission();
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
