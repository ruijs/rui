import { cloneDeep } from 'lodash';
import type { RapidEntityFormConfig } from '~/rapid-extension/rocks';
import type { PrRapidPage } from '~/types/pr-types';

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: 'auto',
      code: 'client',
    },
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
      code: 'parent',
      listDataFindOptions: {
        fixedFilters: [
          {
            operator: "null",
            field: "parent_id",
          }
        ]
      }
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

const page: PrRapidPage = {
  code: 'app_nav_item_list',
  name: '导航列表',
  title: '导航管理',
  templateType: 'rapidPage',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "AppNavItem",
      viewMode: "table",
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
        }
      ],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "Search",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["code", "name"],
        }
      ],
      orderBy: [
        {
          field: 'orderNum',
        },
      ],
      convertListToTree: true,
      listParentField: "parent.id",
      pageSize: -1,
      extraProperties: ['parent'],
      columns: [
        {
          columnType: 'link',
          code: 'code',
          width: '150px',
          fixed: 'left',
        },
        {
          columnType: 'auto',
          code: 'name',
          fixed: 'left',
        },
        {
          columnType: 'auto',
          code: 'client',
          width: '100px',
          rendererProps: {
            format: "{{name}}"
          },
        },
        {
          columnType: 'auto',
          code: 'orderNum',
        },
        {
          columnType: 'auto',
          code: 'icon',
        },
        {
          columnType: 'auto',
          code: 'pageCode',
        },
        {
          columnType: 'auto',
          code: 'createdAt',
          width: '150px',
        },
        {
          columnType: 'auto',
          code: 'state',
          width: '100px',
        },
      ],
      actions: [
        {
          $type: "sonicRecordActionEditEntity",
          code: 'edit',
          actionType: "edit",
          actionText: '修改',
        },
        {
          $type: "rapidTableAction",
          code: "disable",
          actionText: '禁用',
          $exps: {
            _hidden: "$slot.record.state !== 'enabled'"
          },
          onAction: [
            {
              $action: "sendHttpRequest",
              method: "POST",
              data: {state: 'disabled'},
              $exps: {
                url: `"/api/app/app_nav_items/" + $event.sender['data-record-id']`,
              }
            },
            {
              $action: "loadStoreData",
              storeName: "list",
            }
          ]
        },
        {
          $type: "rapidTableAction",
          code: "enable",
          actionText: '启用',
          $exps: {
            _hidden: "$slot.record.state === 'enabled'"
          },
          onAction: [
            {
              $action: "sendHttpRequest",
              method: "POST",
              data: {state: 'enabled'},
              $exps: {
                url: `"/api/app/app_nav_items/" + $event.sender['data-record-id']`,
              }
            },
            {
              $action: "loadStoreData",
              storeName: "list",
            }
          ]
        },
        {
          $type: "sonicRecordActionDeleteEntity",
          code: 'delete',
          actionType: 'delete',
          actionText: '删除',
          dataSourceCode: "list",
          entityCode: "AppNavItem",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      searchForm: {
        entityCode: 'AppNavItem',
        items: [
          {
            type: 'auto',
            code: 'code',
            filterMode: 'contains',
          },
          {
            type: 'auto',
            code: 'name',
            filterMode: 'contains',
          },
          {
            type: 'auto',
            code: 'state',
            filterMode: 'eq',
          },
        ],
      },
    },
  ],
};

export default page;
