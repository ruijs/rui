import { cloneDeep } from 'lodash';
import type { RapidEntityFormRockConfig } from '~/rapid-extension/rocks';
import type { PrRapidPage } from '~/types/pr-types';

const flowFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: 'auto',
      code: 'version',
    },
    {
      type: 'auto',
      code: 'state',
    },
    {
      type: 'auto',
      code: 'publishState',
    },
  ],
};

const flowProcessFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: 'auto',
      code: 'orderNum',
    },
    {
      type: 'auto',
      code: 'process',
      formControlProps: {
        listTextFormat: '{{code}} {{name}}',
      },
    },
    {
      type: 'auto',
      code: 'aliasName',
    },
    {
      type: 'auto',
      code: 'standardCycleTime',
    },
  ],
};


const breakdownFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: 'auto',
      code: 'version',
    },
    {
      type: 'auto',
      code: 'amount',
    },
    {
      type: 'auto',
      code: 'unit',
    },
    {
      type: 'auto',
      code: 'state',
    },
  ],
};


const breakdownPartFormConfig: Partial<RapidEntityFormRockConfig> = {
  items: [
    {
      type: 'auto',
      code: 'orderNum',
    },
    {
      type: 'auto',
      code: 'subMaterial',
    },
    {
      type: 'auto',
      code: 'amount',
    },
    {
      type: 'auto',
      code: 'unit',
    },
  ],
};


const page: PrRapidPage = {
  code: 'base_material_details',
  name: '物料详情',
  title: '物料详情',
  templateType: 'rapidPage',
  view: [
    {
      $type: 'rapidEntityForm',
      entityCode: 'BaseMaterial',
      mode: 'view',
      column: 3,
      items: [
        {
          type: 'auto',
          code: 'category',
          valueRendererProps: {
            format: "{{name}}",
          },
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
          code: 'state',
        },
        {
          type: 'auto',
          code: 'description',
        },
      ],
      $exps: {
        entityId: "$rui.parseQuery().id",
      }
    },
    {
      $type: "antdTabs",
      items: [
        {
          key: "flows",
          label: "工艺路线",
          children: [
            {
              $id: "flowsLayout",
              $type: "sonicMainSecondaryLayout",
              mainTitle: "工艺路线",
              mainColSpan: 8,
              secondaryTitle: "工序",
              secondaryColSpan: 16,
              main: {
                $type: "sonicEntityList",
                entityCode: "BaseMaterialFlow",
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
                fixedFilters: [
                  {
                    field: "material_id",
                    operator: "eq",
                    value: "",
                  }
                ],
                orderBy: [
                  {
                    field: "version",
                  },
                ],
                columns: [
                  {
                    columnType: 'auto',
                    code: 'version',
                  },
                  {
                    columnType: 'auto',
                    code: 'state',
                    width: '100px',
                  },
                  {
                    columnType: 'auto',
                    code: 'publishState',
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
                    entityCode: "BaseMaterialFlow",
                  },
                ],
                actionsColumnWidth: "80px",
                newForm: cloneDeep(flowFormConfig),
                editForm: cloneDeep(flowFormConfig),
                $exps: {
                  "fixedFilters[0].value": "$rui.parseQuery().id",
                  "newForm.fixedFields.material_id": "$rui.parseQuery().id",
                },
              },
              secondary: [
                {
                  $id: "processList",
                  $type: "sonicEntityList",
                  entityCode: "BaseMaterialFlowProcess",
                  viewMode: "table",
                  selectionMode: "none",
                  actionsColumnWidth: "80px",
                  fixedFilters: [
                    {
                      field: "material_flow_id",
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
                      $exps: {
                        "_hidden": "$page.getScope('flowsLayout-scope').vars.activeRecord?.publishState !== 'draft'",
                      }
                    },
                  ],
                  columns: [
                    {
                      columnType: 'auto',
                      code: 'orderNum',
                      width: '100px',
                    },
                    {
                      columnType: 'auto',
                      code: 'process',
                      rendererProps: {
                        format: "{{name}}",
                      }
                    },
                    {
                      columnType: 'auto',
                      code: 'aliasName',
                      width: '200px',
                    },
                    {
                      columnType: 'auto',
                      code: 'inputs',
                    },
                    {
                      columnType: 'auto',
                      code: 'outputs',
                    },
                    {
                      columnType: 'auto',
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
                      $exps: {
                        "_hidden": "$page.getScope('flowsLayout-scope').vars.activeRecord?.publishState !== 'draft'",
                      }
                    },
                    {
                      $type: "sonicRecordActionDeleteEntity",
                      code: 'delete',
                      actionType: 'delete',
                      actionText: '删除',
                      dataSourceCode: "list",
                      entityCode: "BaseMaterialFlowProcess",
                      $exps: {
                        "_hidden": "$page.getScope('flowsLayout-scope').vars.activeRecord?.publishState !== 'draft'",
                      }
                    },
                  ],
                  newForm: cloneDeep(flowProcessFormConfig),
                  editForm: cloneDeep(flowProcessFormConfig),
                  $exps: {
                    "_hidden": "!$scope.vars.activeId",
                    "fixedFilters[0].value": "$scope.vars.activeId",
                    "newForm.fixedFields.material_flow_id": "$scope.vars.activeId",
                    "hideActionsColumn": "$scope.vars.activeRecord?.publishState !== 'draft'",
                  },
                },
              ]
            },
          ]
        },
        {
          key: "breakdowns",
          label: "下级物料",
          children: [
            {
              $id: "breakdownsLayout",
              $type: "sonicMainSecondaryLayout",
              mainTitle: "BOM版本",
              mainColSpan: 8,
              secondaryTitle: "下级物料",
              secondaryColSpan: 16,
              main: {
                $type: "sonicEntityList",
                entityCode: "BaseMaterialBreakdown",
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
                fixedFilters: [
                  {
                    field: "material_id",
                    operator: "eq",
                    value: "",
                  }
                ],
                orderBy: [
                  {
                    field: "version",
                  },
                ],
                columns: [
                  {
                    columnType: 'auto',
                    code: 'version',
                  },
                  {
                    columnType: 'auto',
                    code: 'amount',
                  },
                  {
                    columnType: 'auto',
                    code: 'unit',
                    rendererProps: {
                      format: "{{name}}",
                    },
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
                    $type: "sonicRecordActionDeleteEntity",
                    code: 'delete',
                    actionType: 'delete',
                    actionText: '删除',
                    dataSourceCode: "list",
                    entityCode: "BaseMaterialBreakdown",
                  },
                ],
                actionsColumnWidth: "80px",
                newForm: cloneDeep(breakdownFormConfig),
                editForm: cloneDeep(breakdownFormConfig),
                $exps: {
                  "fixedFilters[0].value": "$rui.parseQuery().id",
                  "newForm.fixedFields.material_id": "$rui.parseQuery().id",
                },
              },
              secondary: [
                {
                  $id: "breakdownPartList",
                  $type: "sonicEntityList",
                  entityCode: "BaseMaterialBreakdownPart",
                  viewMode: "table",
                  selectionMode: "none",
                  actionsColumnWidth: "80px",
                  fixedFilters: [
                    {
                      field: "breakdown_id",
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
                      columnType: 'auto',
                      code: 'orderNum',
                      width: '100px',
                    },
                    {
                      columnType: 'auto',
                      code: 'subMaterial',
                      rendererType: "rapidLinkRenderer",
                      rendererProps: {
                        linkText: "{{name}}",
                        linkUrl: "/pages/base_material_details?id={{id}}",
                        // format: "{{name}}",
                      },
                    },
                    {
                      columnType: 'auto',
                      code: 'amount',
                      width: '100px',
                    },
                    {
                      columnType: 'auto',
                      code: 'unit',
                      rendererProps: {
                        format: "{{name}}",
                      },
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
                      entityCode: "BaseMaterialBreakdownPart",
                    },
                  ],
                  newForm: cloneDeep(breakdownPartFormConfig),
                  editForm: cloneDeep(breakdownPartFormConfig),
                  $exps: {
                    "_hidden": "!$scope.vars.activeId",
                    "fixedFilters[0].value": "$scope.vars.activeId",
                    "newForm.fixedFields.breakdown_id": "$scope.vars.activeId",
                  },
                },
              ]
            },
          ]
        },
      ]
    }
  ],
};

export default page;
