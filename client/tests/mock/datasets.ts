import { LAYERS } from './layers';

export const DATASETS = {
  data: [
    {
      id: 1,
      attributes: {
        title: 'Dataset 1',
        dataset_group: {
          data: {
            id: 1,
            attributes: {
              title: 'Dataset group 1',
              createdAt: '2023-06-26T17:35:00.202Z',
              updatedAt: '2023-06-27T22:10:08.370Z',
              publishedAt: '2023-06-26T17:35:02.937Z',
            },
          },
        },
        layers: LAYERS,
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: 1,
    },
  },
};

export const DATASET = {
  data: {
    id: 1,
    attributes: {
      title: 'Layer 1',
    },
  },
};
