import type { PrDetailsPage } from '~/types/pr-types';

const page: PrDetailsPage = {
  code: 'app_nav_item_details',
  name: '导航菜单详情',
  templateType: 'detailsPage',
  blocks: [
    {
      code: "tabs",
      type: "tabs",
      tabs: [
        {
          code: 'basic',
          label: '基本信息',
          children: [
            {
              code: 'dataForm',
              type: 'dataForm',
              entityCode: 'AppNavItem',
              mode: 'view',
              column: 3,
              items: [
                {
                  type: 'auto',
                  code: 'code',
                },
                {
                  type: 'auto',
                  code: 'name',
                },
                {
                  type: 'auto',
                  code: 'client',
                },
                {
                  type: 'auto',
                  code: 'orderNum',
                },
                {
                  type: 'auto',
                  code: 'icon',
                },
                {
                  type: 'auto',
                  code: 'pageCode',
                },
                {
                  type: 'auto',
                  code: 'state',
                },
              ],
            }
          ]
        },
      ]
    }
  ],
};

export default page;
