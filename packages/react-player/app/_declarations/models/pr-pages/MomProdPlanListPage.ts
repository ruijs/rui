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
      code: 'scheduledStartDate',
    },
    {
      type: 'auto',
      code: 'scheduledFinishDate',
    },
    {
      type: 'auto',
      code: 'scheduleState',
    },
    {
      type: 'auto',
      code: 'executionState',
    },
  ],
}

const page: PrRapidPage = {
  code: 'mom_prod_plan_list',
  name: '生产计划列表',
  title: '生产计划',
  templateType: 'rapidPage',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "ProductionPlan",
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
          fixed: 'left',
          // rendererType: "link",
          rendererProps: {
            url: "/pages/mom_prod_plan_details?id={{id}}",
          },
        },
        {
          columnType: 'auto',
          code: 'scheduledStartDate',
          width: '100px',
        },
        {
          columnType: 'auto',
          code: 'scheduledFinishDate',
          width: '100px',
        },
        {
          columnType: 'auto',
          code: 'scheduleState',
          width: '100px',
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
          entityCode: "ProductionPlan",
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
