import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

import { prefersReducedMotion } from '@/lib/motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  if (prefersReducedMotion()) {
    gsap.globalTimeline.timeScale(5);
    ScrollTrigger.defaults({ toggleActions: 'play none none none' });
  }
}

export { gsap, ScrollTrigger };
