import { cloneDeep } from 'lodash';
import type { RapidEntityFormRockConfig } from '~/rapid-extension/rocks';
import type { PrRapidPage } from '~/types/pr-types';

const mainFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: 'auto',
      code: 'name',
    },
    {
      type: 'auto',
      code: 'orderNum',
    },
  ],
};

const secondaryFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: 'auto',
      code: 'type',
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
      code: 'printSymbol',
    },
    {
      type: 'auto',
      code: 'orderNum',
    },
  ],
};

const page: PrRapidPage = {
  code: 'base_unit_list',
  name: '计量单位列表',
  title: '计量单位',
  templateType: 'rapidPage',
  view: [
    {
      $type: "sonicMainSecondaryLayout",
      mainTitle: "单位分组",
      mainColSpan: 8,
      secondaryTitle: "单位",
      secondaryColSpan: 16,
      main: {
        $type: "sonicEntityList",
        entityCode: "BaseUnitCategory",
        viewMode: "table",
        selectionMode: "single",
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
        orderBy: [
          {
            field: "orderNum",
          },
        ],
        columns: [
          {
            type: 'auto',
            code: 'name',
          },
          {
            type: 'auto',
            code: 'orderNum',
            width: '100px',
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
            entityCode: "BaseUnitCategory",
          },
        ],
        actionsColumnWidth: "80px",
        newForm: cloneDeep(mainFormConfig),
        editForm: cloneDeep(mainFormConfig),
      },
      secondary: [
        {
          $type: "sonicEntityList",
          entityCode: "BaseUnit",
          viewMode: "table",
          selectionMode: "none",
          actionsColumnWidth: "80px",
          fixedFilters: [
            {
              field: "category_id",
              operator: "eq",
              value: "",
            }
          ],
          orderBy: [
            {
              field: "orderNum",
            },
          ],
          listActions: [
            {
              $type: "sonicToolbarNewEntityButton",
              text: "新建",
              icon: "PlusOutlined",
              actionStyle: "primary",
            },
          ],
          columns: [
            {
              type: 'auto',
              code: 'code',
              width: '100px',
              fixed: 'left',
            },
            {
              type: 'auto',
              code: 'name',
              fixed: 'left',
            },
            {
              type: 'auto',
              code: 'printSymbol',
              width: '100px',
            },
            {
              type: 'auto',
              code: 'type',
              width: '100px',
            },
            {
              type: 'auto',
              code: 'orderNum',
              width: '100px',
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
              entityCode: "BaseUnit",
            },
          ],
          newForm: cloneDeep(secondaryFormConfig),
          editForm: cloneDeep(secondaryFormConfig),
          $exps: {
            "_hidden": "!$scope.vars.activeId",
            "fixedFilters[0].value": "$scope.vars.activeId",
            "newForm.fixedFields.category_id": "$scope.vars.activeId"
          },
        },
      ]
    },

  ],
};

export default page;
