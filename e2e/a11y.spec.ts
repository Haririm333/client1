import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const AUDIT_ROUTES = [
  '/',
  '/services',
  '/services/mechanical-design-cad',
  '/work',
  '/process',
  '/about',
  '/quote',
  '/contact',
  '/dispatch',
  '/dispatch/001',
  '/privacy',
  '/terms',
  '/thank-you',
];

for (const route of AUDIT_ROUTES) {
  test(`Accessibility WCAG 2.2 AA audit for route: ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(
      accessibilityScanResults.violations,
      `Accessibility violations found on ${route}:\n${JSON.stringify(
        accessibilityScanResults.violations.map((v) => ({ id: v.id, impact: v.impact, description: v.description })),
        null,
        2
      )}`
    ).toEqual([]);
  });
}

