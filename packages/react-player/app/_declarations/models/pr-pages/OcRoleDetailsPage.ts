import { cloneDeep } from 'lodash';
import type { RapidEntityFormConfig } from '~/rapid-extension/rocks';
import type { PrRapidPage } from '~/types/pr-types';

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: 'auto',
      code: 'code',
    },
    {
      type: 'auto',
      code: 'amount',
    },
    {
      type: 'auto',
      code: 'unit',
    },
    {
      type: 'auto',
      code: 'operators',
    },
  ],
}

const page: PrRapidPage = {
  code: 'oc_role_details',
  name: '角色详情',
  title: '角色详情',
  templateType: 'rapidPage',
  view: [
    {
      $type: 'rapidEntityForm',
      entityCode: 'OcRole',
      mode: 'view',
      column: 2,
      items: [
        {
          type: 'auto',
          code: 'name',
        },
        {
          type: 'auto',
          code: 'state',
        },
        {
          type: 'auto',
          code: 'description',
        },
      ],
      $exps: {
        entityId: "$rui.parseQuery().id",
      }
    },
    {
      $type: "antdTabs",
      items: [
        {
          key: "users",
          label: "用户",
          children: [
            {
              $type: "sonicEntityList",
              entityCode: "OcUser",
              viewMode: "table",
              fixedFilters: [
                {
                  field: "roles",
                  operator: "exists",
                  filters: [
                    {
                      field: "id",
                      operator: "eq",
                      value: ""
                    }
                  ]
                }
              ],
              listActions: [
                {
                  $type: "sonicToolbarRefreshButton",
                  text: "刷新",
                  icon: "ReloadOutlined",
                }
              ],
              columns: [
                {
                  type: 'auto',
                  code: 'name',
                  fixed: 'left',
                },
                {
                  type: 'auto',
                  code: 'login',
                  fixed: 'left',
                },
                {
                  type: 'auto',
                  code: 'department',
                  fieldName: 'department.name',
                  width: '150px',
                },
                {
                  type: 'auto',
                  code: 'roles',
                  width: '250px',
                  rendererProps: {
                    item: {
                      $type: "rapidLinkRenderer",
                      url: "/pages/oc_role_details?id={{id}}",
                      text: "{{name}}",
                    }
                  },
                },
                {
                  type: 'auto',
                  code: 'state',
                  width: '150px',
                },
                {
                  type: 'auto',
                  code: 'createdAt',
                  width: '150px',
                },
              ],
              actions: [
              ],
              newForm: cloneDeep(formConfig),
              editForm: cloneDeep(formConfig),
              $exps: {
                "fixedFilters[0].filters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.production_task_id": "$rui.parseQuery().id",
              },
            }
          ]
        },
      ]
    }
  ],
};

export default page;
