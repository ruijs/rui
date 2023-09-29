import { cloneDeep } from 'lodash';
import type { RapidEntityFormConfig } from '~/rapid-extension/rocks';
import type { PrRapidPage } from '~/types/pr-types';

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: 'treeSelect',
      code: 'parent',
      formControlProps: {
        listDataSourceCode: "departments",
        listParentField: "parent.id",
      }
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
      code: 'orderNum',
    },
  ],
}

const page: PrRapidPage = {
  code: 'oc_department_list',
  name: '部门列表',
  title: '部门管理',
  templateType: 'rapidPage',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "OcDepartment",
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
          filterFields: ["name"],
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
          type: 'link',
          code: 'code',
          width: '200px',
        },
        {
          type: 'auto',
          code: 'name',
        },
        {
          type: 'auto',
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
          entityCode: "OcDepartment",
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
          {
            type: 'auto',
            code: 'name',
            filterMode: 'contains',
          },
        ],
      },
      stores: [
        {
          type: "entityStore",
          name: "departments",
          entityCode: "OcDepartment",
          properties: ["id", "code", "name", "parent", "orderNum", "createdAt"],
          filters: [
          ],
          orderBy: [
            {
              field: 'orderNum',
            }
          ],
        }
      ],
    },
  ],
};

export default page;
