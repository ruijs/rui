import { cloneDeep } from 'lodash';
import type { RapidEntityFormRockConfig } from '~/rapid-extension/rocks';
import type { PrRapidPage } from '~/types/pr-types';

const formConfig: Partial<RapidEntityFormRockConfig> = {
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
      code: 'valueType',
    },
    {
      type: 'textarea',
      code: 'description',
    },
  ],
};

const entryFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: 'auto',
      code: 'value',
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
      code: 'disabled',
    },
    {
      type: 'auto',
      code: 'orderNum',
    },
  ],
};

const page: PrRapidPage = {
  code: 'data_dictionary_list',
  name: '数据字典列表',
  title: '数据字典',
  templateType: 'rapidPage',
  view: [
    {
      $type: "sonicMainSecondaryLayout",
      mainTitle: "数据字典",
      mainColSpan: 8,
      secondaryTitle: "字典项",
      secondaryColSpan: 16,
      main: {
        $type: "sonicEntityList",
        entityCode: "DataDictionary",
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
        extraProperties: ["name"],
        columns: [
          {
            type: 'auto',
            code: 'code',
            width: '200px',
            cell: {
              $type: "antdListItemMeta",
              $exps: {
                title: "$slot.value",
                description: "$slot.record.name",
              }
            }
          },
          {
            type: 'auto',
            code: 'valueType',
            width: '50px',
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
            entityCode: "DataDictionary",
          },
        ],
        actionsColumnWidth: "80px",
        newForm: cloneDeep(formConfig),
        editForm: cloneDeep(formConfig),
      },
      secondary: [
        {
          $type: "sonicEntityList",
          entityCode: "DataDictionaryEntry",
          viewMode: "table",
          selectionMode: "none",
          fixedFilters: [
            {
              field: "dictionary_id",
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
          columns: [
            {
              type: 'auto',
              code: 'value',
              width: '150px',
              fixed: 'left',
            },
            {
              type: 'auto',
              code: 'name',
              width: '150px',
            },
            {
              type: 'auto',
              code: 'description',
            },
            {
              type: 'auto',
              code: 'disabled',
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
              entityCode: "DataDictionaryEntry",
            },
          ],
          newForm: cloneDeep(entryFormConfig),
          editForm: cloneDeep(entryFormConfig),
          $exps: {
            "_hidden": "!$scope.vars.activeId",
            "fixedFilters[0].value": "$scope.vars.activeId",
            "newForm.fixedFields.dictionary_id": "$scope.vars.activeId"
          },
        },
      ]
    },

  ],
};

export default page;
