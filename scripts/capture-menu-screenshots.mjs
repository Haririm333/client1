import { chromium } from 'playwright';
import path from 'path';

const VIEWPORTS = [
  { width: 360, height: 740, name: '360px' },
  { width: 390, height: 844, name: '390px' },
  { width: 430, height: 932, name: '430px' },
];

async function capture(phaseInput = 'before') {
  const phase = phaseInput === 'after' ? 'after' : 'before';
  const browser = await chromium.launch();
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    
    // Capture header closed
    const header = page.locator('header');
    await header.screenshot({ path: path.join(process.cwd(), 'docs', 'qa', 'screenshots', `menu-${phase}-${vp.name}.png`) });
    
    // Capture header open
    const toggle = page.locator('header button[type="button"]');
    if (await toggle.isVisible()) {
      await toggle.click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(process.cwd(), 'docs', 'qa', 'screenshots', `menu-${phase}-open-${vp.name}.png`) });
    }
    await page.close();
  }
  await browser.close();
  console.log(`Captured ${phase} screenshots at 360, 390, 430px.`);
}

capture(process.argv[2] || 'before');

