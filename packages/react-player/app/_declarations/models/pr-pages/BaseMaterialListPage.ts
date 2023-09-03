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
      code: 'code',
    },
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
      code: 'canProduce',
    },
    {
      type: 'auto',
      code: 'canPurchase',
    },
    {
      type: 'auto',
      code: 'canSale',
    },
    {
      type: 'auto',
      code: 'state',
    },
  ],
};

const page: PrRapidPage = {
  code: 'base_material_list',
  name: '物料列表',
  title: '物料管理',
  templateType: 'rapidPage',
  view: [
    {
      $type: "sonicMainSecondaryLayout",
      mainTitle: "物料分类",
      mainColSpan: 8,
      secondaryTitle: "物料",
      secondaryColSpan: 16,
      main: {
        $type: "sonicEntityList",
        entityCode: "BaseMaterialCategory",
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
            filterFields: ["name"],
          }
        ],
        orderBy: [
          {
            field: "orderNum",
          },
        ],
        columns: [
          {
            columnType: 'auto',
            code: 'name',
          },
          {
            columnType: 'auto',
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
            entityCode: "BaseMaterialCategory",
          },
        ],
        actionsColumnWidth: "80px",
        newForm: cloneDeep(mainFormConfig),
        editForm: cloneDeep(mainFormConfig),
      },
      secondary: [
        {
          $type: "sonicEntityList",
          entityCode: "BaseMaterial",
          viewMode: "table",
          selectionMode: "none",
          actionsColumnWidth: "120px",
          fixedFilters: [
            {
              field: "category_id",
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
              width: '100px',
              fixed: 'left',
              rendererType: "link",
              rendererProps: {
                url: "/pages/base_material_details?id={{id}}",
              },
            },
            {
              columnType: 'link',
              code: 'name',
              width: '150px',
              fixed: 'left',
              rendererType: "link",
              rendererProps: {
                url: "/pages/base_material_details?id={{id}}",
              },
            },
            {
              columnType: 'auto',
              code: 'description',
            },
            {
              columnType: 'auto',
              code: 'canProduce',
              width: '80px',
            },
            {
              columnType: 'auto',
              code: 'canPurchase',
              width: '80px',
            },
            {
              columnType: 'auto',
              code: 'canSale',
              width: '80px',
            },
            {
              columnType: 'auto',
              code: 'state',
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
                    url: `"/api/app/base_materials/" + $event.sender['data-record-id']`,
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
                    url: `"/api/app/base_materials/" + $event.sender['data-record-id']`,
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
              entityCode: "BaseMaterial",
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
