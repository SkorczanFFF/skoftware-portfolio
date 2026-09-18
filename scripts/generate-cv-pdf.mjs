/**
 * Generate static CV PDFs with real selectable text using Puppeteer.
 *
 * Usage:
 *   1. Start dev server:  npm run dev
 *   2. Run this script:   node scripts/generate-cv-pdf.mjs
 *
 * Outputs:
 *   public/cv-en.pdf
 *   public/cv-pl.pdf
 */

import puppeteer from 'puppeteer';
import { resolve, dirname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const FONTS_DIR = resolve(__dirname, '..', 'public', 'fonts');

// Resume container is 794x1123px — convert to mm for PDF page size
const pxToMm = (px) => (px * 25.4) / 96;
const WIDTH_MM = pxToMm(794);
const HEIGHT_MM = pxToMm(1123);

async function generatePdf(locale) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 900 });

  const url = `${BASE_URL}/resume`;
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Set locale and reload
  await page.evaluate((loc) => {
    localStorage.setItem('locale', loc);
    document.cookie = `locale=${loc};path=/;max-age=31536000`;
  }, locale);
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Wait for fonts
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 500));

  // Strip DOM down to just the resume container, preserving font CSS variables
  await page.evaluate(() => {
    // Capture font CSS variables before stripping — they live on a wrapper div from _app.tsx
    const root = document.documentElement;
    const fontVars = ['--font-grotesk', '--font-unica'];
    const captured = {};
    for (const v of fontVars) {
      // Walk up from the resume element to find the variable
      let el = document.querySelector(
        'div[class*="overflow-hidden"][class*="w-[794px]"]',
      );
      while (el) {
        const val = getComputedStyle(el).getPropertyValue(v).trim();
        if (val) {
          captured[v] = val;
          break;
        }
        el = el.parentElement;
      }
    }

    // The resume ref div is the one with exact 794x1123 dimensions
    const resumeEl = document.querySelector(
      'div[class*="overflow-hidden"][class*="w-[794px]"]',
    );
    if (!resumeEl) {
      const allDivs = document.querySelectorAll('div');
      for (const div of allDivs) {
        if (div.offsetWidth === 794 && div.offsetHeight === 1123) {
          document.body.innerHTML = '';
          document.body.appendChild(div);
          break;
        }
      }
      if (!document.body.children.length)
        throw new Error('Could not find resume container');
    } else {
      document.body.innerHTML = '';
      document.body.appendChild(resumeEl);
    }

    // Re-apply font CSS variables on <html> so var() references resolve
    for (const [k, v] of Object.entries(captured)) {
      root.style.setProperty(k, v);
    }

    // The font-grotesk utility class lived on the parent <section> which was stripped.
    // Re-apply Space Grotesk as the base font-family on the resume container.
    const container = document.body.firstElementChild;
    if (container) {
      container.style.fontFamily = `var(--font-grotesk), ui-sans-serif, system-ui, sans-serif`;
    }
  });

  // Inject Space Grotesk as TTF — Chromium's PDF renderer doesn't embed woff2 fonts
  const grotesk400 = readFileSync(
    resolve(FONTS_DIR, 'SpaceGrotesk-400.ttf'),
  ).toString('base64');
  const grotesk700 = readFileSync(
    resolve(FONTS_DIR, 'SpaceGrotesk-700.ttf'),
  ).toString('base64');

  await page.evaluate(
    ({ g400, g700 }) => {
      // Remove existing woff2-based @font-face rules for spaceGrotesk
      for (const sheet of document.styleSheets) {
        try {
          const toDelete = [];
          for (let i = 0; i < sheet.cssRules.length; i++) {
            const rule = sheet.cssRules[i];
            if (
              rule instanceof CSSFontFaceRule &&
              rule.style.fontFamily === 'spaceGrotesk'
            ) {
              toDelete.push(i);
            }
          }
          for (const idx of toDelete.reverse()) sheet.deleteRule(idx);
        } catch {}
      }

      // Inject TTF-based @font-face rules
      const style = document.createElement('style');
      style.textContent = `
      @font-face {
        font-family: 'spaceGrotesk';
        src: url(data:font/truetype;base64,${g400}) format('truetype');
        font-weight: 400;
        font-display: swap;
      }
      @font-face {
        font-family: 'spaceGrotesk';
        src: url(data:font/truetype;base64,${g700}) format('truetype');
        font-weight: 700;
        font-display: swap;
      }
    `;
      document.head.appendChild(style);
    },
    { g400: grotesk400, g700: grotesk700 },
  );

  // Wait for injected fonts to load
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 300));

  // Apply clean styles for PDF
  await page.addStyleTag({
    content: `
      @page {
        size: ${WIDTH_MM}mm ${HEIGHT_MM}mm;
        margin: 0;
      }
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        width: 794px !important;
        height: 1123px !important;
        overflow: hidden !important;
        background: none !important;
      }
    `,
  });

  const outPath = resolve(
    __dirname,
    '..',
    'public',
    `Maciej Skorus - CV [${locale.toUpperCase()}].pdf`,
  );

  await page.pdf({
    path: outPath,
    width: `${WIDTH_MM}mm`,
    height: `${HEIGHT_MM}mm`,
    printBackground: true,
    preferCSSPageSize: false,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log(`  cv-${locale}.pdf -> ${outPath}`);
}

console.log('Generating CV PDFs...');
console.log(`Using: ${BASE_URL}/resume\n`);

await generatePdf('en');
await generatePdf('pl');

console.log('\nDone!');
