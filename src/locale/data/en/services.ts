import type { ServiceEntry } from '@/locale/types';

export const services: ServiceEntry[] = [
  {
    slug: 'strony-internetowe',
    icon: 'Globe',
    title: 'Websites',
    tagline: 'Your digital front door.',
    description:
      'Landing pages, company sites, and business cards. Fast, responsive, SEO-optimized — designed to turn visitors into clients.',
    deliverables: [
      'Landing / company site / business card',
      'Responsive, fast-loading',
      'SEO optimization',
    ],
  },
  {
    slug: 'aplikacje-webowe',
    icon: 'React',
    title: 'Web applications',
    tagline: 'Software that runs your business.',
    description:
      'Dashboards, admin panels, SaaS, internal tools, and browser extensions. Scalable solutions in React, Next.js, and TypeScript.',
    deliverables: [
      'Dashboards & admin panels',
      'SaaS & internal tools',
      'React, Next.js, TypeScript',
    ],
  },
  {
    slug: 'integracja-ai',
    icon: 'Sparkles',
    title: 'AI integration',
    tagline: 'Intelligence, locally yours.',
    description:
      'AI models integrated into real products — locally on your hardware or via the cloud. Wrapped in polished, user-ready interfaces.',
    deliverables: [
      'AI models wired into your product',
      'On-premise or cloud',
      'Polished, user-ready interface',
    ],
  },
  {
    slug: '3d-webgl',
    icon: 'Cube',
    title: '3D & WebGL',
    tagline: 'The web, in three dimensions.',
    description:
      'Interactive scenes, product visualizers, and creative 3D experiences. Three.js, React Three Fiber, Blender — from model to browser.',
    deliverables: [
      'Interactive 3D scenes in the browser',
      'Product visualizers & configurators',
      'Three.js, React Three Fiber, Blender',
    ],
  },
  {
    slug: 'aplikacje-mobilne',
    icon: 'Phone',
    title: 'Mobile apps',
    tagline: 'Your app, everywhere.',
    description:
      'Cross-platform iOS & Android built with React Native. From barcode scanners and event kiosks to polished consumer products.',
    deliverables: [
      'iOS & Android from one codebase (React Native)',
      'Barcode scanners & event kiosks',
      'Polished consumer products',
    ],
  },
  {
    slug: 'utrzymanie-i-rozwoj',
    icon: 'Wrench',
    title: 'Maintenance & growth',
    tagline: "Evolve, don't rewrite.",
    description:
      'Performance optimization, feature expansion, stack modernization, and ongoing technical support. Your codebase, always moving.',
    deliverables: [
      'Performance optimization',
      'Feature expansion & stack modernization',
      'Ongoing technical support',
    ],
  },
];
