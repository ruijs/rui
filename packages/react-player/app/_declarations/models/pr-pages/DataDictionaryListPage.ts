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
      $id: "dictionariesLayout",
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
        extraProperties: ["name", "level"],
        columns: [
          {
            type: 'auto',
            code: 'code',
            title: '字典',
            width: '200px',
            cell: {
              $type: "antdListItemMeta",
              title: {
                $type: "antdSpace",
                children: [
                  {
                    $type: "text",
                    text: "",
                  },
                  {
                    $type: "rapidOptionFieldRenderer",
                    dictionaryCode: "DataDictionaryLevel",
                    value: "",
                  }
                ]
              },
              $exps: {
                "title.children[0].text": "$slot.value",
                "title.children[1].value": "$slot.record.level",
                description: "$slot.record.name",
              }
            }
          },
        ],
        actions: [
          {
            $type: "sonicRecordActionEditEntity",
            code: 'edit',
            actionType: "edit",
            actionText: '修改',
            $exps: {
              _hidden: "$slot.record.level !== 'user'",
            },
          },
          {
            $type: "sonicRecordActionDeleteEntity",
            code: 'delete',
            actionType: 'delete',
            actionText: '删除',
            dataSourceCode: "list",
            entityCode: "DataDictionary",
            $exps: {
              _hidden: "$slot.record.level !== 'user'",
            },
          },
        ],
        actionsColumnWidth: "80px",
        newForm: cloneDeep(formConfig),
        editForm: cloneDeep(formConfig),
        $exps: {
          "newForm.fixedFields.level": "'user'",
        }
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
              $exps: {
                _hidden: "_.get($page.getScope('dictionariesLayout-scope'), 'vars.activeRecord.level') !== 'user'",
              },
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
              $exps: {
                _hidden: "_.get($page.getScope('dictionariesLayout-scope'), 'vars.activeRecord.level') !== 'user'",
              },
            },
            {
              $type: "sonicRecordActionDeleteEntity",
              code: 'delete',
              actionType: 'delete',
              actionText: '删除',
              dataSourceCode: "list",
              entityCode: "DataDictionaryEntry",
              $exps: {
                _hidden: "_.get($page.getScope('dictionariesLayout-scope'), 'vars.activeRecord.level') !== 'user'",
              },
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
