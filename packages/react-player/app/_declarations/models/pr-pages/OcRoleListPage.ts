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
      type: 'textarea',
      code: 'description',
    },
    {
      type: 'auto',
      code: 'orderNum',
    },
    {
      type: 'auto',
      code: 'state',
    },
  ],
}

const page: PrRapidPage = {
  code: 'oc_role_list',
  name: '角色列表',
  title: '角色管理',
  templateType: 'rapidPage',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "OcRole",
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
          filterFields: ["name", "description"],
        }
      ],
      columns: [
        {
          columnType: 'link',
          code: 'name',
          fixed: 'left',
          width: '300px',
        },
        {
          columnType: 'auto',
          code: 'description',
        },
        {
          columnType: 'auto',
          code: 'orderNum',
          width: '100px',
        },
        {
          columnType: 'auto',
          code: 'state',
          width: '100px',
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
                url: `"/api/app/oc_roles/" + $event.sender['data-record-id']`,
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
                url: `"/api/app/oc_roles/" + $event.sender['data-record-id']`,
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
          entityCode: "OcRole",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      searchForm: {
        entityCode: 'OcRole',
        items: [
          {
            type: 'auto',
            code: 'name',
            filterMode: 'contains',
          },
        ],
      },
    },
  ],
};

export default page;
