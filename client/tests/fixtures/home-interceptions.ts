import { DATASETS } from '../mock/datasets';
import { LAYERS } from '../mock/layers';

export const homeInterceptions = async (page) => {
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
};
