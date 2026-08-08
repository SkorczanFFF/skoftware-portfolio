# CLAUDE.md

Instrukcje robocze dla Claude Code w tym repo. Nadrzędne wobec zachowań domyślnych.

Fakty w tym pliku zweryfikowano w kodzie **2026-08-04** (gałąź `feat/conversion`).
Jeśli któryś przestanie się zgadzać — popraw plik, nie obchodź go.

---

## 0. Trzy zasady nadrzędne

### 1. Weryfikuj, nie zakładaj

Zanim coś stwierdzisz o tym repo — **otwórz plik**. Pamięć z wcześniejszej części rozmowy,
podsumowanie kontekstu i „tak zwykle bywa w Next.js" nie są dowodem.

Konkretne sposoby, w jakie to repo już wprowadziło w błąd:

| Pułapka | Dowód |
|---|---|
| **Komentarz kłamie, kod nie** | `scripts/generate-cv-pdf.mjs:9-10` deklaruje `public/cv-en.pdf`; linia 155 zapisuje `Maciej Skorus - CV [EN].pdf`. Cytowanie komentarza dałoby zły wniosek |
| **`grep` łapie podciągi** | `grep "useViewport"` matchuje też `useViewportSize` — to dwa różne hooki (kategoria breakpointu vs piksele). Zawężaj wzorzec |
| **„Nieużywane" bywa używane gdzie indziej** | `LoaderOverlay` zniknął z `index.tsx`, ale żyje w `_app.tsx:11,84` (przejścia między trasami). Przed uznaniem czegoś za martwe sprawdź `_app.tsx`, `_document.tsx`, `scripts/`, `next-sitemap.config.js` |

Nie zgaduj też **treści**. Liczba wdrożeń, ceny, nazwy klientów, czasy realizacji — jeśli nie
ma tego w repo i Maciej tego nie potwierdził, wstaw `{{placeholder}}` i wypunktuj jako bramkę.
Wymyślona liczba na stronie usługodawcy to nie „wypełniacz", tylko fałszywa obietnica.

### 2. Raportuj stan faktyczny

- **Lint nie jest czysty i nigdy nie był.** Baseline: **8 problemów (1 błąd + 7 ostrzeżeń)**.
  Błąd to `react-hooks/refs` w `src/hooks/useTactilePulse.ts:30` — zastany, świadomy.
  `npm run lint:strict` przepuszcza do 10 ostrzeżeń (`--max-warnings=10`).
  **Nigdy nie pisz „lint czysty".** Podaj liczbę i porównaj z baseline; baseline mierzysz
  przez `git stash && npm run lint && git stash pop`.
- Czego nie sprawdziłeś — napisz, że nie sprawdziłeś. Brak weryfikacji to informacja, nie luka
  do zapełnienia optymizmem.
- Jeśli część zakresu jest zablokowana, dokończ całą resztę i **wprost** powiedz, co zostało
  i dlaczego.
- Zepsucie czegoś przy okazji zgłaszaj sam, natychmiast. W tej przebudowie zdarzyło się już
  dwa razy (martwa kotwica `#experience`, usunięty dispatch `hero:ready`) — oba przeszłyby
  bez błędu i bez czerwonego testu.

### 3. DRY — jedno źródło prawdy

Zanim dopiszesz stałą, komponent albo hook — sprawdź, czy to już istnieje (§3 i §4).
Duplikat w tym repo już wystąpił: domena była zapisana na trzy sposoby, zanim powstał
`src/lib/site.ts`.

---

## 1. Co to za projekt

Strona **SKOFTWARE Maciej Skorus** — jednoosobowej firmy usługowej (software house).
Trwa przebudowa z portfolio programisty pod rekrutację na stronę usługodawcy z ofertą.

- **Pełna specyfikacja wykonawcza: [`CONVERSION.md`](./CONVERSION.md)** — diagnoza, decyzje
  `DEC-01…11`, etapy `E0…E5`, bramki treściowe `C1…C8`. Czytaj przed każdą partią.
- Praca idzie **partiami, z pauzą na przegląd po każdej**. Nie łącz partii bez zgody.
- Gałąź robocza: `feat/conversion`.
- Strona `/cv` **zostaje** — to świadomy wyjątek, nie pozostałość.

---

## 2. Stack i granice

| | |
|---|---|
| Next.js **16.2, pages router** | `src/pages/` |
| React 19 · TypeScript strict | alias `@/*` → `./src/*` (`tsconfig.json:17`) |
| Tailwind **4** | tokeny w `@theme` w `src/styles/globals.css` — **nie ma `tailwind.config`** |
| three.js · @react-three/fiber · drei · maath | scena hero |
| GSAP + ScrollTrigger · Lenis | animacje i smooth scroll |
| Jest + Testing Library + `next-router-mock` | 4 pliki testów, **29 testów** |
| Vercel | `@vercel/analytics`, `@vercel/speed-insights` |

**Czego tu NIE ma — nie sięgaj po to:**

- App Router. Żadnego `app/`, `use client`, Server Actions ani `next/navigation`.
  Pages router jest wybrany świadomie: wspiera wbudowane `i18n`, którego App Router nie ma
  (`CONVERSION.md` §6).
- Turbopack w buildzie — `package.json` używa `next build --webpack` i `next dev --webpack`
  (loadery `@svgr/webpack` i `glsl` w `next.config.js`).
- `src/pages/api/` — jeszcze nie istnieje. Powstanie przy formularzu (E1.7).

---

## 3. Jedno źródło prawdy

| Co | Gdzie | Uwaga |
|---|---|---|
| Domena, e-mail, telefon, NIP, nazwa firmy, socjale | `src/lib/site.ts` | **jedyne** miejsce, gdzie te wartości są literalne |
| To samo dla sitemapy | `next-sitemap.config.js` | CommonJS poza buildem TS — **nie może** importować z `src/`. Synchronizacja ręczna; w pliku jest o tym komentarz |
| Domena/e-mail w prozie prawnej | placeholdery `{domain}`, `{email}` + `fill()` w `src/pages/cookies/index.tsx` | nie wklejaj wartości do słowników |
| Wszystkie teksty widoczne dla użytkownika | `src/locale/{pl,en}.ts` + `src/locale/data/{pl,en}.ts` | **zero stringów w komponentach** |
| Kształt słownika | `src/locale/types.ts` | `pl` i `en` muszą iść w parze — typ to wymusi |
| Ikony technologii | `src/lib/shared/techMap.ts` | |
| Ikony SVG | `src/lib/shared/Icons.tsx` | |
| Punkty łamania | `src/lib/breakpoints.ts` | nie hardkoduj pikseli w JS |
| GSAP i ScrollTrigger | `src/lib/gsap.ts` | importuj stąd, nie z `'gsap'` — rejestracja pluginów jest tam |
| Rejestracja ScrollTriggerów | hook `useScrollTriggers` | ogarnia sprzątanie |

---

## 4. Ciche sprzężenia

Te rzeczy psują się **bez błędu, bez czerwonego testu i bez zmiany w buildzie**.
Dotykając ich — sprawdź drugą stronę.

| Sprzężenie | Gdzie | Co się stanie po cichu |
|---|---|---|
| Event `hero:ready` | dispatch `HeroScene.tsx:135` → listener `useTactilePulse.ts:72` | `useTactilePulse` podpina `pointerdown` do `<canvas>`, którego nie ma przy pierwszym montażu — event to jego jedyny sygnał do ponowienia. Bez dispatchu tap-ripple po prostu nie działa |
| Białe strzałki między sekcjami | `Portfolio.tsx:40` ma `arrow-down white` przy górnej krawędzi | Sekcja **nad** Portfolio musi mieć białe tło (dziś `WhyMe` z `bg-white`, wcześniej `Industries`). Zmiana tła = biała strzałka na kolorowym tle |
| Kotwice nawigacji | `Header.tsx:38` (`SECTION_IDS`) i `Header.tsx:102-108` (`links`) | Muszą pokrywać się z realnymi `id=` w DOM. Martwa kotwica nie rzuca błędu — po prostu nic nie robi |
| Trasy zaszyte w skryptach | `scripts/generate-cv-pdf.mjs:33,171` → `/cv` | Zmiana routingu cicho psuje generowanie PDF. Zorientujesz się przy następnej regeneracji |
| Klasy Tailwind | wzorzec: `ACCENTS` w `Industries.tsx:20` | Tailwind 4 skanuje **tekst źródłowy**. `text-${kolor}` nie wygeneruje klasy. Zawsze pełne literały |
| Animacje tekstu a SSR | `HeroCopy.tsx`, `src/lib/scrambleReveal.ts` | Finalny tekst musi być w HTML; scramble animuje **po hydratacji**. Inaczej crawler dostaje losowe znaki zamiast nagłówka |
| `router.asPath` a locale | `src/components/Seo.tsx` | `asPath` **nie zawiera** prefiksu języka. Canonical i hreflang budowane ręcznie |
| Polityka cookies a realne cookies | `src/pages/cookies/index.tsx` ↔ `LocaleContext.tsx` | Tabela musi opisywać dokładnie to, co strona ustawia. Test w `LocaleContext.test.tsx` pilnuje, że locale **nie** trafia do `localStorage` ani cookie — nie obchodź go |
| `next.config.js` | i18n, `redirects()` | Zmiany wymagają restartu serwera dev. **Poproś Macieja** (patrz §7) |

---

## 5. i18n

- Język jest **w URL-u**: `/` → PL (domyślny), `/en/*` → EN. Wbudowane `i18n` Next
  (`next.config.js:11-15`), `localeDetection: false`.
- Stan języka czytany z `router.locale` w `src/locale/LocaleContext.tsx`. **Zero persystencji**
  — bez `localStorage`, bez cookie. To decyzja, nie przeoczenie.
- Publiczne API `useLocale()` (`{ locale, setLocale, t }`) jest stabilne — **21 wywołań**
  w repo. Nie zmieniaj sygnatury; zmiana rozlewa się na cały interfejs.
- Każdy nowy tekst dodajesz **równolegle w `pl` i `en`**. `types.ts` to wymusi przy typechecku.

---

## 6. Styl kodu

- **Komentarze w kodzie po angielsku** — całe repo tak ma. Rozmowa i dokumenty (`CONVERSION.md`,
  ten plik) po polsku.
- Komentarz tłumaczy **dlaczego**, nie **co**. Jeśli opisuje linijkę pod spodem — skasuj go.
  Szczególnie komentuj ciche sprzężenia z §4 — one nie bronią się same.
- `simple-import-sort` porządkuje importy (kolejność **bez rozróżniania wielkości liter**:
  `@/lib/shared/Icons` przed `@/lib/site`). Nie układaj ręcznie — `npm run lint:fix`.
- Pojedyncze cudzysłowy w JSX (Prettier).
- Pisz kodem, który wygląda jak sąsiedni: ta sama gęstość komentarzy, te same idiomy.

---

## 7. Czego nie robić

- **Nie uruchamiaj serwera.** Maciej prowadzi własny `npm run dev`. Odpalenie własnego
  (albo `rm -rf .next && npm run build`) podmienia mu artefakty dev na produkcyjne i wywala
  stronę — **to się już zdarzyło**. Weryfikuj `curl`em przeciw jego serwerowi albo z outputu
  `npm run build`.
- **Nie uruchamiaj `scripts/generate-cv-pdf.mjs`** bez zgody — nadpisuje zacommitowane
  `public/Maciej Skorus - CV [PL|EN].pdf`.
- **Dane CV zostają, mimo że sekcje główne zniknęły.** `src/components/Experience/` i
  `src/components/Skills/` **usunięto** (2026-08-08, pivot skasował `/o-firmie`). Ale
  `experiences` (`ExperienceEntry`) i nagłówki `resumeHeader*` **wciąż renderuje `/cv`** —
  nie kasuj ich. `techCategoryGroups` w `techMap.ts` używa `TechStrip` + test — też zostaje.
- **Nie sprzątaj długu ad hoc.** Znany martwy kod (`src/lib/generatePdf.ts`), `vercel.json`
  z legacy `builds`, `puppeteer` w `dependencies` — wszystko rozpisane w `CONVERSION.md` §E4.
  Zgłoś, jeśli znajdziesz więcej; nie łącz z bieżącą partią.
- **Nie commituj `.claude/settings.local.json`** — plik narzędziowy, nie część projektu.

---

## 8. Weryfikacja przed każdym raportem

```bash
npm run typecheck    # musi przejść
npm test             # 29 testów, muszą przejść
npm run lint         # porównaj z baseline 8 problemów — nie twierdź, że jest czysto
npm run build        # TYLKO za zgodą Macieja (patrz §7)
```

Do sprawdzania renderowanego HTML-u używaj serwera Macieja:

```bash
curl -s localhost:3000/    | grep -o '<html lang="[a-z]*"'   # pl
curl -s localhost:3000/en  | grep -o '<html lang="[a-z]*"'   # en
curl -sI localhost:3000/resume | grep -i location            # /cv
```

Uwaga na JSON-LD: skrypt renderuje się jako
`<script type="application/ld+json" data-next-head="">`, więc wzorzec musi być
`ld\+json"[^>]*>(.*?)</script>`.
