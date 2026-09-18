import { DependencyList, useEffect, useRef } from 'react';

import { ScrollTrigger } from '@/lib/gsap';

type SetupFunction = () => (ScrollTrigger | undefined)[];

export function useScrollTriggers(
  setupFn: SetupFunction,
  deps: DependencyList = [],
) {
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    triggersRef.current = [];

    const triggers = setupFn();
    triggers.forEach((trigger) => {
      if (trigger) {
        triggersRef.current.push(trigger);
      }
    });

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
