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
      code: 'material',
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
      }
    },
    {
      type: 'auto',
      code: 'materialProcess',
      listDataFindOptions: {
        properties: ["id", "materialFlow", "process", "orderNum"],
        orderBy: [
          {
            field: "orderNum",
          },
        ],
      },
      formControlProps: {
        listTextFormat: "{{process.name}}",
      }
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
      code: 'equipment',
      formControlProps: {
        listTextFormat: "{{code}} {{name}}",
      }
    },
    {
      type: 'auto',
      code: 'assignees',
    },
    {
      type: 'auto',
      code: 'deadline',
    },
    {
      type: 'auto',
      code: 'assigner',
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
}

const page: PrRapidPage = {
  code: 'mom_prod_task_list',
  name: '工序任务列表',
  title: '任务管理',
  templateType: 'rapidPage',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "ProductionTask",
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
          filterFields: ["code"],
        }
      ],
      columns: [
        {
          columnType: 'link',
          code: 'code',
          width: '100px',
          fixed: 'left',
          rendererType: "link",
          rendererProps: {
            url: "/pages/mom_prod_task_details?id={{id}}",
          },
        },
        {
          columnType: 'link',
          code: 'productionOrder',
          width: '150px',
          fixed: 'left',
          rendererType: "link",
          rendererProps: {
            text: "{{productionOrder.code}}",
            url: "/pages/mom_prod_order_details?id={{productionOrder.id}}",
          },
        },
        {
          columnType: 'auto',
          code: 'materialProcess',
          width: '150px',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          columnType: 'auto',
          code: 'amount',
          width: '100px',
        },
        {
          columnType: 'auto',
          code: 'unit',
          width: '150px',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          columnType: 'auto',
          code: 'equipment',
          width: '150px',
          rendererProps: {
            format: "{{name}} {{code}}",
          },
        },
        {
          columnType: 'auto',
          code: 'assignees',
          width: '150px',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          columnType: 'auto',
          code: 'deadline',
          width: '150px',
        },
        {
          columnType: 'auto',
          code: 'assigner',
          width: '150px',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          columnType: 'auto',
          code: 'assignedAt',
          width: '150px',
        },
        {
          columnType: 'auto',
          code: 'acceptedAt',
          width: '150px',
        },
        {
          columnType: 'auto',
          code: 'executionState',
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
      searchForm: {
        entityCode: 'OcUser',
        items: [
          {
            type: 'auto',
            code: 'code',
            filterMode: 'contains',
          },
        ],
      },
    },
  ],
};

export default page;
