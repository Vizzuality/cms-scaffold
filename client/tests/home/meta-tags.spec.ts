import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle('CMS scaffold client');
});

test('has description', async ({ page }) => {
  const metaDescription = await page.locator('meta[name="description"]');

  await expect(metaDescription).toHaveAttribute('content', 'CMS scaffold client description');
});

test('has favicon', async ({ page }) => {
  const favicon = await page.locator('link[rel="icon"]');

  await expect(favicon).toHaveAttribute('href', '/favicon.ico');
});

// test('fetch datasets', async ({ page }) => {
//   const response = await page.waitForResponse((response) =>
//     response.url().includes('/api/datasets')
//   );

//   const json = await response.json();

//   expect(response.status()).toBe(200);

//   expect(json).toHaveProperty('data');
//   expect(json).toHaveProperty('meta');
//   // meta
//   expect(json.meta).toHaveProperty('pagination');
//   expect(json.meta.pagination).toHaveProperty('page');
//   expect(json.meta.pagination).toHaveProperty('pageSize');
//   expect(json.meta.pagination).toHaveProperty('pageCount');
//   expect(json.meta.pagination).toHaveProperty('total');
//   expect(json.meta.pagination.total).toBeGreaterThan(0);
//   // data
//   expect(json.data).toBeInstanceOf(Array);
//   expect(json.data.length).toBeGreaterThan(0);
//   expect(json.data[0]).toHaveProperty('id');
//   expect(json.data[0]).toHaveProperty('attributes');
// });
