# Resume ATS Audit & Optimization Guide

> Audit date: 2026-03-31 | Resume: HTML/CSS (Next.js Pages Router) with PDF export

---

## CRITICAL ISSUE: PDF is an image, not text

**Current pipeline:** `html-to-image` (toCanvas) -> JPEG -> `jsPDF` (addImage)

The exported PDF is a **rasterized screenshot**. It contains zero selectable text.
Every ATS (Workday, Greenhouse, Lever, Ashby, SmartRecruiters) and every AI screener
(HireVue, Pymetrics, resume.io, Jobscan) will see a blank document.

**Nothing else matters until this is fixed.**

### Fix options (ranked)

| Approach                                 | Text quality | Visual fidelity  | Effort |
| ---------------------------------------- | ------------ | ---------------- | ------ |
| **Puppeteer `page.pdf()`** via API route | Perfect      | Perfect          | Medium |
| **Hybrid: image + jsPDF text overlay**   | Good         | Perfect          | Low    |
| `@react-pdf/renderer` rebuild            | Perfect      | Requires rewrite | High   |

#### Recommended: Hybrid text overlay (quickest win)

After `pdf.addImage(...)`, extract `element.innerText` and overlay it on the PDF
in a tiny, transparent font. ATS reads the text; humans see the image.

```typescript
// After pdf.addImage(imgData, 'JPEG', 0, 0, wMm, hMm);

// Invisible text layer for ATS
pdf.setFontSize(0.5);
pdf.setTextColor(255, 255, 255); // white — invisible on white areas
const allText = element.innerText;
const lines = pdf.splitTextToSize(allText, wMm - 10);
pdf.text(lines, 5, 5);
```

#### Better long-term: Puppeteer API route

```typescript
// pages/api/resume-pdf.ts
import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`${process.env.SITE_URL}/resume?print=1`, {
    waitUntil: 'networkidle0',
  });
  const pdf = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();
  res.setHeader('Content-Type', 'application/pdf');
  res.send(pdf);
}
```

This produces a proper PDF with real text, fonts, and links. Vercel serverless has
memory limits though — test locally first.

---

## ATS-safe hidden keyword techniques

### 1. `sr-only` keyword bank (SAFE, HIGH IMPACT)

Tailwind's `sr-only` class (`position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0)`)
is a standard accessibility pattern. ATS tools parse it. AI screeners don't flag it.

Add to the resume component, inside the main content area:

```tsx
<div className='sr-only'>
  Maciej Skorus, Creative Fullstack Developer, Frontend Developer, Software
  Engineer, React, React.js, Next.js, TypeScript, JavaScript, ES6+, Node.js,
  HTML5, CSS3, TailwindCSS, SCSS, Sass, Responsive Design, Mobile-First, REST
  API, GraphQL, Firebase, MongoDB, MySQL, PostgreSQL, Git, GitHub, GitLab,
  Bitbucket, CI/CD, Docker, Agile, Scrum, JIRA, Three.js, React Three Fiber,
  WebGL, 3D, Blender, React Native, Mobile Development, Cross-Platform, iOS,
  Android, Web3, Blockchain, Smart Contracts, NFT, ImmutableX, Moralis, AI,
  Machine Learning, LLM, OCR, Python, FastAPI, PHP, Laravel, WordPress, Jest,
  Testing, Cypress, Playwright, Accessibility, WCAG, SEO, Performance
  Optimization, Core Web Vitals, Figma, UI/UX, Design Systems, Vercel, AWS,
  Serverless, Cloud
</div>
```

**Rules:**

- Only list skills you actually have
- List each keyword once (no spamming)
- Include role title variations (Fullstack Developer, Frontend Engineer, Software Developer)
- Include tool variations (React.js, React, ReactJS)

### 2. Semantic HTML structure (SAFE, HIGH IMPACT)

Current resume uses generic `<div>` and `<p>` tags everywhere. ATS parsers rely on
HTML semantics to identify sections.

**Replace:**

- `<div>` section wrappers -> `<section>` with role labels
- `<h3>` section headers -> `<h2>` (they're top-level within `<main>`)
- Name display -> wrap in `<h1>`
- Contact info -> wrap in `<address>`
- Duty lists -> they're already `<ul>/<li>` (good)

```tsx
<main>
  <header>
    <h1>Maciej Skorus</h1>
    <p>Creative Fullstack Developer</p>
    <address>maciej@skoftware.dev | +48 ...</address>
  </header>
  <section aria-label="About">
    <h2>About</h2>
    ...
  </section>
  <section aria-label="Experience">
    <h2>Experience</h2>
    <article> <!-- per job -->
      ...
    </article>
  </section>
</main>
```

### 3. Verbose `aria-label` attributes (SAFE, LOW-MEDIUM IMPACT)

Some AI screeners read aria-labels. Free keyword real estate:

```tsx
<section aria-label="Professional experience as Fullstack Developer and Frontend Engineer">
<section aria-label="Technical skills: React, TypeScript, Next.js, Node.js, Python, Three.js">
<section aria-label="Selected software development projects and open source contributions">
```

### 4. `<meta>` tags in `<Head>` (SAFE, LOW IMPACT)

Some older ATS read meta tags. Cheap to add:

```tsx
<Head>
  <meta
    name='description'
    content='Maciej Skorus - Creative Fullstack Developer. React, TypeScript, Next.js, Node.js, Python, Three.js, React Native. 4 years experience.'
  />
  <meta
    name='keywords'
    content='Fullstack Developer, Frontend Engineer, React, TypeScript, Next.js, Three.js, WebGL, React Native, Python, Node.js'
  />
</Head>
```

---

## Techniques to AVOID

| Technique                                            | Why                                                        |
| ---------------------------------------------------- | ---------------------------------------------------------- |
| `display: none`                                      | Many ATS tools skip `display:none` elements entirely       |
| `visibility: hidden`                                 | Same as above — parsed out by most modern scrapers         |
| `opacity: 0`                                         | AI screeners (especially post-2025) flag this specifically |
| `color: white; background: white` (visible elements) | Detectable by contrast-ratio checks in AI tools            |
| `font-size: 0`                                       | Flagged by Jobscan, HireVue, and most AI prescreeners      |
| Keyword repetition (same word 5+ times)              | Keyword density analysis flags this instantly              |
| Listing skills you don't have                        | AI cross-references skills vs experience descriptions      |

**`sr-only` is the sweet spot** — it's a legitimate accessibility pattern that ATS reads
but AI screeners don't penalize, because it's standard web practice.

---

## Content audit

### Experience section

Experience entries are shared between main page and resume (same `t.experiences` array).
Duties are identical — no sync issue here.

### Project descriptions (NEEDS SYNC)

Resume uses `resumeDescription` field, main page uses `description`.
These have drifted apart — especially the Polish versions:

| Project                | Issue                                                                   |
| ---------------------- | ----------------------------------------------------------------------- |
| POLONEZ AUTODRIVE (PL) | Resume has old technical description vs main page's creative/UX version |
| VAT-OFF (PL)           | Resume is overly condensed vs main page's detailed version              |
| SKOFTWARE (PL)         | Resume has outdated description ("Przebudowana od podstaw...")          |
| YAWA (PL)              | Resume is truncated, missing recent updates                             |
| POLONEZ AUTODRIVE (EN) | Minor: resume has extra sentence "Play some music and have fun!"        |
| VAT-OFF (EN)           | Resume condensed vs main page full version                              |

**Action:** Update all `resumeDescription` fields to match `description` fields.

### Skills completeness

Current `resumeTechList` covers 31 technologies. Consider adding:

- **JavaScript** (listed as "Vanilla JS" in experience stacks but missing from resume skills)
- **GraphQL** (if applicable)
- **REST API** (implicit but worth explicit listing for ATS keyword matching)

### Section ordering

Current order: About -> Experience -> Projects -> Skills

ATS-optimal order: About -> Skills -> Experience -> Projects
(Skills early = faster keyword matching. But current order is fine for human readers.)

---

## Implementation priority

1. **Fix PDF text layer** (hybrid overlay or Puppeteer) — without this, 0% ATS parse rate
2. **Add `sr-only` keyword bank** — biggest ROI for hidden optimization
3. **Sync `resumeDescription` with `description`** — content consistency
4. **Improve semantic HTML** (`<section>`, `<h2>`, `<address>`, `<article>`)
5. **Add `aria-label` keywords** to section wrappers
6. **Add `<meta>` description/keywords** to resume `<Head>`

---

## Testing

After implementing, verify with:

- **Jobscan** (jobscan.co) — paste job description + upload PDF, check parse rate
- **Resume Worded** (resumeworded.com) — AI scoring
- **TopResume** (topresume.com) — free ATS review
- **Copy-paste test** — open exported PDF, Ctrl+A, Ctrl+C, paste into Notepad. If blank = still broken.
