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
      code: 'name',
    },
    {
      type: 'auto',
      code: 'shop',
    },
    {
      type: 'auto',
      code: 'department',
    },
    {
      type: 'auto',
      code: 'state',
    },
  ],
}

const page: PrRapidPage = {
  code: 'base_employee_list',
  name: '员工列表',
  title: '员工管理',
  templateType: 'rapidPage',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "BaseEmployee",
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
      columns: [
        {
          columnType: 'link',
          code: 'code',
          width: '150px',
        },
        {
          columnType: 'auto',
          code: 'name',
        },
        {
          columnType: 'auto',
          code: 'shop',
          width: '150px',
        },
        {
          columnType: 'auto',
          code: 'department',
          width: '150px',
          rendererProps: {
            format: "{{name}}",
          },
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
          $type: "sonicRecordActionDeleteEntity",
          code: 'delete',
          actionType: 'delete',
          actionText: '删除',
          dataSourceCode: "list",
          entityCode: "BaseEmployee",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      searchForm: {
        entityCode: 'BaseEmployee',
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
        ],
      },
    },
  ],
};

export default page;
