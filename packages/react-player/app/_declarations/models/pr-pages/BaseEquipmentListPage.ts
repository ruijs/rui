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
      type: 'auto',
      code: 'planedDailyWorkingTime',
    },
    {
      type: 'auto',
      code: 'state',
    },
  ],
};

const page: PrRapidPage = {
  code: 'base_equipment_list',
  name: '设备列表',
  title: '设备管理',
  templateType: 'rapidPage',
  view: [
    {
      $type: "sonicMainSecondaryLayout",
      mainTitle: "设备分类",
      mainColSpan: 8,
      secondaryTitle: "设备",
      secondaryColSpan: 16,
      main: {
        $type: "sonicEntityList",
        entityCode: "BaseEquipmentCategory",
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
            entityCode: "BaseEquipmentCategory",
          },
        ],
        actionsColumnWidth: "80px",
        newForm: cloneDeep(mainFormConfig),
        editForm: cloneDeep(mainFormConfig),
      },
      secondary: [
        {
          $type: "sonicEntityList",
          entityCode: "BaseEquipment",
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
              type: 'auto',
              code: 'code',
              fixed: 'left',
            },
            {
              type: 'auto',
              code: 'name',
              fixed: 'left',
            },
            {
              type: 'auto',
              code: 'planedDailyWorkingTime',
              width: '150px',
            },
            {
              type: 'auto',
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
                    url: `"/api/app/base_equipments/" + $event.sender['data-record-id']`,
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
                    url: `"/api/app/base_equipments/" + $event.sender['data-record-id']`,
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
              entityCode: "BaseEquipment",
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
