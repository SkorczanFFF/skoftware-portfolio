import { useEffect, useState } from 'react';

import { reducedMotionQuery } from '@/lib/motion';

/** False during SSR and the first client render, so markup hydrates cleanly. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = reducedMotionQuery();
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}
