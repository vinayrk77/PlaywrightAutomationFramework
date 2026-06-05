import { test, expect } from '@playwright/test';

test.setTimeout(120000);

test('Flipkart search iphone 17 pro and verify best seller price @sanity', async ({ page }) => {
  await page.goto('https://www.flipkart.com', { waitUntil: 'networkidle' });

  const popupClose = page.locator('span.b3wTlE');
  if (await popupClose.count() > 0) {
    await popupClose.click();
  }

  const searchInput = page.locator('input[name=q]:not([readonly])').first();
  await expect(searchInput).toBeVisible({ timeout: 15000 });
  await searchInput.fill('iphone 17 pro');
  await page.keyboard.press('Enter');

  const firstProduct = page.locator('div[data-id]').first();
  await expect(firstProduct).toBeVisible({ timeout: 30000 });

  const bestsellerLabel = firstProduct.locator('div.o2uEoz');
  await expect(bestsellerLabel).toHaveText(/Bestseller/i);

  const productLink = firstProduct.locator('a.k7wcnx').first();
  await expect(productLink).toBeVisible();
  await productLink.click();

  const priceLocator = page.locator('div.v1zwn21l.v1zwn29._1psv1zeb9._1psv1ze0._1psv1ze2c').first();
  let priceText: string | null = null;

  if (await priceLocator.count()) {
    await expect(priceLocator).toBeVisible({ timeout: 30000 });
    priceText = (await priceLocator.textContent())?.trim() ?? null;
  } else {
    const fallbackPrice = page.locator('div:has-text("₹")').first();
    await expect(fallbackPrice).toBeVisible({ timeout: 30000 });
    priceText = (await fallbackPrice.textContent())?.trim() ?? null;
  }

  console.log('Displayed price:', priceText);
  expect(priceText).toBeTruthy();
  expect(priceText).toMatch(/₹/);
});
