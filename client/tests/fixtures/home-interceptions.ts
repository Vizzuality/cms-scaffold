import { Page } from '@playwright/test';

import { DATASETS } from '../mock/datasets';
import { LAYERS, LAYER_1, LAYER_2 } from '../mock/layers';

export const homeInterceptions = async (page: Page) => {
  await page.route(/.*\/api\/datasets/, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(DATASETS),
    });
  });

  await page.route(/.*\/api\/layers\?filters/, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(LAYERS),
    });
  });

  await page.route(/.*\/api\/layers\/1/, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(LAYER_1),
    });
  });

  await page.route(/.*\/api\/layers\/2/, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(LAYER_2),
    });
  });
};
