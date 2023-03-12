import { cloneDeep } from 'lodash';
import type { RapidEntityFormConfig } from '~/rapid-extension/rocks';
import type { PrRapidPage } from '~/types/pr-types';

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: 'auto',
      code: 'name',
    },
    {
      type: 'auto',
      code: 'login',
    },
    {
      type: 'auto',
      code: 'department',
    },
    {
      type: 'auto',
      code: 'roles',
    },
    {
      type: 'auto',
      code: 'state',
    },
  ],
}

const page: PrRapidPage = {
  code: 'oc_user_list',
  name: '用户列表',
  title: '用户管理',
  templateType: 'rapidPage',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "OcUser",
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
          filterFields: ["login", "name"],
        }
      ],
      columns: [
        {
          columnType: 'link',
          code: 'name',
        },
        {
          columnType: 'auto',
          code: 'login',
        },
        {
          columnType: 'auto',
          code: 'department',
          fieldName: 'department.name',
          width: '150px',
        },
        {
          columnType: 'auto',
          code: 'roles',
          width: '250px',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          columnType: 'auto',
          code: 'state',
          width: '150px',
        },
        {
          columnType: 'auto',
          code: 'createdAt',
          width: '150px',
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
                url: `"/api/app/oc_users/" + $event.sender['data-record-id']`,
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
                url: `"/api/app/oc_users/" + $event.sender['data-record-id']`,
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
          entityCode: "OcUser",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      searchForm: {
        entityCode: 'OcUser',
        items: [
          {
            type: 'auto',
            code: 'login',
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
