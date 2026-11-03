import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/services',
  '/services/mechanical-design-cad',
  '/services/sheetmetal-design',
  '/services/drafting-gdt',
  '/services/reverse-engineering',
  '/services/product-development',
  '/services/fabrication-support',
  '/services/3d-printing',
  '/work',
  '/process',
  '/about',
  '/quote',
  '/contact',
  '/dispatch',
  '/dispatch/001',
  '/dispatch/confirm',
  '/dispatch/unsubscribe',
  '/privacy',
  '/terms',
  '/thank-you',
];

for (const route of ROUTES) {
  test(`Route ${route} renders with HTTP 200, one h1, and valid metadata`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const response = await page.goto(route);
    expect(response?.status()).toBe(200);

    // Expect exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count, `Expected exactly one h1 on route ${route}, found ${h1Count}`).toBe(1);

    // Check title length (<= 60 chars)
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title.length, `Title on ${route} exceeds 60 characters: "${title}"`).toBeLessThanOrEqual(60);

    // Check meta description exists and <= 155 chars
    const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDesc).toBeTruthy();
    expect(metaDesc!.length, `Meta description on ${route} exceeds 155 chars`).toBeLessThanOrEqual(155);

    // Zero console errors
    expect(consoleErrors).toEqual([]);
  });
}

