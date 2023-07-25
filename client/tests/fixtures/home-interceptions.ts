import { DATASETS } from '../mock/datasets';
import { LAYERS, LAYERS_DATA } from '../mock/layers';

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

  await page.route(/.*\/api\/layers\/2/, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(LAYERS_DATA[0]),
    });
  });

  await page.route(/.*\/api\/layers\/4/, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(LAYERS_DATA[1]),
    });
  });
};
