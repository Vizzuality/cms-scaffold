export const LAYERS = {
  data: [
    {
      id: 2,
      attributes: {
        title: 'Layer 1',
      },
    },
    {
      id: 4,
      attributes: {
        title: 'Layer 2',
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: 2,
    },
  },
};

export const LAYER = {
  data: {
    id: 1,
    attributes: {
      title: 'Layer 1',
    },
  },
};

export const LAYERS_DATA = [
  {
    data: {
      id: 2,
      attributes: {
        title: 'Layer 1',
        type: 'mapbox',
        config: {
          source: {
            type: 'raster',
            tiles: ['https://earthengine.google.org/static/hansen_2013/gain_alpha/{z}/{x}/{y}.png'],
            maxzoom: 12,
            minzoom: 3,
            tileSize: 256,
          },
          styles: [
            {
              id: 'raster-layer',
              type: 'raster',
              paint: {
                'raster-opacity': '@@#params.opacity',
              },
              layout: {
                visibility: {
                  v: '@@#params.visibility',
                  '@@function': 'setVisibility',
                },
              },
            },
          ],
        },
        params_config: [
          {
            key: 'opacity',
            default: 1,
          },
          {
            key: 'visibility',
            default: true,
          },
        ],
        legend_config: {
          type: 'basic',
          items: [
            {
              color: '#FF0000',
              value: {
                v: '@@#params.visibility',
                '@@function': 'setVisibility',
              },
            },
            {
              color: '#d95000',
              value: 'Invent 2',
            },
            {
              color: '#ad5d00',
              value: 'Invent 3',
            },
            {
              color: '#785600',
              value: 'Invent 4',
            },
            {
              color: '#F15300',
              value: '@@#params.opacity',
            },
          ],
        },
        interaction_config: {},
        createdAt: '2023-06-28T07:25:47.107Z',
        updatedAt: '2023-07-10T17:53:48.636Z',
        publishedAt: '2023-06-28T07:25:49.763Z',
        metadata: {
          id: 2,
          description:
            '_The Argentina Gran Chaco, part of the larger Gran Chaco region of South America, has long accommo- dated a mix of uses, including hunting, grazing, and cropping in a region with high endemic biodiversity. Over the last 30 years, however, global demand for soy and beef has driven the destruction of millions of acres of native habitat and forests and led to rapid and large- scale simplification of this vast, complex landscape._\n\nSuch land use conversion — driven largely by demand for soy production — has obvious consequences for biodiversity and climate change but also creates risk for food production. Forest clearing, for example, leads to greater rates of soil erosion, flooding and salinity in croplands. In Argentina, the national government approved a Native Forest Law that limits where land conversion is allowed, but illegal deforestation still occurs in response to strong market demand.\n\nThe adoption of agrosilvopastoral techniques — the combination of growing trees, crop production and grazing cattle — offer the potential to protect Gran Chaco’s traditional mixed-use landscape while still producing its economically important commodities and protecting its globally important biodiversity and carbon storage.\n\nWidespread adoption of policies and practices, including nature-based solutions, to protect the integrity of the Argentina Gran Chaco requires partnership with the agribusinesses sourcing commo-dities from this region. This highlights the greatest challenge and opportunity for the Argentina Gran Chaco region: the development of coordinated policy and incentive systems that simultaneously promote the use of diverse practices to foster positive environmental, economic, and social outcomes across a diverse, complex landscape.\n\n### NBS In Action: Agroforestry\n\nMany crop and grazing systems in foodscapes across the world can accommodate many more trees than they currently do. Agroforestry can complement crops and pasture with a range of products and ecosystem services: in croplands they can help improve soil fertility through nitrogen fixation, for example, and provide fodder and shade for livestock in grazing systems.\n\nThe best agroforestry opportunities in croplands are in intensive production foodscapes, especially western Europe, eastern China and the US Great Plains, but there are also opportunities to expand agroforestry in mixed foodscapes where it is already well established, such as much of sub-Saharan Africa and the southern half of South America.\n',
          citation: null,
          source: null,
          resolution: null,
          content_date: null,
          license: null,
        },
      },
    },
    meta: {},
  },
  {
    data: {
      id: 4,
      attributes: {
        title: 'Layer 2',
        type: 'mapbox',
        config: {
          source: {
            id: 'vector-mapbox-params-source',
            url: 'mapbox://layer-manager.1ecpue1k',
            type: 'vector',
          },
          styles: [
            {
              id: 'vector-mapbox-params-layer',
              type: 'fill',
              paint: {
                'fill-color': '@@#params.color',
                'fill-opacity': {
                  o: '@@#params.opacity',
                  base: 0.75,
                  '@@function': 'setOpacity',
                },
              },
              layout: {
                visibility: {
                  v: '@@#params.visibility',
                  '@@function': 'setVisibility',
                },
              },
              'source-layer': 'Indicators',
            },
          ],
        },
        params_config: [
          {
            key: 'opacity',
            default: 1,
          },
          {
            key: 'visibility',
            default: true,
          },
          {
            key: 'info',
            default: true,
          },
          {
            key: 'color',
            default: [
              'match',
              ['get', 'bws_cat'],
              0,
              '#FF0000',
              1,
              '#d95000',
              2,
              '#ad5d00',
              3,
              '#785600',
              4,
              '#F15300',
              '#ccc',
            ],
          },
        ],
        legend_config: {
          info: 'Test - Mapbox vector layer info',
          type: 'gradient',
          items: [
            {
              color: '#FF0000',
              value: 0,
            },
            {
              color: '#d95000',
              value: null,
            },
            {
              color: '#ad5d00',
              value: null,
            },
            {
              color: '#785600',
              value: null,
            },
            {
              color: '#F15300',
              value: 4,
            },
          ],
        },
        interaction_config: {
          events: [
            {
              type: 'click',
              values: [
                {
                  key: 'name',
                },
                {
                  key: 'bws_cat',
                  type: 'number',
                  label: 'BWS category',
                },
                {
                  key: 'pop_cat',
                  type: 'number',
                  label: 'Pop category',
                },
                {
                  key: 'rfr_cat',
                  type: 'number',
                  label: 'RFR category',
                },
              ],
            },
          ],
          enabled: true,
        },
        createdAt: '2023-06-28T13:27:25.766Z',
        updatedAt: '2023-07-05T15:41:06.956Z',
        publishedAt: '2023-06-28T13:27:28.456Z',
        metadata: null,
      },
    },
    meta: {},
  },
];
