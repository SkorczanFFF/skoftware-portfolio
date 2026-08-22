import type { ServiceEntry } from '@/locale/types';

export const services: ServiceEntry[] = [
  {
    slug: 'strony-internetowe',
    icon: 'Globe',
    title: 'Strony internetowe',
    tagline: 'Twoje cyfrowe drzwi wejściowe.',
    description:
      'Landing pages, strony firmowe i wizytówkowe. Szybkie, responsywne, zoptymalizowane pod SEO — zaprojektowane, by przyciągać nowych klientów.',
    deliverables: [
      'Landing / strona firmowa / wizytówka',
      'Responsywność i szybkie ładowanie',
      'Optymalizacja pod SEO',
    ],
  },
  {
    slug: 'aplikacje-webowe',
    icon: 'React',
    title: 'Aplikacje webowe',
    tagline: 'Software, który napędza Twój biznes.',
    description:
      'Dashboardy, panele administracyjne, SaaS, narzędzia wewnętrzne i rozszerzenia. Skalowalne rozwiązania w React, Next.js i TypeScript.',
    deliverables: [
      'Dashboardy i panele administracyjne',
      'SaaS i narzędzia wewnętrzne',
      'React, Next.js, TypeScript',
    ],
  },
  {
    slug: 'integracja-ai',
    icon: 'Sparkles',
    title: 'Integracja AI',
    tagline: 'Inteligencja, lokalnie Twoja.',
    description:
      'Modele AI zintegrowane z produktem — lokalnie na Twoim sprzęcie lub w chmurze. Dopracowane interfejsy gotowe dla użytkowników.',
    deliverables: [
      'Modele AI wpięte w produkt',
      'Lokalnie lub w chmurze',
      'Interfejs gotowy dla użytkowników',
    ],
  },
  {
    slug: '3d-webgl',
    icon: 'Cube',
    title: '3D i WebGL',
    tagline: 'Web w trzech wymiarach.',
    description:
      'Interaktywne sceny, wizualizacje produktów i kreatywne doświadczenia 3D. Three.js, React Three Fiber, Blender — od modelu do przeglądarki.',
    deliverables: [
      'Interaktywne sceny 3D w przeglądarce',
      'Wizualizacje i konfiguratory produktów',
      'Three.js, React Three Fiber, Blender',
    ],
  },
  {
    slug: 'aplikacje-mobilne',
    icon: 'Phone',
    title: 'Aplikacje mobilne',
    tagline: 'Twoja aplikacja, wszędzie.',
    description:
      'Wieloplatformowe aplikacje iOS i Android w React Native. Od skanerów kodów i kiosków eventowych po dopracowane produkty konsumenckie.',
    deliverables: [
      'iOS i Android z jednego kodu (React Native)',
      'Skanery kodów i kioski eventowe',
      'Dopracowane produkty konsumenckie',
    ],
  },
  {
    slug: 'utrzymanie-i-rozwoj',
    icon: 'Wrench',
    title: 'Utrzymanie i rozwój',
    tagline: 'Rozwijaj, nie przepisuj.',
    description:
      'Optymalizacja wydajności, rozbudowa funkcji, modernizacja stacku i bieżące wsparcie techniczne. Twój codebase, wiecznie w rozwoju.',
    deliverables: [
      'Optymalizacja wydajności',
      'Rozbudowa funkcji i modernizacja stacku',
      'Bieżące wsparcie techniczne',
    ],
  },
];
