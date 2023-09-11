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
      code: 'version',
    },
    {
      type: 'auto',
      code: 'state',
    },
  ],
};

const secondaryFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: 'auto',
      code: 'orderNum',
    },
    {
      type: 'auto',
      code: 'process',
    },
    {
      type: 'auto',
      code: 'standardCycleTime',
    },
  ],
};

const page: PrRapidPage = {
  code: 'base_prod_flow_list',
  name: '工艺路线列表',
  title: '工艺路线',
  templateType: 'rapidPage',
  view: [
    {
      $type: "sonicMainSecondaryLayout",
      mainTitle: "工艺路线",
      mainColSpan: 8,
      secondaryTitle: "工序",
      secondaryColSpan: 16,
      main: {
        $type: "sonicEntityList",
        entityCode: "BaseProdFlow",
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
            field: "name",
          },
        ],
        columns: [
          {
            type: 'auto',
            code: 'name',
          },
          {
            type: 'auto',
            code: 'version',
            width: '80px',
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
            $type: "sonicRecordActionDeleteEntity",
            code: 'delete',
            actionType: 'delete',
            actionText: '删除',
            dataSourceCode: "list",
            entityCode: "BaseProdFlow",
          },
        ],
        actionsColumnWidth: "80px",
        newForm: cloneDeep(mainFormConfig),
        editForm: cloneDeep(mainFormConfig),
      },
      secondary: [
        {
          $type: "sonicEntityList",
          entityCode: "BaseProdFlowProcess",
          viewMode: "table",
          selectionMode: "none",
          actionsColumnWidth: "80px",
          fixedFilters: [
            {
              field: "flow_id",
              operator: "eq",
              value: "",
            }
          ],
          orderBy: [
            {
              field: "orderNum",
            },
          ],
          pageSize: -1,
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
              code: 'orderNum',
              width: '100px',
            },
            {
              type: 'auto',
              code: 'process',
              rendererProps: {
                format: "{{name}}",
              }
            },
            {
              type: 'auto',
              code: 'standardCycleTime',
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
              entityCode: "BaseProdFlowProcess",
            },
          ],
          newForm: cloneDeep(secondaryFormConfig),
          editForm: cloneDeep(secondaryFormConfig),
          $exps: {
            "_hidden": "!$scope.vars.activeId",
            "fixedFilters[0].value": "$scope.vars.activeId",
            "newForm.fixedFields.flow_id": "$scope.vars.activeId"
          },
        },
      ]
    },
  ],
};

export default page;
