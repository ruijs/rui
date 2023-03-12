import type { PrRapidPage } from '~/types/pr-types';

const page: PrRapidPage = {
  code: 'app_nav_item_edit',
  name: '修改导航菜单',
  templateType: 'rapidPage',
  blocks: [
    {
      type: "dataForm",
      code: "dataForm",
      entityCode: 'AppNavItem',
      mode: "edit",
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
          code: 'config',
        },
        {
          type: 'auto',
          code: 'state',
        },
      ],
      actions: [
        {
          actionType: "submit",
          actionText: "保存",
        }
      ],
      onSaveSuccess: [
        {
          $action: "wait",
          time: 1000,
        },
        {
          $action: "goToPage",
          pageCode: "app_nav_item_list",
        },
      ],
    },
  ],
};

export default page;
