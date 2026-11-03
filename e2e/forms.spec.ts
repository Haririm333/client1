import { test, expect } from '@playwright/test';

test.describe('Forms and User Interaction Flows', () => {
  test('Quote form submission happy path', async ({ page }) => {
    await page.goto('/quote');

    // Fill in required fields
    const testEmail = `dev_${Date.now()}_${Math.floor(Math.random() * 1000)}@anandprecision.in`;
    await page.fill('#field-name', 'Dev Anand');
    await page.fill('#field-email', testEmail);
    await page.fill('#field-phone', '+91 99887 76655');
    await page.fill('#field-company', 'Anand Precision Tools');
    await page.selectOption('#field-serviceNeeded', 'sheetmetal-design');
    await page.selectOption('#field-assetStage', 'sketch');
    await page.selectOption('#field-quantity', 'prototype-batch');
    await page.fill('#field-neededBy', '3 weeks');
    await page.fill(
      '#field-projectDetails',
      'Need complete sheetmetal enclosure design with bend relief and 1:1 DXF flat pattern cut files.'
    );
    await page.check('#field-consent');

    // Wait for minimum fill time bot deterrence (2000ms)
    await page.waitForTimeout(2100);

    // Submit form
    await page.click('button[type="submit"]');

    // Should redirect to /thank-you
    await expect(page).toHaveURL(/\/thank-you/);
    await expect(page.locator('h1')).toContainText('Your Requirement Has Been Received');
  });

  test('Quote form displays accessible validation errors on empty submission', async ({ page }) => {
    await page.goto('/quote');
    await page.click('button[type="submit"]');

    // Should focus error summary
    const summary = page.locator('[role="alert"][aria-labelledby="error-summary-heading"]');
    await expect(summary).toBeVisible();
    await expect(summary).toContainText('Please review the following items');

    // Inline errors should be rendered
    await expect(page.locator('#error-name')).toBeVisible();
    await expect(page.locator('#error-email')).toBeVisible();
    await expect(page.locator('#error-details')).toBeVisible();
    await expect(page.locator('#error-consent')).toBeVisible();
  });

  test('Dispatch subscription flow displays success message on web UI', async ({ page }) => {
    await page.goto('/dispatch');
    const subscriberEmail = `subscriber_${Date.now()}_${Math.floor(Math.random() * 1000)}@company.com`;
    await page.fill('#dispatch-email', subscriberEmail);
    await page.click('button:has-text("Subscribe to Dispatch")');

    // Success notification appears
    await expect(page.locator('[role="status"]')).toBeVisible();
    await expect(page.locator('[role="status"]')).toContainText('Confirmation Email Dispatched');
  });
});

