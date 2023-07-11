import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('CMS scaffold client');
});

test('has description', async ({ page }) => {
  await page.goto('/');

  const metaDescription = await page.locator('meta[name="description"]');

  await expect(metaDescription).toHaveAttribute('content', 'CMS scaffold client description');
});
