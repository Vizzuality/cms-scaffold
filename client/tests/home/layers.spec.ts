import { test, expect } from '@playwright/test';
import { homeInterceptions } from 'fixtures/home-interceptions';

import { LAYERS, LAYER_1, LAYER_2 } from '../mock/layers';

test.beforeEach(async ({ page }) => {
  await homeInterceptions(page);

  await page.goto('/?layers=[]');
});

test.describe('Add Layers', () => {
  test('add one layer', async ({ page }) => {
    const { id } = LAYER_1.data;

    const layerSwitch = page.getByTestId(`layer-switch-${id}`);
    layerSwitch.click();
    await expect(layerSwitch).toHaveAttribute('data-state', 'checked');
    await page.getByTestId(`legend-item-${id}`).isVisible();

    await expect(page).toHaveURL(new RegExp(`.*?layers=\\[${id}\\]`));

    const sidebar = page.getByTestId('sidebar');
    await expect(sidebar).toHaveScreenshot(`layers-${id}.png`);
  });

  test('add all layers', async ({ page }) => {
    for (const layer of LAYERS.data) {
      const { id } = layer;
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
});

test.describe('remove layers', () => {
  test('remove one layer', async ({ page }) => {
    const { id } = LAYER_1.data;

    await page.goto(`/?layers=[${id}]`);

    const layerSwitch = page.getByTestId(`layer-switch-${id}`);
    await expect(layerSwitch).toHaveAttribute('data-state', 'checked');
    await layerSwitch.click();
    await expect(layerSwitch).toHaveAttribute('data-state', 'unchecked');

    await expect(page).toHaveURL(`/?layers=[]`);
    await expect(page.getByTestId('sidebar')).toHaveScreenshot(`layers-empty.png`);
  });

  test('remove all layers', async ({ page }) => {
    const ids = LAYERS.data.map((layer) => layer.id);

    await page.goto(`/?layers=[${ids}]`);

    for (const id of ids) {
      const layerSwitch = page.getByTestId(`layer-switch-${id}`);
      await expect(layerSwitch).toHaveAttribute('data-state', 'checked');
      await layerSwitch.click();
      await expect(layerSwitch).toHaveAttribute('data-state', 'unchecked');
    }

    await expect(page).toHaveURL(`/?layers=[]`);
    await expect(page.getByTestId('sidebar')).toHaveScreenshot(`layers-empty.png`);
  });
});

test.describe('change layers settings', () => {
  test('change layer order', async ({ page }) => {
    const ids = LAYERS.data.map((layer) => layer.id);

    await page.goto(`/?layers=[${ids}]`);

    const legend1 = page.getByTestId(`legend-item-${ids[0]}-drag`);
    const legend2 = page.getByTestId(`legend-item-${ids[1]}-drag`);

    await legend1.dragTo(legend2);

    await expect(page).toHaveURL(`/?layers=[${ids.reverse()}]`);
  });

  test('change layer opacity', async ({ page }) => {
    const { id } = LAYER_1.data;

    await page.goto(`/?layers=[${id}]`);

    await page.getByTestId(`legend-${id}-toolbar-opacity`).click();
    await page.getByTestId(`legend-${id}-toolbar-opacity-slider`).getByRole('slider').hover();

    await page.mouse.down();
    await page.mouse.move(100, 0);
    await page.mouse.up();

    await expect(page).toHaveURL(
      `/?layers=[${id}]&layers-settings={"${id}":{"expand":true,"opacity":0}}`
    );

    await expect(page.getByTestId(`legend-item-${id}`)).toHaveScreenshot(
      `layer-${id}-legend-opacity-0.png`
    );
    await expect(page.getByRole('region', { name: 'Map' })).toHaveScreenshot(
      `layer-${id}-opacity-0.png`
    );
  });

  test('change layer visibility', async ({ page }) => {
    const { id } = LAYER_1.data;

    await page.goto(`/?layers=[${id}]`);

    const legendVisibilityToggle = page.getByTestId(`legend-${id}-toolbar-visibility`);

    await expect(legendVisibilityToggle).toHaveAttribute('aria-label', 'Hide layer');
    await legendVisibilityToggle.click();

    await expect(page).toHaveURL(
      `/?layers=[${id}]&layers-settings={"${id}":{"expand":true,"visibility":false}}`
    );
    await expect(legendVisibilityToggle).toHaveAttribute('aria-label', 'Show layer');
    await expect(page.getByRole('region', { name: 'Map' })).toHaveScreenshot(
      `layer-${id}-visibility-false.png`
    );
  });

  test('change legend expansion', async ({ page }) => {
    const { id } = LAYER_1.data;

    await page.goto(`/?layers=[${id}]`);

    const legendExpandToggle = page.getByTestId(`legend-${id}-toolbar-expand`);

    await expect(legendExpandToggle).toHaveAttribute('aria-label', 'Collapse layer');
    await legendExpandToggle.click();

    await expect(page).toHaveURL(`/?layers=[${id}]&layers-settings={"${id}":{"expand":false}}`);
    await expect(legendExpandToggle).toHaveAttribute('aria-label', 'Expand layer');
    await expect(page.getByRole('region', { name: 'Map' })).toHaveScreenshot(
      `layer-${id}-expand-false.png`
    );
  });

  test('open and close legend info', async ({ page }) => {
    const { id } = LAYERS.data[0];

    await page.goto(`/?layers=[${id}]`);

    const legendInfoToggle = page.getByTestId(`legend-${id}-toolbar-info`);

    await expect(legendInfoToggle).toHaveAttribute('aria-label', 'Show info');
    await legendInfoToggle.click();
    const legendInfoDialog = page.getByTestId(`legend-${id}-toolbar-info-dialog`);
    await expect(legendInfoDialog).toBeVisible();
    await legendInfoDialog.getByText('Close').click();
    await expect(legendInfoDialog).not.toBeVisible();
  });
});

test.describe('layers interaction', () => {
  test('open and close layer interaction popup on click', async ({ page }) => {
    const {
      id,
      attributes: {
        title,
        interaction_config: {
          events: [{ values }],
        },
      },
    } = LAYER_2.data;

    await page.goto(`/?layers=[${id}]`);
    await page.waitForRequest(`**/layers/${id}?populate=metadata`);

    await page.mouse.click(1089, 270, { delay: 1000, clickCount: 1 });

    const layerDataPopup = page.getByTestId('map-gl-popup');

    const layerDataPopuptexts = new RegExp(
      [
        title,
        ...values.reduce((acc, { label }) => (label ? [...acc, `.*${label}`] : acc), []),
      ].join('')
    );

    await expect(layerDataPopup).toBeVisible();
    await expect(layerDataPopup).toContainText(layerDataPopuptexts);
    await page.getByLabel('Close popup').click();
    await expect(layerDataPopup).not.toBeVisible();
  });
});
