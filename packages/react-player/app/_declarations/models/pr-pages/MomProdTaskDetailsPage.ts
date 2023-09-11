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
  code: 'mom_prod_task_details',
  name: '任务详情',
  title: '任务详情',
  templateType: 'rapidPage',
  view: [
    {
      $type: 'rapidEntityForm',
      entityCode: 'ProductionTask',
      mode: 'view',
      column: 3,
      items: [
        {
          type: 'auto',
          code: 'code',
        },
        {
          type: 'auto',
          code: 'material',
          rendererType: "rapidLinkRenderer",
          rendererProps: {
            text: "{{code}} {{name}}",
            url: "/pages/base_material_details?id={{id}}",
          },
        },
        {
          type: 'auto',
          code: 'materialProcess',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: 'auto',
          code: 'amount',
        },
        {
          type: 'auto',
          code: 'unit',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: 'auto',
          code: 'equipment',
          rendererProps: {
            format: "{{code}} {{name}}",
          },
        },
        {
          type: 'auto',
          code: 'assignees',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: 'auto',
          code: 'deadline',
        },
        {
          type: 'auto',
          code: 'assigner',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: 'auto',
          code: 'assignmentState',
        },
        {
          type: 'auto',
          code: 'executionState',
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
          key: "tasks",
          label: "生产报工",
          children: [
            {
              $type: "sonicEntityList",
              entityCode: "ProductionWorkReport",
              viewMode: "table",
              fixedFilters: [
                {
                  field: "production_task_id",
                  operator: "eq",
                  value: "",
                }
              ],
              listActions: [
                {
                  $type: "sonicToolbarNewEntityButton",
                  text: "新建",
                  icon: "PlusOutlined",
                  actionStyle: "primary",
                },
                {
                  $type: "sonicToolbarRefreshButton",
                  text: "刷新",
                  icon: "ReloadOutlined",
                }
              ],
              columns: [
                {
                  type: 'auto',
                  code: 'createdAt',
                  title: '报工时间',
                  width: '150px',
                  fixed: 'left',
                },
                {
                  type: 'auto',
                  code: 'code',
                  fixed: 'left',
                },
                {
                  type: 'auto',
                  code: 'amount',
                  width: '100px',
                },
                {
                  type: 'auto',
                  code: 'unit',
                  width: '100px',
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: 'auto',
                  code: 'operators',
                  width: '250px',
                  rendererProps: {
                    format: "{{name}}",
                  },
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
                  $type: "sonicRecordActionDeleteEntity",
                  code: 'delete',
                  actionType: 'delete',
                  actionText: '删除',
                  dataSourceCode: "list",
                  entityCode: "ProductionTask",
                },
              ],
              newForm: cloneDeep(formConfig),
              editForm: cloneDeep(formConfig),
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
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
