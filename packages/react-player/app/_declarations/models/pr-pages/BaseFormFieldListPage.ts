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
      code: 'fieldType',
    },
    {
      type: 'auto',
      code: 'state',
    },
    {
      type: 'textarea',
      code: 'description',
    },
  ],
}

const page: PrRapidPage = {
  code: 'form_field_list',
  name: '表单字段列表',
  title: '表单字段管理',
  templateType: 'rapidPage',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "BaseFormField",
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
          width: '250px',
        },
        {
          columnType: 'auto',
          code: 'name',
        },
        {
          columnType: 'auto',
          code: 'description',
        },
        {
          columnType: 'auto',
          code: 'fieldType',
          width: '150px',
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
          $type: "sonicRecordActionDeleteEntity",
          code: 'delete',
          actionType: 'delete',
          actionText: '删除',
          dataSourceCode: "list",
          entityCode: "BaseFormField",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;
