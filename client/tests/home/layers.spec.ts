import { test, expect } from '@playwright/test';

import { DATASETS } from '../mock/datasets';
import { LAYERS } from '../mock/layers';

test.beforeEach(async ({ page }) => {
  await page.route(/.*\/api\/datasets/, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(DATASETS),
    });
  });
  await page.route(/.*\/api\/layers/, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(LAYERS),
    });
  });

  await page.goto('/');
});

test('add one layer', async ({ page }) => {
  const { id } = LAYERS.data[0];

  await page.waitForSelector(`[data-testid="layer-switch-${id}"]`);
  const layerSwitch = page.getByTestId(`layer-switch-${id}`);
  layerSwitch.click();
  await expect(layerSwitch).toHaveAttribute('data-state', 'checked');
  await page.getByTestId(`legend-item-${id}`).isVisible();

  await expect(page).toHaveURL(new RegExp(`.*?layers=\\[${id}\\]`));

  await page.waitForTimeout(1000);
  const sidebar = page.getByTestId('sidebar');
  await expect(sidebar).toHaveScreenshot(`layers-${id}.png`);
});

test('add all layers', async ({ page }) => {
  for (const layer of LAYERS.data) {
    const { id } = layer;
    await page.waitForSelector(`[data-testid="layer-switch-${id}"]`);
    const layerSwitch = page.getByTestId(`layer-switch-${id}`);
    layerSwitch.click();
    await expect(layerSwitch).toHaveAttribute('data-state', 'checked');
    await page.getByTestId(`legend-item-${id}`).isVisible();
  }

  const ids = LAYERS.data.map((layer) => layer.id).reverse();

  await expect(page).toHaveURL(new RegExp(`.*?layers=\\[${ids}\\]`));

  await page.waitForTimeout(1000);
  const sidebar = page.getByTestId('sidebar');
  await expect(sidebar).toHaveScreenshot(`layers-${ids}.png`);
});
