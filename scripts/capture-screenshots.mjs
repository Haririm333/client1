import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { name: '360px', width: 360, height: 740 },
  { name: '768px', width: 768, height: 1024 },
  { name: '1280px', width: 1280, height: 800 },
  { name: '1920px', width: 1920, height: 1080 },
];

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'services', path: '/services' },
  { name: 'service-sheetmetal', path: '/services/sheetmetal-design' },
  { name: 'work', path: '/work' },
  { name: 'process', path: '/process' },
  { name: 'about', path: '/about' },
  { name: 'quote', path: '/quote' },
  { name: 'contact', path: '/contact' },
  { name: 'dispatch', path: '/dispatch' },
  { name: 'dispatch-issue-001', path: '/dispatch/001' },
  { name: 'thank-you', path: '/thank-you' },
];

const OUT_DIR = path.resolve('docs/qa/screenshots');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function capture() {
  console.log('Starting visual review & screenshot capture across 4 breakpoints...');
  const browser = await chromium.launch();
  let overflowErrors = 0;

  for (const vp of VIEWPORTS) {
    console.log(`\nTesting Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

    for (const route of ROUTES) {
      await page.goto(`http://localhost:3000${route.path}`, { waitUntil: 'networkidle' });

      // Check for horizontal overflow (forbidden in engineering design)
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      if (hasHorizontalScroll) {
        console.error(`[OVERFLOW DEFECT] Horizontal scroll detected on ${route.name} at ${vp.name}`);
        overflowErrors++;
      }

      const filename = `${route.name}-${vp.name}.png`;
      const filePath = path.join(OUT_DIR, filename);
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`  Captured: ${filename}`);
    }

    await page.close();
  }

  await browser.close();

  if (overflowErrors > 0) {
    console.error(`Visual review found ${overflowErrors} overflow issues.`);
    process.exit(1);
  } else {
    console.log('\n✔ All screenshots captured. Zero horizontal overflows across all routes & breakpoints.');
    process.exit(0);
  }
}

capture().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});

