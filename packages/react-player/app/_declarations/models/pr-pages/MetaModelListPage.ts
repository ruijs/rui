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
      code: 'namespace',
    },
    {
      type: 'auto',
      code: 'singularCode',
    },
    {
      type: 'auto',
      code: 'pluralCode',
    },
    {
      type: 'textarea',
      code: 'description',
    },
  ],
}

const page: PrRapidPage = {
  code: 'meta_model_list',
  name: '实体模型列表',
  title: '模型管理',
  templateType: 'rapidPage',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "Model",
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
          filterFields: ["plural_code", "name"],
        }
      ],
      columns: [
        {
          columnType: 'link',
          code: 'name',
          width: '200px',
          fixed: 'left',
          rendererType: "link",
          rendererProps: {
            url: "/pages/meta_model_details?id={{id}}",
          },
        },
        {
          columnType: 'auto',
          code: 'namespace',
          title: 'Ns.',
          width: '100px',
        },
        {
          columnType: 'auto',
          code: 'singularCode',
          width: '250px',
        },
        {
          columnType: 'auto',
          code: 'pluralCode',
          width: '250px',
        },
        {
          columnType: 'auto',
          code: 'description',
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
          entityCode: "Model",
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
