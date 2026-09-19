# SKOFTWARE

Website of **SKOFTWARE Maciej Skorus** — a one-person software house. Built with Next.js 16 (pages router), React 19, TypeScript and Three.js: an offer-first landing page with an interactive 3D hero, GSAP scroll animations, Polish/English content routed by URL, a consent-gated analytics setup and a built-in web CV.

**Live:** [www.skoftware.pl](https://www.skoftware.pl/) · English: [www.skoftware.pl/en](https://www.skoftware.pl/en)

---

## Tech Stack

### Core

| Technology  | Version | Purpose                                                |
| ----------- | ------- | ------------------------------------------------------ |
| Next.js     | 16.2    | Framework — pages router, built-in i18n, webpack build |
| React       | 19.2    | UI library                                             |
| TypeScript  | 5.9     | Strict type safety                                     |
| TailwindCSS | 4.2     | Utility-first styling, theme tokens in `globals.css`   |

### 3D & Animation

| Technology         | Version | Purpose                                     |
| ------------------ | ------- | ------------------------------------------- |
| Three.js           | 0.183   | 3D rendering engine                         |
| @react-three/fiber | 9.5     | React renderer for Three.js                 |
| @react-three/drei  | 10.7    | R3F helpers (`Float`)                       |
| maath              | 0.10    | Camera easing                               |
| GSAP               | 3.14    | Scroll-triggered animations (ScrollTrigger) |
| Lenis              | 1.3     | Smooth scrolling                            |

### Utilities

| Technology                  | Purpose                                                |
| --------------------------- | ------------------------------------------------------ |
| react-icons                 | Icon library (tech icons, UI glyphs)                   |
| react-error-boundary        | Fallback when the WebGL canvas fails                   |
| react-intersection-observer | Pauses the 3D frameloop when the hero is off-screen    |
| @vercel/analytics           | Usage analytics — mounted only after analytics consent |
| @vercel/speed-insights      | Web Vitals — mounted only after analytics consent      |
| next-sitemap                | `sitemap.xml` + `robots.txt` on `postbuild`            |
| puppeteer (dev)             | Renders the CV page to static PDFs                     |

---

## Features

### Home page

Sections, top to bottom: Hero → Services → Process → TechStrip → Why me → FAQ → Portfolio → Footer (contact).

- **Hero** — offer headline and CTAs rendered on the server, over a client-only 3D scene. On phones and portrait tablets the copy splits around the portrait (headline pinned under the header, pitch and CTAs pinned to the bottom).
- **Services** — six craft cards (websites, web apps, AI integration, 3D/WebGL, mobile, maintenance) with deliverables and an individual-quote note; pointer tilt on desktop, a scroll-driven lift on touch.
- **Process** — four "how I work" steps.
- **TechStrip** — the load-bearing stack on the animated brand gradient.
- **Why me** — trust block: one contractor from idea to maintenance.
- **FAQ** — single-open accordion; answers ship in the HTML and mirror into `FAQPage` JSON-LD.
- **Portfolio** — pinned horizontal scroll on desktop with per-panel entrance/exit animations, vertical fade-in on mobile; hover swaps to a second screenshot.
- **Footer** — direct contact, socials, CV links, NIP / VAT invoicing note, and a heading that cycles through "let's talk" in five languages.

### 3D hero scene

- Portrait image converted to a particle field at runtime (alpha-sampled, GPU-driven)
- Bio text particles flowing along Bézier paths, custom GLSL vertex/fragment shaders
- Camera rig follows the mouse on desktop and device orientation on mobile (iOS permission on first touch)
- Tap/click shockwaves through the particles, with a CSS ripple and haptic feedback where supported
- Frameloop stops when the hero leaves the viewport; `dpr` capped at 1, no antialiasing

### Scroll animations (GSAP ScrollTrigger)

- Shared `useReveal` hook for stagger fade-ins (Process, TechStrip, Why me)
- Batch 3D depth-settle for service cards
- Text scramble on the hero eyebrow and the footer heading
- Everything honours `prefers-reduced-motion`

### Internationalization

- Polish at `/`, English at `/en/*` via Next.js i18n routing — no detection, no persistence
- Canonical, `hreflang` and `og:locale` per language; `/resume` redirects to `/cv`
- Every user-facing string, including `aria-label`s and `alt` text, lives in `src/locale`

### CV

- `/cv` (noindex) — sidebar + content layout with `Person` JSON-LD
- Static PDFs in `public/`, regenerated with `node scripts/generate-cv-pdf.mjs` against a running dev server

### Cookie consent & privacy

- Consent banner with necessary / analytics categories, stored in the `cookie_consent` cookie for 182 days
- `/cookies` policy page whose table describes exactly what the site sets; domain, e-mail and NIP are filled from `src/lib/site.ts`
- Vercel Analytics and Speed Insights render only after consent

### Other

- Custom cursor (fine pointer only, off under reduced motion)
- Active-section tracking in the header, scroll-to-top button, route-change loader
- `ProfessionalService` JSON-LD with the service catalogue

---

## Project structure

```
src/
├── components/
│   ├── Hero/
│   │   ├── Hero.tsx               # Section shell, server-rendered copy, arrows
│   │   ├── HeroScene.tsx          # R3F canvas (client only), tap pulses
│   │   └── Partials/
│   │       ├── Scene.tsx          # Portrait + bio particles + background
│   │       ├── Background.tsx     # Typographic background planes
│   │       ├── TapRipple.tsx, ScrollButton.tsx, colors.ts
│   │       ├── imageParticles/    # Image-to-particle pipeline
│   │       └── shaders/           # GLSL vertex & fragment shaders
│   ├── Services/                  # Craft cards
│   ├── Process/                   # "How I work" steps
│   ├── TechStrip/                 # Stack icons on the brand gradient
│   ├── WhyMe/                     # Trust block
│   ├── Faq/                       # Accordion + FAQPage schema
│   ├── Portfolio/                 # Horizontal scroll showcase
│   ├── ui/                        # Section, SectionTitle, SectionArrow, Button, ExternalLink
│   ├── layout/
│   │   ├── Header/                # Nav, locale toggle, active-section tracking
│   │   ├── Footer/                # Contact, socials, CV links
│   │   ├── BottomBar.tsx          # Copyright + cookie policy link
│   │   └── Layout.tsx             # Consent-gated Analytics / Speed Insights
│   ├── CookieConsent.tsx          # Banner, preferences modal, consent helpers
│   ├── CustomCursor.tsx
│   ├── LoaderOverlay.tsx          # Shown during route changes
│   ├── ScrollToTop.tsx
│   └── Seo.tsx                    # Title, meta, canonical/hreflang, JSON-LD, favicons
├── pages/
│   ├── index.tsx                  # Home
│   ├── cv/index.tsx               # CV page (noindex)
│   ├── cookies/index.tsx          # Cookie policy
│   ├── 404.tsx
│   ├── _app.tsx                   # Fonts, Lenis, LocaleProvider, global chrome
│   └── _document.tsx              # <html lang> from the URL locale
├── locale/
│   ├── LocaleContext.tsx          # Locale from the router, useLocale()
│   ├── types/                     # Dictionary shape: common, marketing, cv, legal, a11y, entries
│   ├── data/{pl,en}/              # services, projects, experiences
│   └── {pl,en}.ts                 # Dictionaries
├── lib/
│   ├── site.ts                    # Domain and business identity — single source
│   ├── gsap.ts                    # GSAP + ScrollTrigger registration
│   ├── motion.ts                  # prefers-reduced-motion helpers
│   ├── breakpoints.ts             # Breakpoints mirrored from globals.css
│   ├── scrambleReveal.ts          # Text scramble animation
│   ├── envelope.ts                # Pulse envelope shared with the shaders
│   ├── portfolioPanelWidth.ts     # Panel width from viewport height
│   └── shared/
│       ├── Icons.tsx              # Icon exports
│       └── techMap.ts             # Tech label → icon
├── hooks/
│   ├── useScrollTriggers.ts       # ScrollTrigger lifecycle
│   ├── useReveal.ts               # Stagger fade-in on scroll
│   ├── useViewport.ts             # Width, height and breakpoint tier
│   ├── usePrefersReducedMotion.ts
│   ├── useTilt.ts                 # Pointer-following card tilt
│   ├── useTactilePulse.ts         # Canvas tap → pulses, ripples, haptics
│   ├── useDeviceOrientation.ts    # Gyro input for the camera rig
│   └── usePortfolioScroll.ts      # Pinned horizontal scroll
├── styles/globals.css             # Theme tokens, brand gradient, section arrows
├── types/                         # glsl and jest-dom declarations
└── __tests__/                     # Jest (lib + locale)

scripts/generate-cv-pdf.mjs        # Puppeteer → public/Maciej Skorus - CV [PL|EN].pdf
next-sitemap.config.js             # Sitemap with pl/en alternates, /cv excluded
```

---

## Showcased projects

| Project                     | Stack                                         | Links                                                                                                                                                  |
| --------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Polonez Autodrive**       | JavaScript, Three.js, 3D Studio Max           | [Live](https://www.polonez-autodrive.skoftware.pl/) · [Repo](https://github.com/SkorczanFFF/Polonez-Autodrive)                                         |
| **VAT-OFF**                 | JavaScript, Chrome Extension API, CSS         | [Chrome Web Store](https://chromewebstore.google.com/detail/vat-off/lplomppbbkgehcldiilhckbdalnblhdl) · [Repo](https://github.com/SkorczanFFF/VAT-OFF) |
| **Pokédex**                 | React, TypeScript, Vite, TanStack Query       | [Live](https://www.pokedex.skoftware.pl/) · [Repo](https://github.com/SkorczanFFF/pokedex)                                                             |
| **SKOFTWARE**               | Next.js, TypeScript, TailwindCSS, R3F, GSAP   | [Live](https://www.skoftware.pl/) · [Repo](https://github.com/SkorczanFFF/mskorus-remaster)                                                            |
| **Yet Another Weather App** | React, JavaScript, Sass, Vanta.js, Open-Meteo | [Live](https://www.yet-another-weather-app.skoftware.pl/) · [Repo](https://github.com/SkorczanFFF/YetAnotherWeatherApp/)                               |

---

## Getting started

**Requirements:** Node >= 24, npm >= 10.7

```bash
npm install
npm run dev
```

`NEXT_PUBLIC_SITE_URL` (optional, `.env`) overrides the site URL used for canonical links, structured data and the sitemap.

### Scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Development server (webpack)             |
| `npm run build`        | Production build + sitemap (`postbuild`) |
| `npm start`            | Start the production server              |
| `npm run lint`         | ESLint                                   |
| `npm run lint:fix`     | ESLint with fixes, then Prettier         |
| `npm run lint:strict`  | ESLint with at most 10 warnings (CI)     |
| `npm run typecheck`    | TypeScript                               |
| `npm test`             | Jest                                     |
| `npm run test:watch`   | Jest in watch mode                       |
| `npm run format`       | Prettier, write                          |
| `npm run format:check` | Prettier, check only (CI)                |

CI (`.github/workflows/lint.yml`) runs `lint:strict`, `typecheck`, `format:check` and `test` on every push to `main` and every pull request.

### Regenerating the CV PDFs

With the dev server running:

```bash
node scripts/generate-cv-pdf.mjs
```

Renders `/cv` and `/en/cv` with Puppeteer and overwrites the two PDFs in `public/`.
