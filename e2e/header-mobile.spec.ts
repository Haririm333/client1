import { test, expect } from '@playwright/test';

test.describe('Mobile Header & Menu Button Verification', () => {
  test('Button geometry, alignment, and icon centering at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const header = page.locator('header');
    const button = page.locator('header button[aria-controls="mobile-nav"]');
    const icon = button.locator('svg');

    // Wait for elements to be visible
    await expect(header).toBeVisible();
    await expect(button).toBeVisible();
    await expect(icon).toBeVisible();

    const headerBox = await header.boundingBox();
    const buttonBox = await button.boundingBox();
    const iconBox = await icon.boundingBox();

    expect(headerBox).not.toBeNull();
    expect(buttonBox).not.toBeNull();
    expect(iconBox).not.toBeNull();

    // 1. Header row height is 64px
    expect(Math.round(headerBox!.height)).toBe(64);

    // 2. Button box: exactly 48x48px
    expect(Math.round(buttonBox!.width)).toBe(48);
    expect(Math.round(buttonBox!.height)).toBe(48);

    // 3. Right edge aligned to the page margin (20px from screen right edge at 360px)
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    const rightMargin = viewportWidth - (buttonBox!.x + buttonBox!.width);
    expect(Math.round(rightMargin)).toBe(20);

    // 4. Button vertical centre equals header vertical centre within 1px
    const headerVCenter = headerBox!.y + headerBox!.height / 2;
    const buttonVCenter = buttonBox!.y + buttonBox!.height / 2;
    expect(Math.abs(headerVCenter - buttonVCenter)).toBeLessThanOrEqual(1);

    // 5. Icon bounding box is fully inside the button box
    expect(iconBox!.x).toBeGreaterThanOrEqual(buttonBox!.x);
    expect(iconBox!.y).toBeGreaterThanOrEqual(buttonBox!.y);
    expect(iconBox!.x + iconBox!.width).toBeLessThanOrEqual(buttonBox!.x + buttonBox!.width);
    expect(iconBox!.y + iconBox!.height).toBeLessThanOrEqual(buttonBox!.y + buttonBox!.height);

    // 6. Icon is centered within 1px in the button box horizontally and vertically
    const buttonHCenter = buttonBox!.x + buttonBox!.width / 2;
    const iconHCenter = iconBox!.x + iconBox!.width / 2;
    expect(Math.abs(buttonHCenter - iconHCenter)).toBeLessThanOrEqual(1);

    const iconVCenter = iconBox!.y + iconBox!.height / 2;
    expect(Math.abs(buttonVCenter - iconVCenter)).toBeLessThanOrEqual(1);

    // 7. Icon has at least 12px clear space on every side inside button
    const clearLeft = iconBox!.x - buttonBox!.x;
    const clearRight = buttonBox!.x + buttonBox!.width - (iconBox!.x + iconBox!.width);
    const clearTop = iconBox!.y - buttonBox!.y;
    const clearBottom = buttonBox!.y + buttonBox!.height - (iconBox!.y + iconBox!.height);

    expect(clearLeft).toBeGreaterThanOrEqual(11.9);
    expect(clearRight).toBeGreaterThanOrEqual(11.9);
    expect(clearTop).toBeGreaterThanOrEqual(11.9);
    expect(clearBottom).toBeGreaterThanOrEqual(11.9);

    // 8. No horizontal overflow on the page
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow).toBe(false);
  });

  test('Open state, dropdown panel alignment, keyboard trap, and scroll lock', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const button = page.locator('header button[aria-controls="mobile-nav"]');

    // Initial closed state
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(button).toHaveAttribute('aria-label', 'Open menu');

    // Click to open
    await button.click();

    // Verify open state attributes
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(button).toHaveAttribute('aria-label', 'Close menu');

    // Dropdown panel opens directly under the header (top: 64px)
    const panel = page.locator('#mobile-nav');
    await expect(panel).toBeVisible();

    const panelBox = await panel.boundingBox();
    expect(panelBox).not.toBeNull();
    expect(Math.round(panelBox!.y)).toBe(64);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(panelBox!.width).toBeGreaterThanOrEqual(viewportWidth - 2);

    // Page behind must not scroll while it is open
    const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(bodyOverflow).toBe('hidden');

    // Focus moves to first link on open
    const firstLink = page.locator('#mobile-nav a[href="/services"]');
    await expect(firstLink).toBeFocused({ timeout: 1000 });

    // Verify link row height is 56px and font-size is 18px
    const linkBox = await firstLink.boundingBox();
    expect(Math.round(linkBox!.height)).toBe(56);

    const linkFontSize = await firstLink.evaluate((el) => window.getComputedStyle(el).fontSize);
    expect(linkFontSize).toBe('18px');

    // "Get a quote" is the final full-width button
    const quoteBtn = page.locator('#mobile-nav a[href="/quote"]');
    await expect(quoteBtn).toBeVisible();
    await expect(quoteBtn).toContainText('Get a quote');
    const quoteBox = await quoteBtn.boundingBox();
    expect(quoteBox!.width).toBeGreaterThan(300); // Full width minus container padding

    // Close on Escape
    await page.keyboard.press('Escape');
    await expect(panel).not.toBeVisible();
    await expect(button).toBeFocused();

    // Body scroll restored
    const restoredOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(restoredOverflow).toBe('');

    // Open again and close on outside tap (clicking backdrop)
    await button.click();
    await expect(panel).toBeVisible();
    const backdrop = page.locator('#mobile-nav > div[aria-hidden="true"]');
    await backdrop.click({ position: { x: 50, y: 500 } });
    await expect(panel).not.toBeVisible();
    await expect(button).toBeFocused();
  });
});

