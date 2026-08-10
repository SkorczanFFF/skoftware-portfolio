# CONVERSION.md — przebudowa skoftware z portfolio na stronę usługodawcy

Dokument wykonawczy. Opisuje przejście strony z **portfolio programisty pod rekrutację** na
**stronę firmy usługowej z ofertą**, przy zachowaniu strony CV.

- **Status:** W REALIZACJI na `feat/conversion` (poligon, w pełni lokalny) — patrz „Status wdrożenia" niżej
- **Autor planu:** Claude
- **Repo:** `mskorus-remaster` (Next.js 16.2.1, pages router, React 19, TS, Tailwind 4)
- **Data:** 2026-07-28 · ostatnia aktualizacja statusu: 2026-08-08

**Legenda statusów zadań:** `[ ]` do zrobienia · `[~]` w toku · `[x]` zrobione · `[!]` zablokowane (czeka na decyzję/treść)

---

## Status wdrożenia — aktualizacja 2026-08-08

**Gałąź `feat/conversion` to poligon („rzeźbimy"), w pełni lokalny — nic nie wdrożone.**
Decyzja Macieja (2026-08-08): zostajemy tu i dłubiemy dalej; **czysty port krok-po-kroku
pójdzie później na nowej gałęzi**, z wiedzy zebranej tutaj. Lista długu niżej to wsad do portu.
Zmiany merytorycznie są dobre — problem jest w drodze do nich (reaktywne łatki, nie projekt).

### Zmiana kierunku (2026-08-08) — po analizie reference `konradszczepanowski.com`

Maciej wskazał stronę, która mu się podoba: **craft-portfolio bez cen i bez „o firmie"**.
Wniosek + decyzje (ten blok **nadpisuje** starsze DEC-05/DEC-06 i etapy niżej):

- **Kierunek: hybryda craft-leaning.** Kręgosłup = case studies z twardymi metrykami + „jak
  pracuję" + zwięzły „dlaczego ja" na stronie głównej. Sprzedajemy **rzemiosło i efekty, nie
  „firmę"**. Reszta (ceny, ciężka scaffolding usługowa) tylko na tyle, na ile pomaga.
- **DEC-05 ZREWIDOWANE:** `/o-firmie` **nie powstaje jako strona.** Zaufanie = trust-chipy
  (faktura VAT, NIP 6252501911) w stopce/kontakcie + krótki blok na home. Zaparkowane
  `Experience`/`Skills` wracają **na home w formie craft** (proces / stack), nie jako osobna strona.
- **DEC-06 ZREWIDOWANE:** **tylko „wycena indywidualna", bez widełek.** `priceFrom` zostaje
  w typie jako opcjonalne, ale trwale puste; karta renderuje `servicesPricingNote`.
  **Bramka C1 (6 liczb) — nieaktualna, zdjęta.**
- **Podstrony `/uslugi/[slug]`:** pod znakiem zapytania (reference ich nie ma). Domyślnie
  lekka oferta = **bogatsze karty na home** (+ ewentualnie jedna `/uslugi`), bez 6 ciężkich
  podstron. Decyzja przy Partii usług.

Wpływ na partie: **7** (usługi) — odblokowana, bez cen; **8** (`/o-firmie`) — skasowana jako
strona, zamieniona na trust-chipy + rehome craft na home; **12** (`/uslugi/[slug]`) — wstrzymana
do decyzji; **9** (case studies) staje się głównym silnikiem zaufania (nadal bramki G6 + C4).

### Zrobione — zmapowane na commity

| Partia | Zakres | Commit(y) |
|---|---|---|
| plan | dokument konwersji | `0e718f7` |
| 1 | Experience/Skills → Branże + TechStrip; branże jako editorial rows | `788cead`, `111a789` |
| 2 | i18n w URL (PL na `/`, EN na `/en`), bez persystencji | `25f3912` |
| 3 | Hero z ofertą + CTA, copy renderowane serwerowo | `defcc14` |
| 4 | hreflang/canonical/schema `ProfessionalService`; drop Chandrastic; `src/lib/site.ts` | `2797109` |
| 5 | `/resume` → `/cv`, CV poza indexem, redirect | `245ef21` |
| — | CLAUDE.md + zapis decyzji o formularzu | `15b7188` |
| 6 (okrojona) | `slug` + model cenowy w `ServiceEntry` (bez liczb — bramka C1); DEC-06 doprecyzowane | `01fe6fe` |
| hero | mirror sceny: portret w prawo, strumień particli odwrócony | `d6e47bb` |
| hero | copy left-align + skalowanie 1440p | `ae8ac9b` |
| 7 | usługi w duchu craft: `deliverables`, nota o wycenie, CTA; rename About→Services (D2/D3/T10/T11) | `7401592` |
| 8 | sekcja `WhyMe` (zamiast strony `/o-firmie`) + trust-chipy NIP/faktura w stopce | `74b6261` |
| 8+ | usunięcie martwych `Experience`/`Skills` + osieroconych kluczy (D9) | `512794b` |
| 10a | sekcja `Process` („Jak pracuję", 4 kroki) | — (świeże) |
| 10b | sekcja `Faq` (6 pytań + `FAQPage` schema); treść z zatwierdzonych faktów | — (świeże) |
| 14 (część) | dług D4–D7 posprzątany: martwy kod, `vercel.json` `builds`, `puppeteer`→dev, komentarz | — (świeże) |

Partia 6 celowo **okrojona**: pełny podział słowników na moduły odłożony (patrz D8) — moduły
`cases/marketing/legal` byłyby pustym rusztowaniem przed swoją treścią.

### Świadome wyjątki — NIE „sprzątać" w porcie
- `/cv` — zostaje, `noindex, follow`.
- (Uwaga: `Experience`/`Skills` przestały być wyjątkiem — patrz D9, są już do usunięcia.)

### Dług i leftovery do czystego portu (zweryfikowane w kodzie 2026-08-08)

| # | Rzecz | Dowód | Jak zrobić w porcie |
|---|---|---|---|
| D1 | Hero copy: magic numbers + własny breakpoint `min-[2000px]` (łatki na gap i 1440p) | `HeroCopy.tsx` | zaprojektować jako grid 2-kol + fluid `clamp()`, bez ręcznych progów |
| D2 | Podwójny `max-w` na jednym elemencie — `1200px` martwe, `800px` wygrywa | `About.tsx:220` (T11) | jeden świadomy `max-w` |
| D3 | Katalog `components/About/` eksportuje komponent `Services` | (T10) | od razu `components/Services/` |
| ~~D4~~ | **USUNIĘTE:** martwy `generatePdf.ts` + osierocone `html-to-image`/`jspdf` z `dependencies` | — | zrobione |
| ~~D5~~ | **USUNIĘTE:** legacy `builds` z `vercel.json` (zostaje zero-config `framework: nextjs`) | — | zrobione |
| ~~D6~~ | **PRZENIESIONE:** `puppeteer` → `devDependencies` (nie w `postbuild`, więc Vercel go nie potrzebuje) | — | zrobione |
| ~~D7~~ | **POPRAWIONE:** komentarz w `generate-cv-pdf.mjs` opisuje realne nazwy plików | — | zrobione |
| D8 | Słowniki płaskie, niemodularne | `src/locale/*` | podział typów i danych po domenie od startu |
| ~~D9~~ | **USUNIĘTE 2026-08-08** (za zgodą Macieja): komponenty `Experience`/`Skills` skasowane wraz z osieroconymi kluczami (`navExperience/Skills`, `experienceSectionTitle`, `techCategory*`). Dane `experiences` + `resumeHeader*` zostają — używa ich `/cv` | — | zrobione |

---

## 0. Zasada przewodnia

> Strona ma odpowiadać na pytanie **„czy ten człowiek rozwiąże mój problem"**, a nie
> **„czy zatrudnić tego kandydata"**.

Z tego wynikają trzy reguły, do których wracamy przy każdej wątpliwości:

1. **Każda sekcja mówi o kliencie, nie o autorze.** Nie „znam React", tylko „dostajesz panel, który obsłuży 500 uczestników".
2. **Nic nie ginie, wszystko się przenosi.** CV, doświadczenie i stos technologiczny nie są kasowane — schodzą na `/o-firmie` i `/cv`, gdzie są na miejscu.
3. **Zero zmyślonych danych.** Liczby, referencje i nazwy klientów wchodzą na stronę dopiero po potwierdzeniu przez Macieja. Placeholdery są jawne (`{{...}}`).

---

## 1. Stan obecny — ustalenia z audytu

Skrót; pełna diagnoza była w rozmowie. Tu zostają fakty, na których opiera się plan.

### 1.1 Treść

| Obszar | Stan | Plik |
|---|---|---|
| Hero | „Hej, jestem Maciej." + nazwisko + hasło. **Zero CTA.** | `src/locale/pl.ts:24-26` |
| Doświadczenie | Chronologia 3 pracodawców, stanowiska („Junior Web3…"), obowiązki w stylu CV | `src/locale/data/pl.ts:52-127` |
| Umiejętności | Ściana ~40 ikon w 5 kategoriach | `src/components/Skills/Skills.tsx` |
| Portfolio | 6 projektów, **0 komercyjnych**; autodeprecjacja w opisach | `src/locale/data/pl.ts:129-199` |
| Usługi | **Istnieją i są dobre** — 6 kart z tagline'ami. Bez cen, bez CTA, bez podstron | `src/locale/data/pl.ts:7-50` |
| CV | W nawigacji głównej + wyeksponowany blok w stopce + klauzula RODO rekrutacyjna | `Header.tsx:114`, `Footer.tsx:183-204` |
| Kontakt | Wyłącznie `mailto:` + `tel:`. Brak formularza, brak `pages/api/*` | `Footer.tsx:130-144` |
| E-mail | `skorusmaciej94@gmail.com` | `src/locale/pl.ts:59` |
| Dane firmy | SKOFTWARE, NIP 6252501911 — **tylko w polityce cookies** | `src/locale/pl.ts:115` |

### 1.2 Technika i SEO

| # | Problem | Dowód |
|---|---|---|
| T1 | Język ustawiany **po stronie klienta** — SSR zawsze `'en'`, PL nie ma własnego URL-a | `LocaleContext.tsx:40-44` |
| T2 | `hreflang` dla `en`, `pl` i `x-default` wskazuje **ten sam adres** | `Seo.tsx:47-61` |
| T3 | Schema.org deklaruje `@type: 'Person'`, `jobTitle: 'Frontend Developer'` | `Seo.tsx:91-107` |
| T4 | **Trzy domeny w obiegu**: `.env` → `mskorus.vercel.app`, fallback w kodzie → `skoftware.pl`, tekst polityki cookies → `skoftware.dev` | `.env:5`, `Seo.tsx:26`, `pl.ts:109` |
| T5 | `robots.txt` deklaruje `Host: mskorus.vercel.app` i tam kieruje sitemapę | `public/robots.txt` |
| T6 | LCP = pełnoekranowy loader; hero `ssr:false`, min. 1 s, fallback 5 s | `pages/index.tsx:22-40` |
| T7 | Cała oferta na jednym URL — brak podstron usług | `pages/` |
| T8 | Brak polityki prywatności (jest tylko cookies) | `pages/cookies/` |
| T9 | `puppeteer` w `dependencies`, używany tylko przez `scripts/generate-cv-pdf.mjs` | `package.json` |
| T10 | `components/About/About.tsx` eksportuje komponent `Services` | — |
| T11 | Duplikat `max-w-*` w jednym `className` (`max-w-[1200px]` + `max-w-[800px]`) — drugi wygrywa, `1200px` jest martwe | `About.tsx:220` |

### 1.3 Co jest dobre i zostaje bez zmian

- Design system (kolory, `Unica One` + `Space Grotesk`, gradienty, strzałki między sekcjami).
- Scena 3D — realny wyróżnik, zostaje jako **tło oferty**, nie zamiast niej.
- Header z focus trapem, Escape i zarządzaniem fokusem — dostępność na dobrym poziomie.
- Cookie consent zgodny z RODO + polityka cookies z pełną tabelą.
- Testy (Jest + Testing Library), ESLint, Prettier, workflow GitHub Actions.

---

## 2. Decyzje do zatwierdzenia

Każda ma moją rekomendację. **Do przeglądu — zaznacz zgodę lub zmień przed startem E0.**

| ID | Decyzja | Rekomendacja | Uzasadnienie | Zgoda |
|---|---|---|---|---|
| **DEC-01** | Domena kanoniczna | **`skoftware.pl`** | Własna (działają subdomeny demo), marka firmowa, PL-owy rynek. `mskorus.vercel.app` i `skoftware.dev` → 301 | ☐ |
| **DEC-02** | Domyślny język | **PL na `/`, EN na `/en/*`** | Główny rynek to Polska/Śląsk. Dziś SSR-uje się EN — to zmiana treści pod istniejącymi URL-ami, ale ruch jest znikomy | ☐ |
| **DEC-03** | Wykrywanie języka | **`localeDetection: false`** | Przewidywalne URL-e dla Google, brak zaskakujących przekierowań. Konsekwencja: znika cookie `locale` → **trzeba zaktualizować tabelę w polityce cookies** | ☐ |
| **DEC-04** | Slugi ścieżek | **Polskie dla obu języków** (`/uslugi/...`, `/en/uslugi/...`) | Next dzieli pathname między locale. PL-owe słowo w URL-u pomaga w local SEO. EN dostaje lekko niespójny adres — akceptowalne, w razie czego dołożymy `rewrites` | ☐ |
| **DEC-05** | Marka na froncie | **SKOFTWARE (firma)**, nazwisko na `/o-firmie` i `/cv` | **ZREWIDOWANE 2026-08-08 → patrz „Zmiana kierunku": bez strony `/o-firmie`; zaufanie przez trust-chipy (faktura VAT, NIP) + rehome craft na home** | ☐ |
| **DEC-06** | Ceny | ~~Widełki „od X zł" + nota~~ → **tylko „wycena indywidualna"** | **ZREWIDOWANE 2026-08-08 → patrz „Zmiana kierunku": bez widełek, sama nota `servicesPricingNote`; `priceFrom` zostaje w typie, trwale puste; bramka C1 zdjęta** | ☐ |
| **DEC-07** | E-mail firmowy | **`kontakt@skoftware.pl`** | `skorusmaciej94@gmail.com` na stronie firmowej to bezpośredni koszt zaufania | ☐ |
| **DEC-08** | Dostawca maili z formularza | **Resend** (`RESEND_API_KEY`) | Prosty, darmowy tier, wymaga weryfikacji domeny. Alternatywa bez zewnętrznej zależności: Formspree | ☐ |
| **DEC-09** | Ścieżka `/cookies` | **Zostaje bez zmian** | Rename → dodatkowe 301 bez zysku. Nowa `/polityka-prywatnosci` dochodzi obok | ☐ |
| **DEC-10** | Scena 3D na mobile | **Najpierw zmierzyć**, decyzja po danych (próg: LCP > 2,5 s lub INP > 200 ms na mid-range Androidzie → statyczny hero ≤768 px) | Nie wycinam wyróżnika „na wszelki wypadek", ale mobile to główne źródło leadów B2B | ☐ |
| **DEC-11** | Nazwy klientów w case studies | **Czeka na potwierdzenie NDA** | Bez zgody opisujemy anonimowo („organizator kongresów medycznych") | ☐ |

---

## 3. Architektura docelowa

### 3.1 Routing

```
/                          Strona główna — oferta
/uslugi                    Przegląd usług
/uslugi/[slug]             6 podstron:
                             strony-internetowe
                             aplikacje-webowe
                             integracja-ai
                             3d-webgl
                             aplikacje-mobilne
                             utrzymanie-i-rozwoj
/realizacje                Lista case studies
/realizacje/[slug]         Case study: problem → rozwiązanie → efekt
/o-firmie                  SKOFTWARE, dane rejestrowe, doświadczenie, pełny stos
/kontakt                   Formularz + dane firmowe
/cv                        ZOSTAJE (dziś /resume). noindex, follow
/cookies                   Polityka cookies (istnieje)
/polityka-prywatnosci      NOWA — wymagana przy formularzu (art. 13 RODO)
/en/*                      Pełne lustro w EN

301: /resume → /cv
301: mskorus.vercel.app/* → skoftware.pl/*
```

### 3.2 Nawigacja główna

| Dziś | Docelowo |
|---|---|
| Strona główna · Usługi · **Doświadczenie** · **Umiejętności** · Portfolio · Kontakt · **CV** | Usługi · Realizacje · O firmie · Kontakt · **[Wyceń projekt]** (CTA) |

CV wypada z nagłówka → dyskretny link w stopce.

### 3.3 Strona główna — kolejność sekcji

| # | Sekcja | Źródło | Komponent |
|---|---|---|---|
| 1 | **Hero z ofertą + CTA** | nowa treść, scena 3D zostaje jako tło | `Hero/` (refaktor) |
| 2 | **Usługi** (6 kart + ceny + linki do podstron) | istnieje | `Services/` (ex-`About/`) |
| 3 | **Pas logotypów** (6–8 kluczowych technologii) | wyciąg ze `Skills` | `TechStrip/` (nowy) |
| 4 | **Branże / dla kogo** | przekuty `experiences` | `Industries/` (nowy) |
| 5 | **Realizacje** (3 karty + „zobacz wszystkie") | przebudowane `projects` | `Cases/` (nowy) |
| 6 | **Proces współpracy** (5 kroków) | nowa treść | `Process/` (nowy) |
| 7 | **FAQ** (7 pytań + schema `FAQPage`) | nowa treść | `Faq/` (nowy) |
| 8 | **Kontakt + formularz** | nowy | `ContactForm/` (nowy) |
| 9 | Stopka z danymi firmy | istnieje, rozszerzona | `Footer/` |

**Wypada ze strony głównej:** `<Experience />`, `<Skills />` — komponenty **nie są kasowane**, przenoszą się na `/o-firmie`.

---

## 4. Etapy realizacji

Zależności: **E0 → (E1 ‖ E3) → E2 → E4 → E5**. E1 i E3 mogą iść równolegle po E0.

Rozmiar: **S** ≈ pojedyncze pliki · **M** ≈ jedna sekcja/feature · **L** ≈ przekrojowy refaktor.

Każdy etap = osobna gałąź `feat/conversion-eN-*` + PR (repo ma szablon PR i workflow lintujący).

---

### E0 — Fundamenty *(bez tego reszta nie ma sensu)*

Rozmiar: **L** · Zależności: brak · Ryzyko: **wysokie** (dotyka routingu całej strony)

#### E0.0 Odblokowanie gita `[S]`

```bash
git config --global --add safe.directory 'E:/PRODŻEKTY/mskorus-remaster'
```
Bez tego żadna komenda git nie działa w tym środowisku (`dubious ownership`).

- [ ] wykonane, `git status` działa

#### E0.1 i18n na poziomie URL `[M]` → naprawia **T1**

`next.config.js`:
```js
const nextConfig = {
  // ...istniejąca konfiguracja
  i18n: {
    locales: ['pl', 'en'],
    defaultLocale: 'pl',
    localeDetection: false,   // DEC-03
  },
  async redirects() {
    return [
      { source: '/resume', destination: '/cv', permanent: true },
      // uwaga: przy skonfigurowanym i18n Next dopasowuje `source` per-locale,
      // więc /en/resume też zostanie przekierowane. Nie dodawać `locale: false`.
    ];
  },
};
```

`src/locale/LocaleContext.tsx` — **pełna podmiana providera**, publiczne API `useLocale()` bez zmian:
```tsx
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const locale = (router.locale ?? router.defaultLocale ?? 'pl') as Locale;

  const setLocale = useCallback(
    (l: Locale) => {
      router.push(
        { pathname: router.pathname, query: router.query },
        router.asPath,
        { locale: l, scroll: false },
      );
    },
    [router],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
```
Usuwamy: `getStoredLocale()`, zapis do `localStorage`, zapis cookie `locale`, `useEffect` ustawiający `document.documentElement.lang`.

`src/pages/_document.tsx`:
```tsx
Document.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await NextDocument.getInitialProps(ctx);
  return { ...initialProps, locale: ctx.locale ?? 'pl' };
};
```
(`<Html lang={locale || 'pl'}>` — zmienić fallback z `'en'`.)

`src/__tests__/locale/LocaleContext.test.tsx` — przepisać na `next-router-mock` (jest już w devDependencies).

- [ ] `/` serwuje **PL w HTML-u serwerowym** (`curl -s https://… | grep '<html lang'`)
- [ ] `/en` serwuje EN
- [ ] przełącznik EN/PL zmienia URL, nie tylko stan
- [ ] wszystkie 34 wywołania `useLocale()` działają bez zmian w komponentach
- [ ] `npm run typecheck && npm test` zielone

#### E0.2 Poprawny `hreflang` + canonical `[S]` → naprawia **T2**

`src/components/Seo.tsx` — `router.asPath` **nie zawiera** prefiksu locale, więc:
```tsx
const path = router.asPath.split('#')[0].split('?')[0];
const clean = path === '/' ? '' : path;
const canonical = locale === 'pl' ? `${base}${clean || '/'}` : `${base}/en${clean || ''}`;
// alternates: pl → `${base}${clean || '/'}`, en → `${base}/en${clean}`, x-default → wersja pl
```

- [ ] każdy język ma własny `canonical`
- [ ] `x-default` wskazuje wersję PL
- [ ] zwalidowane w Google Rich Results Test / Ahrefs

#### E0.3 Konsolidacja domeny `[S]` → naprawia **T4, T5**

- [ ] Vercel: `NEXT_PUBLIC_SITE_URL=https://skoftware.pl` (Production + Preview)
- [ ] `.env` lokalnie to samo; zaktualizować komentarz w nagłówku pliku
- [ ] `skoftware.pl` podpięta w Vercel jako domena produkcyjna, `mskorus.vercel.app` → 301
- [ ] `src/locale/pl.ts:109` i odpowiednik w `en.ts`: **`skoftware.dev` → `skoftware.pl`**
- [ ] `npm run build` → `public/robots.txt` i `sitemap.xml` regenerują się z nową domeną
- [ ] Google Search Console: nowa właściwość + zgłoszenie sitemapy

#### E0.4 Schema.org: firma zamiast osoby `[M]` → naprawia **T3**

W `Seo.tsx` `Person` → `ProfessionalService`:
```jsonc
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://skoftware.pl/#organization",
  "name": "SKOFTWARE Maciej Skorus",
  "url": "https://skoftware.pl",
  "email": "kontakt@skoftware.pl",
  "telephone": "+48668366648",
  "vatID": "PL6252501911",
  "address": { "@type": "PostalAddress", "addressRegion": "śląskie", "addressCountry": "PL" },
  "areaServed": [{ "@type": "Country", "name": "Poland" }, { "@type": "Place", "name": "Worldwide" }],
  "founder": { "@type": "Person", "name": "Maciej Skorus" },
  "sameAs": ["https://github.com/SkorczanFFF", "https://www.linkedin.com/in/mskorus/"],
  "hasOfferCatalog": { /* 6 usług */ }
}
```

Rozkład schematów po stronach:
| Strona | Schema |
|---|---|
| wszystkie | `ProfessionalService` (globalny, przez `@id`) |
| `/uslugi/[slug]` | `Service` + `BreadcrumbList` |
| `/realizacje/[slug]` | `CreativeWork` + `BreadcrumbList` |
| sekcja FAQ | `FAQPage` |
| **`/cv`** | **`Person`** — tu jest na miejscu |

- [ ] `Seo.tsx` przyjmuje prop `schema?: object` do nadpisania/rozszerzenia per strona
- [ ] wszystkie typy przechodzą Google Rich Results Test bez błędów

#### E0.5 E-mail firmowy `[S]` → **DEC-07**

- [ ] skrzynka `kontakt@skoftware.pl` działa
- [ ] podmiana w `src/locale/pl.ts:59`, `en.ts`, w polityce cookies (3 wystąpienia w każdym języku) i w schema

#### E0.6 Restrukturyzacja słowników `[M]`

Dziś `Dictionary` to płaska struktura 178 pól. Po dodaniu 6 podstron usług, case studies, procesu i FAQ pęknie.

Zasada: **istniejące klucze zostają płaskie** (zero zmian w 34 wywołaniach), **nowe treści trafiają do zagnieżdżonych przestrzeni nazw**.

```
src/locale/
  types/
    common.ts     nawigacja, SEO, stopka, kontakt
    services.ts   ServiceEntry (rozszerzony) + ServicesCopy
    cases.ts      CaseStudy
    marketing.ts  ProcessStep, FaqItem, Industry, TrustStat
    legal.ts      cookies + polityka prywatności
    cv.ts         wszystko z prefiksem resume*
    index.ts      composed Dictionary (re-export)
  data/
    pl/{services,cases,experiences,process,faq,industries}.ts
    en/{...}
  pl.ts / en.ts   spięcie w Dictionary
```

Rozszerzone typy:
```ts
export type ServiceEntry = {
  slug: string;              // NOWE — klucz routingu
  icon: string;
  title: string;
  tagline: string;
  description: string;       // krótki, do karty na stronie głównej
  priceFrom?: string;        // DEC-06, np. '4 900 zł'
  deliverables: string[];    // „co dostajesz" — 3-5 pozycji
  outcomes: string[];        // „co to daje" — język korzyści
  forWhom: string[];
  bodyIntro: string;         // treść podstrony, 2-3 akapity
  faq?: FaqItem[];
  relatedCaseSlugs?: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  client?: string;           // pusty gdy confidential (DEC-11)
  clientAnonymized: string;  // np. 'organizator kongresów medycznych'
  confidential: boolean;
  industry: string;
  year: string;
  cover: string;
  challenge: string;         // problem klienta
  solution: string[];        // co zrobiliśmy
  outcome: string[];         // efekt — liczby jeśli są
  stack: string[];
  live?: string;
  git?: string;
  serviceSlugs: string[];
};

export type ProcessStep = { step: number; title: string; description: string; duration?: string };
export type FaqItem     = { q: string; a: string };
export type Industry    = { icon: string; title: string; description: string; proof: string[] };
export type TrustStat   = { value: string; label: string };
```

- [ ] `npm run typecheck` zielone po refaktorze
- [ ] żaden istniejący komponent nie wymagał zmiany

#### E0.7 Aktualizacja polityki cookies po zmianie i18n `[S]`

Konsekwencja **DEC-03**: cookie `locale` znika.

- [ ] usunąć wiersz `locale` z tabeli w `pl.ts` / `en.ts` (klucze `cookiePolicyCookieLocale*`)
- [ ] zaktualizować `cookiePolicyLastUpdated`
- [ ] zweryfikować, że `CookieConsent.tsx` nie odwołuje się do usuniętego klucza

---

### E1 — Strona główna: z portfolio na ofertę

Rozmiar: **L** · Zależności: E0 · Ryzyko: średnie

#### E1.1 Hero — warstwa sprzedażowa nad sceną 3D `[L]` → naprawia **T6**

Dziś `HeroNoSSR` (`ssr:false`) obejmuje **całą** sekcję razem z tekstem, a `LoaderOverlay` blokuje ekran przez min. 1 s (fallback 5 s). Efekt: LCP to ekran ładowania.

Rozbicie na dwa komponenty:

```
components/Hero/
  Hero.tsx          orkiestracja: <HeroCopy /> (SSR) + <HeroScene /> (dynamic, ssr:false)
  HeroCopy.tsx      NOWY — h1, podtytuł, 2× CTA, pasek zaufania. Renderowany serwerowo.
  HeroScene.tsx     obecna zawartość Hero.tsx — canvas, Rig, particles, ripples
```

Reguły:
- `HeroCopy` renderuje **finalny tekst w HTML-u**; `scrambleReveal` animuje go dopiero po stronie klienta. **Nigdy nie SSR-ować pomieszanych znaków** — Google zaindeksowałby śmieci.
- `LoaderOverlay` zawężony do canvasu (fade-in warstwy 3D), **nie zasłania treści**.
- Usunąć `minTimeElapsed` (sztuczne 1 s) i 5-sekundowy fallback z `pages/index.tsx:22-40`.
- `HeroCopy` ma `z-index` nad canvasem; canvas dostaje `aria-hidden` i `pointer-events` bez wpływu na klikalność CTA.

**Treść — wariant rekomendowany (B):**

| Element | PL | EN |
|---|---|---|
| H1 | Pomysły na wejściu. **Działający software** na wyjściu. | Ideas in. **Working software** out. |
| Podtytuł | Strony, aplikacje webowe i mobilne, integracje AI i 3D — dla firm, które potrzebują, żeby to po prostu działało. Od pomysłu, przez wdrożenie, po utrzymanie. Jeden wykonawca, faktura VAT. | Websites, web and mobile apps, AI and 3D integrations — for companies that need it to simply work. From idea to launch to maintenance. One contractor, VAT invoicing. |
| CTA główne | **Opisz projekt — wycena w 48 h** → `/kontakt` | Tell me about your project → `/kontakt` |
| CTA drugie | Zobacz realizacje → `/realizacje` | See case studies → `/realizacje` |
| Pasek zaufania | `{{N}} wdrożeń` · Faktura VAT · Śląsk i zdalnie · PL / EN | — |

**Wariant alternatywny (A), gdyby B był za mało konkretny:**
H1: „Aplikacje i strony internetowe dla firm ze Śląska i całej Polski."

> `[!]` **`{{N}}` = placeholder.** Wchodzi na stronę wyłącznie po podaniu prawdziwej liczby przez Macieja. Do czasu potwierdzenia — pasek bez liczby.

- [ ] h1 i CTA obecne w źródle HTML (`curl -s / | grep -o '<h1.*</h1>'`)
- [ ] brak pełnoekranowego loadera przy pierwszym wejściu
- [ ] LCP < 2,5 s na Slow 4G (Lighthouse mobile)
- [ ] CTA klikalne mimo canvasu pod spodem
- [ ] `prefers-reduced-motion` respektowany

#### E1.2 Usługi — awans na pierwszą sekcję + ceny + linki `[M]`

- [ ] `components/About/` → **`components/Services/`**, komponent `Services` (naprawia **T10**)
- [ ] usunąć duplikat `max-w-*` z `About.tsx:261` (naprawia **T11**)
- [ ] karta rozszerzona o: `priceFrom`, 3 punkty `deliverables`, link **„Dowiedz się więcej →"** do `/uslugi/[slug]`
- [ ] cała karta klikalna (`<Link>` opakowujący), zachowany focus ring i tilt na hover
- [ ] uzupełnić `slug` dla 6 istniejących usług

Mapowanie slugów:
| Tytuł | slug |
|---|---|
| Strony internetowe | `strony-internetowe` |
| Aplikacje webowe | `aplikacje-webowe` |
| Integracja AI | `integracja-ai` |
| 3D i WebGL | `3d-webgl` |
| Aplikacje mobilne | `aplikacje-mobilne` |
| Utrzymanie i rozwój | `utrzymanie-i-rozwoj` |

#### E1.3 Ściana ikon → pas logotypów `[S]`

- [ ] `<Skills />` **usunięty** z `pages/index.tsx:50` (komponent zostaje w repo, ląduje na `/o-firmie`)
- [ ] nowy `components/TechStrip/` — jeden rząd, 6–8 ikon: React, Next.js, TypeScript, Python, Three.js, Docker, PostgreSQL, TailwindCSS
- [ ] bez nagłówków kategorii, bez podpisów, `aria-label` zamiast tekstu
- [ ] podpis nad pasem: „Buduję w technologiach, które mają wsparcie i społeczność — nie w modzie sezonu."

#### E1.4 Doświadczenie → Branże `[M]`

- [ ] `<Experience />` **usunięty** z `pages/index.tsx:49` (komponent zostaje, ląduje na `/o-firmie`)
- [ ] nowy `components/Industries/` — 3 karty, zero nazw stanowisk, zero chronologii

**Treść (przekuta z `data/pl.ts:52-127`):**

| Branża | Opis | Dowód (z realnych obowiązków) |
|---|---|---|
| **Medycyna, kongresy i eventy** | Systemy, które muszą zadziałać w dniu wydarzenia — bo drugiej szansy nie ma. | strefy uczestnika · platforma VoD · rejestracja obecności na kolektorach Zebra i kioskach · głosowanie live z wynikami w czasie rzeczywistym · wirtualne stoiska wystawców · wsparcie IT na miejscu |
| **Web3 i blockchain** | Integracje ze smart kontraktami, tam gdzie błąd kosztuje realne pieniądze. | marketplace NFT · mostkowanie L1↔L2 (ImmutableX) · system aukcji on-chain · transfery między kontami |
| **AI i przetwarzanie dokumentów** | Modele językowe wpięte w produkt — lokalnie na Twoim sprzęcie albo w chmurze. | pipeline'y OCR dla skanów i dokumentów · lokalne LLM z akceleracją CUDA · ekstrakcja tekstu, tabel i obrazów do Markdown/HTML/JSON |

#### E1.5 Portfolio → Realizacje `[M]`

- [ ] scroll poziomy **zdjęty ze strony głównej** — 3 karty w gridzie + „Zobacz wszystkie realizacje →"
  (`usePortfolioScroll` i `portfolioPanelWidth` zostają — mogą posłużyć na `/realizacje`, decyzja w E2.2)
- [ ] **usunąć autodeprecjację** z opisów: „prawdopodobnie nigdy nie wyjdzie z fazy WIP", „Aktualnie w gruntownej przebudowie", „[WIP]" w tytule
- [ ] **`Tibia Key Presser` znika ze strony firmowej** (ma już `resumeOnly: true` — zostaje w CV)
- [ ] każdy projekt przepisany na `CaseStudy`: `challenge` → `solution` → `outcome`; technologie na dole karty, nie w nagłówku

#### E1.6 Nowe sekcje: Proces + FAQ `[M]`

**`components/Process/` — 5 kroków:**

| # | Krok | Opis | Czas |
|---|---|---|---|
| 1 | Rozmowa | Poznaję cel, zakres i budżet. Bez zobowiązań. | 15–30 min |
| 2 | Wycena i zakres | Stała cena albo widełki, harmonogram i zakres — na piśmie. | do 48 h |
| 3 | Wdrożenie | Regularne demo, stały wgląd w postępy. Zmiany w zakresie ustalamy na bieżąco. | wg projektu |
| 4 | Odbiór i przekazanie | Kod, dokumentacja i dostępy trafiają do Ciebie. Bez uzależnienia od wykonawcy. | — |
| 5 | Utrzymanie | Opieka, poprawki i rozwój. Opcjonalnie SLA. | umowa miesięczna |

**`components/Faq/` — 7 pytań + `FAQPage` schema:**

1. Ile trwa realizacja?
2. Ile to kosztuje?
3. Czy wystawiasz fakturę VAT?
4. Do kogo należy kod i prawa autorskie? → *„Do Ciebie. Po odbiorze dostajesz repozytorium i pełne prawa majątkowe."*
5. Czy pracujesz z klientami spoza Polski?
6. Co po wdrożeniu — kto to utrzymuje?
7. Czy mogę rozwijać istniejący projekt zamiast pisać od zera?

> `[!]` Odpowiedzi na 1, 2 i 3 wymagają zatwierdzenia (**DEC-06**) — w draftcie placeholdery `{{...}}`.

#### E1.7 Formularz kontaktowy `[M]` → **DEC-08**

`src/pages/api/contact.ts`:
```ts
// Bez nowych zależności runtime — walidacja ręczna.
type Body = {
  name: string; email: string; company?: string;
  budget?: string; message: string; consent: boolean;
  website?: string;  // honeypot — musi być puste
};

// 1. metoda POST, inaczej 405
// 2. honeypot `website` niepuste → 204 (udajemy sukces, nie informujemy bota)
// 3. walidacja: name 2-100, email regex, message 20-5000, consent === true
// 4. rate limit: Map<ip, timestamps[]> w pamięci, 3 zgłoszenia / 10 min
//    (per-instancja na Vercel — wystarczające na start; docelowo Vercel KV)
// 5. wysyłka przez Resend → CONTACT_TO_EMAIL, Reply-To: email zgłaszającego
// 6. odpowiedzi: 200 {ok:true} | 400 {error} | 429 | 500 — bez wycieku szczegółów
```

`components/ContactForm/`:
- pola: imię, e-mail, firma *(opcj.)*, budżet *(select z widełkami)*, opis projektu, checkbox zgody RODO
- honeypot `website` ukryty przez `absolute; left:-9999px` + `tabIndex={-1}` + `aria-hidden`
- stany: idle / sending / success / error, komunikaty z `aria-live="polite"`
- **klauzula informacyjna art. 13 RODO** pod formularzem + link do `/polityka-prywatnosci`

Zmienne środowiskowe do dodania na Vercel: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`.

- [ ] wysyłka działa end-to-end
- [ ] honeypot zatrzymuje bota
- [ ] rate limit zwraca 429
- [ ] formularz obsługiwalny z klawiatury, błędy czytane przez czytnik ekranu
- [ ] klauzula art. 13 widoczna przy przycisku wysyłki

##### Ustalenia z 2026-08-04 (rozmowa „formularz bez backendu")

**Rozstrzygnięcie DEC-08: zostaje Resend + własny `pages/api/contact.ts`.** Rozważona
alternatywa (Formspree / Web3Forms) odpada — nie dlatego, że gorsza technicznie, tylko
dlatego, że jest **droższa prawnie**: dokłada drugiego procesora danych do polityki
prywatności, transfer poza EOG i ochronę antyspamową opartą na reCAPTCHA, czyli nowe
ciasteczka → nowy wiersz w polityce cookies → gating przez zgodę. Tabelę cookies właśnie
wyczyściliśmy w E0.3.

Na Vercelu API route to funkcja serverless — nie ma serwera do postawienia ani utrzymania.
„Bez backendu" jest już spełnione.

**Reguła krytyczna — koperta maila.** Nadawcą musi być zweryfikowana domena, nigdy adres
zgłaszającego. `From: klient@gmail.com` to spoofing, który DMARC odrzuci albo wrzuci do spamu:

```
From:     formularz@skoftware.pl     ← zweryfikowana domena (SPF + DKIM Resendu)
Reply-To: <adres z formularza>       ← „Odpowiedz" trafia do klienta
To:       kontakt@skoftware.pl       ← CONTACT_TO_EMAIL
```

**Bez captchy.** Honeypot + kontrola czasu (wysyłka < 3 s od montażu = bot) + limit po IP.
Świadome ograniczenie: limit w pamięci działa **per instancja** funkcji, więc jest
najlepszym przybliżeniem, nie gwarancją. Przy tym ruchu wystarczy; Vercel KV dopiero gdy
realnie zacznie przechodzić spam.

**Checkbox zgody RODO — do rozstrzygnięcia z księgową/prawnikiem.** Formularz kontaktowy
opiera się na art. 6 ust. 1 lit. b lub f, nie na zgodzie; wymagana jest **klauzula
informacyjna (art. 13)**, nie checkbox. Spec powyżej pierwotnie wymagał `consent === true`
— rekomendacja: zamienić na widoczną klauzulę + link do `/polityka-prywatnosci`, bo
checkbox kosztuje konwersję i nie jest podstawą prawną. **Zostawić `consent` w typie do
czasu potwierdzenia.**

**Limity Resend zweryfikowane 2026-08-04** ([resend.com/pricing](https://resend.com/pricing)):
darmowy tier 3 000 maili/mies. i 100/dzień; pierwszy płatny 20 $/mies. za 50 000.

**Stopgap bez domeny:** Resend pozwala wysyłać z `onboarding@resend.dev` na adres z własnego
konta. Ponieważ odbiorcą jest zawsze Maciej, formularz zadziała przed podpięciem domeny.
Traktować jako tymczasowe — to polityka dostawcy, nie gwarancja.

**G1 + G3 to jedna sesja przy DNS.** MX dla odbierania poczty i SPF/DKIM Resendu dla
wysyłania nie kolidują (SPF przyjmuje wiele `include:`, DKIM używa osobnych selektorów).
Ustawić za jednym razem, nie w dwóch podejściach.

**Kolejność:** Maciej zdecydował 2026-08-04, że formularz robimy **później**, zgodnie
z planem partii, a nie od razu.

#### E1.8 Stopka z danymi firmy `[S]`

- [ ] blok: **SKOFTWARE Maciej Skorus** · NIP 6252501911 · `{{adres/miejscowość}}` · `kontakt@skoftware.pl` · `+48 668 366 648`
- [ ] `contactCompanyInfo`: „Creative Fullstack Developer - Dostępny na projekty" → **„Oprogramowanie i strony internetowe dla firm"**
- [ ] blok CV zredukowany z 3 pozycji do jednego linku „CV" w `BottomBar`
- [ ] `BottomBar`: dochodzi link „Polityka prywatności"

---

### E2 — Podstrony usług *(tu mieszka SEO)*

Rozmiar: **L** · Zależności: E0, E1.2 · Ryzyko: niskie (nowe ścieżki, nic nie psują)

#### E2.1 `/uslugi/[slug]` `[L]` → naprawia **T7**

```tsx
// src/pages/uslugi/[slug].tsx
export const getStaticPaths: GetStaticPaths = async ({ locales = ['pl'] }) => ({
  paths: locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({ params: { slug }, locale })),
  ),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { slug: params!.slug as string },
});
```

Szablon podstrony (~800–1200 słów każda):
```
Breadcrumb: Strona główna › Usługi › {tytuł}
H1          {tytuł} — {tagline}
Intro       2-3 akapity: jaki problem to rozwiązuje
Dla kogo    lista `forWhom`
Co dostajesz lista `deliverables`
Co to daje  lista `outcomes` — język korzyści, nie funkcji
Realizacje  case studies z `relatedCaseSlugs`
Cena        „od {priceFrom}" + „co wpływa na wycenę"
FAQ         3-5 pytań specyficznych dla usługi (schema FAQPage)
CTA         formularz kontaktowy z prewypełnionym tematem
```

- [ ] 6 podstron PL + 6 EN, każda z unikalnym `<title>` i `meta description`
- [ ] `/uslugi` — strona przeglądowa linkująca do wszystkich
- [ ] wszystkie w `sitemap.xml` z `alternateRefs`

#### E2.2 `/realizacje` i `/realizacje/[slug]` `[M]`

- [ ] lista z filtrem po branży
- [ ] szablon: problem → rozwiązanie → efekt → stos → CTA
- [ ] `confidential: true` → używa `clientAnonymized`, nigdy `client` (**DEC-11**)
- [ ] decyzja: czy przenieść tu efekt scroll poziomego z `usePortfolioScroll` (efektowne, ale gorsze do skanowania — **rekomendacja: nie**)

#### E2.3 `/o-firmie` `[M]`

Nowy dom dla treści zdjętych ze strony głównej:
- [ ] kim jest SKOFTWARE + dane rejestrowe (NIP, forma działalności)
- [ ] `<Experience />` — pełna chronologia, **przepisana**: bez „Junior", bez „okazjonalne pełnienie funkcji kierowcy firmowego"
- [ ] `<Skills />` — pełna ściana ikon, tutaj jest na miejscu
- [ ] „jak pracuję" — zasady współpracy
- [ ] link do `/cv`

#### E2.4 `/kontakt` `[S]`

- [ ] pełny formularz (ten sam komponent co na stronie głównej)
- [ ] dane firmowe, godziny kontaktu, czas odpowiedzi
- [ ] schema `ContactPage`

---

### E3 — CV i dokumenty prawne

Rozmiar: **M** · Zależności: E0 · Ryzyko: niskie · **Może iść równolegle z E1**

#### E3.1 `/resume` → `/cv` `[S]`

- [ ] `src/pages/resume/index.tsx` → `src/pages/cv/index.tsx`
- [ ] 301 w `next.config.js` (patrz E0.1)
- [ ] `Header.tsx:50` — warunek `router.pathname === '/resume'` → `'/cv'`
- [ ] `Footer.tsx:189` — `href='/resume'` → `'/cv'`

#### E3.2 Wyciszenie CV w SEO i nawigacji `[S]`

- [ ] `<Seo robots='noindex, follow' />` na `/cv`
- [ ] `next-sitemap.config.js`: `exclude: ['/cv', '/en/cv']`
- [ ] **CV usunięte z nawigacji głównej** (`Header.tsx:114`) — zostaje link w `BottomBar`
- [ ] blok „ŻYCIORYS / CV ONLINE / POBIERZ PDF" w stopce zwinięty do jednego linku
- [ ] **strona CV bez zmian merytorycznych** — klauzula RODO, hobby, edukacja zostają. Tam są na miejscu.

#### E3.3 Polityka prywatności `[M]` → naprawia **T8**

Wymagana z chwilą uruchomienia formularza (art. 13 RODO). Wzorować się na strukturze `pages/cookies/index.tsx`.

- [ ] `src/pages/polityka-prywatnosci/index.tsx` (PL + EN)
- [ ] treść: administrator (SKOFTWARE, NIP, kontakt) · cele i podstawy prawne (art. 6 ust. 1 lit. b i f) · zakres danych z formularza · odbiorcy (Resend, Vercel) · okres przechowywania · prawa osoby (art. 15–22) · skarga do UODO · transfery poza EOG
- [ ] link w `BottomBar` i pod formularzem

> **Uwaga:** to szkielet oparty na tym, co robi strona technicznie — **przed publikacją do weryfikacji przez księgową lub prawnika**. Regulamin świadczenia usług drogą elektroniczną nie jest konieczny przy samym formularzu kontaktowym; staje się potrzebny, jeśli dojdzie sprzedaż online.

---

### E4 — Wydajność i porządki

Rozmiar: **M** · Zależności: E1 · Ryzyko: niskie

- [ ] **E4.1** Pomiar bazowy: Lighthouse mobile + desktop, `/`, `/uslugi/aplikacje-webowe`, `/realizacje` — zapisać wyniki w tym pliku
- [ ] **E4.2** Decyzja **DEC-10** na podstawie pomiaru (próg: LCP > 2,5 s lub INP > 200 ms → statyczny hero ≤768 px z `me.png` zamiast canvasu)
- [ ] **E4.3** `puppeteer` → `devDependencies` (naprawia **T9**); sprawdzić, czy `scripts/generate-cv-pdf.mjs` nie jest wołany w `postbuild` na Vercel
- [ ] **E4.4** Audyt kosztu Lenis + GSAP + `CustomCursor` na mobile — `CustomCursor` na urządzeniach dotykowych jest bezużyteczny, rozważyć wyłączenie poniżej `lg`
- [ ] **E4.5** `README.md` — przepisać z „Portfolio website" na opis strony firmowej
- [ ] **E4.6** `RESUME_ATS.md` — zostaje, ale sprawdzić czy nie jest deployowany publicznie
- [ ] **E4.7** Usunąć `src/lib/generatePdf.ts` — eksportuje `generatePdf`, **nikt go nie
      importuje**; `scripts/generate-cv-pdf.mjs` ma własną implementację na puppeteerze.
      Martwy kod ciągnie `html-to-image` i `jspdf` w `dependencies`. Zweryfikowane 2026-08-04
- [ ] **E4.8** `vercel.json` — usunąć klucz `builds` (składnia legacy: wypisuje projekt
      z zero-config i **nadpisuje ustawienia z dashboardu**); dubluje się z `framework: "nextjs"`.
      Vercel wykryje Next.js sam
- [ ] **E4.9** Naprawić nieaktualny komentarz `scripts/generate-cv-pdf.mjs:9-10` — deklaruje
      `public/cv-{en,pl}.pdf`, a kod (linia 155) zapisuje `Maciej Skorus - CV [EN|PL].pdf`.
      Kod jest poprawny, komentarz kłamie

---

### E5 — Uruchomienie i pomiar

Rozmiar: **S** · Zależności: wszystkie

- [ ] **Plan Vercel — sprawdzić przed uruchomieniem.** Hobby zabrania użytku komercyjnego,
      a Vercel definiuje go szeroko: samo **reklamowanie usługi** wystarczy, sprzedaż na stronie
      nie jest potrzebna. Strona firmy usługowej z ofertą kwalifikuje się jednoznacznie
      → wymagany **Pro, 20 $/mies.** Egzekwowane przez ToS.
      Zweryfikowane 2026-08-04: [vercel.com/docs/plans/hobby](https://vercel.com/docs/plans/hobby)
- [ ] Google Search Console: właściwość `skoftware.pl`, sitemapa, ręczne zgłoszenie kluczowych URL-i
- [ ] Weryfikacja 301 ze starych adresów (`/resume`, `mskorus.vercel.app/*`)
- [ ] Google Business Profile (usługodawca lokalny — Śląsk) → wzmacnia local SEO
- [ ] Cel konwersji w Vercel Analytics: wysłanie formularza
- [ ] Retest wszystkich schematów w Rich Results Test
- [ ] Kontrola po 30 dniach: pozycje, ruch organiczny, liczba leadów

---

## 5. Treści, które musi dostarczyć Maciej

Bez tego etapy stoją na placeholderach. Oznaczone `[!]` w planie.

| # | Co | Potrzebne do | Blokuje |
|---|---|---|---|
| ~~C1~~ | ~~Widełki „od X zł" dla 6 usług~~ **ZDJĘTE 2026-08-08: ceny = „wycena indywidualna", bez liczb (DEC-06 zrewidowane)** | — | — |
| C2 | **Prawdziwa liczba wdrożeń** do paska zaufania (albo rezygnacja z liczby) | E1.1 | E1.1 |
| C3 | **Zgoda NDA** — które projekty można nazwać z klienta | DEC-11 | E1.5, E2.2 |
| C4 | **2–3 case studies z realnych wdrożeń** — problem, co zrobiłeś, efekt (liczby jeśli są) | E2.2 | E2.2 |
| C5 | **Referencje** — cytat + imię + firma + zgoda na publikację | E1.6 | opcjonalne |
| C6 | **Adres do stopki** — pełny czy sama miejscowość | E1.8 | E1.8 |
| C7 | **Skrzynka `kontakt@skoftware.pl`** + weryfikacja domeny w Resend | DEC-07, DEC-08 | E0.5, E1.7 |
| C8 | **Czasy realizacji i odpowiedzi** — realne, do FAQ i procesu | E1.6 | E1.6 |

---

## 6. Czego świadomie NIE robimy

Zabezpieczenie zakresu — te rzeczy kuszą, ale nie wchodzą w tę przebudowę:

- **Migracja na App Router** — pages router działa, `i18n` jest tu wspierany, App Router by to zabrał. Zero zysku, duże ryzyko.
- **Przepisywanie sceny 3D** — działa, jest wyróżnikiem. Zmieniamy tylko jej rolę na stronie.
- **CMS** — treści zostają w słownikach TS. Headless CMS ma sens dopiero przy blogu.
- **Blog / newsletter** — osobny projekt, po ustabilizowaniu podstron usług.
- **Zmiana systemu designu** — kolory, typografia i animacje zostają.
- **Kalendarz rezerwacji (Cal.com)** — dopiero gdy formularz zacznie generować powtarzalny ruch.

---

## 7. Kolejność, gdyby robić po kawałku

| Priorytet | Zakres | Dlaczego teraz |
|---|---|---|
| 1 | **E0** | Bez i18n w URL-ach i domeny kanonicznej reszta nie rankuje. Wszystko inne od tego zależy |
| 2 | **E1.1 + E1.7** | Hero z CTA + formularz. Podnosi konwersję na ruchu, który już jest |
| 3 | **E1.3 + E1.4** | Zdjęcie ściany ikon i chronologii pracodawców. Najszybsza zmiana odbioru, najmniej kodu |
| 4 | **E1.2 + E1.5 + E1.6** | Ceny, case studies, proces, FAQ |
| 5 | **E2** | Podstrony usług — najwięcej pracy, największy zwrot długoterminowo |
| 6 | **E3 + E4 + E5** | CV, dokumenty prawne, wydajność, uruchomienie |

---

## 8. Weryfikacja

Po każdym etapie:
```bash
npm run typecheck
npm run lint:strict
npm test
npm run build
```

Po E0 dodatkowo:
```bash
curl -s https://skoftware.pl/    | grep -o '<html lang="[a-z]*"'   # oczekiwane: pl
curl -s https://skoftware.pl/en/ | grep -o '<html lang="[a-z]*"'   # oczekiwane: en
curl -s https://skoftware.pl/    | grep -o 'hreflang="[a-z-]*" href="[^"]*"'
curl -sI https://skoftware.pl/resume | grep -i location             # oczekiwane: /cv
```

Po E1:
```bash
curl -s https://skoftware.pl/ | grep -o '<h1[^>]*>.*</h1>'   # h1 musi być w źródle
npx lighthouse https://skoftware.pl/ --preset=desktop --view
npx lighthouse https://skoftware.pl/ --form-factor=mobile --view
```

**Progi akceptacji:** Performance ≥ 85 (mobile), Accessibility ≥ 95, SEO = 100, LCP < 2,5 s, CLS < 0,1, INP < 200 ms.

---

## 9. Dziennik zmian planu

| Data | Zmiana |
|---|---|
| 2026-07-28 | Wersja pierwsza — do przeglądu |
</content>
