import { test, expect } from '@playwright/test';

import { homeInterceptions } from '../fixtures/home-interceptions';
import { LAYERS } from '../mock/layers';

const LAYER_IDS = LAYERS.data.map((layer) => layer.id).reverse();

test.beforeEach(async ({ page }) => {
  await homeInterceptions(page);
});

test('get layers from url', async ({ page }) => {
  await page.goto(`/?layers=[${LAYER_IDS}]`);
  for (const layer of LAYERS.data) {
    await expect(page.getByTestId(`layer-switch-${layer.id}`)).toHaveAttribute(
      'data-state',
      'checked'
    );
    await expect(page.getByTestId(`legend-item-${layer.id}`)).toContainText(layer.attributes.title);
  }
});

test('get layer-settings opacity from url', async ({ page }) => {
  const layerId = LAYERS.data[0].id;
  const LAYER_LEGEND_CONFIG = JSON.stringify({
    [layerId]: { opacity: 0.5, expand: true, visibility: true },
  });
  await page.goto(`/?layers=[${layerId}]&layers-settings=${LAYER_LEGEND_CONFIG}`);
  await expect(
    page.getByTestId(`legend-${layerId}-toolbar-opacity`).getByTestId('legend-item-button-icon')
  ).toHaveAttribute('data-value', '0.5');
});

test('get layer-settings visibility from url', async ({ page }) => {
  const layerId = LAYER_IDS[0];
  const LAYER_LEGEND_CONFIG = JSON.stringify({
    [layerId]: { opacity: 1, expand: true, visibility: false },
  });
  await page.goto(`/?layers=[${layerId}]&layers-settings=${LAYER_LEGEND_CONFIG}`);
  await expect(page.getByTestId(`legend-${layerId}-toolbar-visibility`)).toHaveAttribute(
    'aria-label',
    'Hide layer'
  );
});

test('get legends expansion from url', async ({ page }) => {
  const LAYER_LEGEND_CONFIG = JSON.stringify(
    LAYER_IDS.reduce(
      (acc, layerId) => ({
        ...acc,
        [layerId]: { opacity: 1, expand: false, visibility: true },
      }),
      {}
    )
  );

  await page.goto(`/?layers=[${LAYER_IDS}]&layers-settings=${LAYER_LEGEND_CONFIG}`);

  for (const layer of LAYERS.data) {
    const legend = page.getByTestId(`legend-item-${layer.id}`);
    await expect(legend).toHaveText(layer.attributes.title);
    await expect(legend).toHaveAttribute('data-state', 'closed');
  }
});
