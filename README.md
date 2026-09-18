# SKOFTWARE - Portfolio

Portfolio website for SKOFTWARE / Maciej Skorus — Creative Fullstack Developer. Built with Next.js 16, React 19, TypeScript, and Three.js. Features an interactive 3D hero scene with image-to-particle conversion, custom GLSL shaders, GSAP scroll-driven animations, bilingual content (PL/EN) routed by URL, cookie consent management, and a built-in web CV.

**Live:** [mskorus.vercel.app](https://mskorus.vercel.app/)

---

## Tech Stack

### Core

| Technology  | Version | Purpose                                |
| ----------- | ------- | -------------------------------------- |
| Next.js     | 16.2    | Framework (SSR, routing, optimization) |
| React       | 19.2    | UI library                             |
| TypeScript  | 5.9     | Type safety                            |
| TailwindCSS | 4.2     | Utility-first styling                  |

### 3D & Animation

| Technology         | Version | Purpose                                     |
| ------------------ | ------- | ------------------------------------------- |
| Three.js           | 0.183   | 3D rendering engine                         |
| @react-three/fiber | 9.5     | React renderer for Three.js                 |
| @react-three/drei  | 10.7    | R3F helpers & abstractions                  |
| GSAP               | 3.14    | Scroll-triggered animations (ScrollTrigger) |
| Lenis              | 1.3     | Smooth scrolling                            |
| maath              | 0.10    | Math utilities for 3D                       |

### Utilities

| Technology                  | Purpose                         |
| --------------------------- | ------------------------------- |
| react-icons                 | Icon library (50+ tech icons)   |
| react-error-boundary        | Error boundary for WebGL canvas |
| react-intersection-observer | Viewport visibility detection   |
| @vercel/analytics           | Usage analytics                 |
| @vercel/speed-insights      | Performance monitoring          |

---

## Features

### 3D Hero Scene

- Portrait image converted to an interactive particle field at runtime
- Custom GLSL vertex/fragment shaders for hero and bio particles
- Animated bio text particles
- Camera rig responding to mouse movement
- Adaptive rendering — mobile uses lighter materials and fewer particles
- Frameloop pauses when hero is out of viewport

### Scroll Animations (GSAP ScrollTrigger)

- Horizontal-scroll portfolio gallery (desktop) with per-panel entrance/exit animations
- Vertical fade-in portfolio cards (mobile)
- Service card reveal animations
- Section reveals via a shared `useReveal` hook
- Text scramble reveal animations

### Internationalization

- Polish (`/`) and English (`/en/*`) via Next.js i18n routing — no detection, no persistence
- Canonical and hreflang links per locale
- Every user-facing string lives in `src/locale`

### CV

- Dedicated `/cv` page (noindex) with sidebar + content layout
- Static PDFs regenerated with `node scripts/generate-cv-pdf.mjs` against a running dev server

### Cookie Consent & Privacy

- GDPR-compliant cookie consent banner
- Dedicated `/cookies` policy page with cookie inventory
- Consent preference stored in cookies with reset option

### Other

- Custom cursor (desktop only, fine pointer)
- Active section tracking in header navigation
- SEO: sitemap generation, Schema.org structured data, meta tags
- Responsive design with custom breakpoints (480–2000px)

---

## Project Structure

```
src/
├── components/
│   ├── Hero/                  # Offer copy over the 3D scene
│   │   ├── HeroCopy.tsx       # Server-rendered headline + CTAs
│   │   ├── HeroScene.tsx      # R3F canvas (client only)
│   │   └── Partials/
│   │       ├── imageParticles/  # Image-to-particle pipeline
│   │       └── shaders/         # GLSL vertex & fragment shaders
│   ├── Services/              # Craft cards with deliverables
│   ├── Process/               # "How I work" steps
│   ├── TechStrip/             # Load-bearing stack icons
│   ├── WhyMe/                 # Trust block
│   ├── Faq/                   # Single-open accordion + FAQPage schema
│   ├── Portfolio/             # Horizontal scroll project showcase
│   ├── ui/                    # Section, SectionTitle, SectionArrow, Button, ExternalLink
│   ├── layout/
│   │   ├── Header/            # Nav with locale toggle (desktop + mobile)
│   │   ├── Footer/            # Contact, socials, CV links
│   │   └── Layout.tsx         # Consent-gated analytics wrapper
│   ├── CookieConsent.tsx      # GDPR cookie consent banner
│   ├── CustomCursor.tsx
│   └── Seo.tsx                # Meta tags, canonical/hreflang, structured data
├── pages/
│   ├── index.tsx              # Home (all sections)
│   ├── cv/index.tsx           # CV page (noindex)
│   ├── cookies/index.tsx      # Cookie policy page
│   ├── 404.tsx
│   ├── _app.tsx               # Fonts, Lenis, LocaleProvider
│   └── _document.tsx          # <html lang> from the URL locale
├── locale/
│   ├── LocaleContext.tsx      # Locale from the router + useLocale hook
│   ├── types/                 # Dictionary shape, split per area
│   ├── data/{pl,en}/          # services, projects, experiences
│   └── {pl,en}.ts             # Dictionaries
├── lib/
│   ├── site.ts                # Domain and business identity (single source)
│   ├── gsap.ts                # GSAP + ScrollTrigger registration
│   ├── motion.ts              # prefers-reduced-motion helpers
│   ├── breakpoints.ts         # Breakpoints mirrored from globals.css
│   ├── scrambleReveal.ts      # Text scramble/reveal animation
│   └── shared/
│       ├── Icons.tsx          # Centralized icon exports
│       └── techMap.ts         # Tech-to-icon mappings
├── hooks/
│   ├── useScrollTriggers.ts   # GSAP trigger lifecycle management
│   ├── useReveal.ts           # Stagger fade-in on scroll
│   ├── useViewport.ts         # Width, height and breakpoint tier
│   ├── usePrefersReducedMotion.ts
│   ├── useTilt.ts             # Pointer-following card tilt
│   └── usePortfolioScroll.ts  # Portfolio scroll animation hook
├── styles/
│   └── globals.css            # Theme tokens, section arrows, scrollbar
└── __tests__/
```

---

## Showcased Projects

| Project                     | Stack                                          | Links                                                                                                                                                  |
| --------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Polonez Autodrive**       | JavaScript, Three.js, 3D Studio Max            | [Live](https://polonez-autodrive.vercel.app/) · [Repo](https://github.com/SkorczanFFF/Polonez-Autodrive)                                               |
| **VAT-OFF**                 | JavaScript, Chrome Extension API, CSS          | [Chrome Web Store](https://chromewebstore.google.com/detail/vat-off/lplomppbbkgehcldiilhckbdalnblhdl) · [Repo](https://github.com/SkorczanFFF/VAT-OFF) |
| **Pokédex**                 | React, TypeScript, Vite, TanStack Query        | [Live](https://www.pokedex.skoftware.pl/) · [Repo](https://github.com/SkorczanFFF/pokedex)                                                             |
| **SKOFTWARE Portfolio**     | Next.js, TypeScript, TailwindCSS, R3F, Blender | [Live](https://mskorus.vercel.app/) · [Repo](https://github.com/SkorczanFFF/mskorus-remaster)                                                          |
| **Yet Another Weather App** | React, JavaScript, Sass, Vanta.js, Open-Meteo  | [Live](https://yet-another-weather-app.vercel.app/) · [Repo](https://github.com/SkorczanFFF/YetAnotherWeatherApp/)                                     |

---

## Getting Started

**Requirements:** Node >= 24.0.0, npm >= 10.7.0

```bash
npm install
npm run dev
```

### Scripts

| Command                | Description                    |
| ---------------------- | ------------------------------ |
| `npm run dev`          | Development server             |
| `npm run build`        | Production build               |
| `npm start`            | Start production server        |
| `npm run lint`         | Lint source files              |
| `npm run lint:fix`     | Lint, fix, and format          |
| `npm run lint:strict`  | Lint with max 10 warnings      |
| `npm run typecheck`    | TypeScript type checking       |
| `npm test`             | Run Jest tests                 |
| `npm run test:watch`   | Run Jest in watch mode         |
| `npm run format`       | Format all files with Prettier |
| `npm run format:check` | Check formatting without write |

---

## Design

**Fonts:** Space Grotesk (body), Unica One (headings)

**Color palette:**

| Color          | Hex       | Usage                |
| -------------- | --------- | -------------------- |
| Primary Blue   | `#001a25` | Main background      |
| Secondary Blue | `#0b0d16` | Dark accent areas    |
| White          | `#e4e4e4` | Body text            |
| Raspberry      | `#801834` | Accent, hover states |
| Orange         | `#992210` | Secondary accent     |

---

## Deployment

Hosted on **Vercel** with automatic deploys. Sitemap is generated post-build via `next-sitemap`.
