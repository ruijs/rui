import { cloneDeep } from 'lodash';
import type { RapidEntityFormRockConfig } from '~/rapid-extension/rocks';
import type { PrRapidPage } from '~/types/pr-types';

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
}

const page: PrRapidPage = {
  code: 'data_dictionary_details',
  name: '数据字典详情',
  templateType: 'rapidPage',
  view: [
    {
      $type: "antdTabs",
      items: [
        {
          key: "basic",
          label: "基本信息",
          children: [
            {
              $type: 'rapidEntityForm',
              entityCode: 'DataDictionary',
              mode: 'view',
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
                  type: 'auto',
                  code: 'description',
                },
              ],
              $exps: {
                entityId: "$rui.parseQuery().id",
              }
            }
          ]
        },
        {
          key: "entries",
          label: "字典项",
          children: [
            {
              $type: "sonicEntityList",
              entityCode: "DataDictionaryEntry",
              viewMode: "table",
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
                {
                  $type: "sonicToolbarRefreshButton",
                  text: "刷新",
                  icon: "ReloadOutlined",
                }
              ],
              columns: [
                {
                  columnType: 'auto',
                  code: 'value',
                  width: '250px',
                },
                {
                  columnType: 'auto',
                  code: 'name',
                  width: '250px',
                },
                {
                  columnType: 'auto',
                  code: 'description',
                },
                {
                  columnType: 'auto',
                  code: 'disabled',
                  width: '150px',
                },
                {
                  columnType: 'auto',
                  code: 'orderNum',
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
                  entityCode: "DataDictionaryEntry",
                },
              ],
              newForm: cloneDeep(entryFormConfig),
              editForm: cloneDeep(entryFormConfig),
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.dictionary_id": "$rui.parseQuery().id"
              },
            }
          ]
        },
      ]
    }
  ],
};

export default page;
