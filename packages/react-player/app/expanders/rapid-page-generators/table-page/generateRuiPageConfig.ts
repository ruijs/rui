import type { IStore, PageConfig, RockConfig, RockEvent, StoreConfig } from "@ruijs/move-style";
import type { SdRpdSearchFormItem, SdRpdTablePage, SdRpdDataDictionary, SdRpdEntity } from "~/proton";
import { each, find, forEach, map } from "lodash";
import type { GenerateRuiPageConfigOption, PageRockConfigGenerationContext } from "~/expanders/rui-page-generator-types";
import { generateRuiPageConfigOfError } from "../../../rock-generators/generateRuiPageConfigOfError";
import { generateAntdIcon } from "../../../rock-generators/generateAntdIcon";
import { Modal, message } from "antd";
import rapidApi from "~/rapidApi";
import { generateRockConfigForPageBlocks } from "../rapid-page-generator";
import { SearchFormFilterConfiguration } from "@ruijs/react-rapid-rocks";
import { EntityStoreConfig } from "~/rapid-extension/stores/entity-store";


export interface GenerateSearchFormControlOption {
  sdRpdSearchFormItem: SdRpdSearchFormItem;
  mainEntity: SdRpdEntity;
  entities: SdRpdEntity[];
  dataDictionaries: SdRpdDataDictionary[]; 
}

export function generateSearchFormControlConfigForOptionProperty(option: GenerateSearchFormControlOption) {
  const { sdRpdSearchFormItem, mainEntity } = option;

  const rpdField = find(mainEntity.fields, {code: sdRpdSearchFormItem.code})!;
  const dataDictionaryCode = rpdField.dataDictionary;
  let dataDictionary = find(option.dataDictionaries, {code: dataDictionaryCode});

  const searchFormControlConfig: RockConfig = {
    $type: "antdSelect",
    options: dataDictionary ? map(dataDictionary.entries, item => { return { value: item.value, label: item.name }}) : [],
    allowClear: !sdRpdSearchFormItem.required,
    placeholder: sdRpdSearchFormItem.placeholder,
  };
  return searchFormControlConfig;
}

export function generateSearchFormControlConfigForRelationProperty(context: PageRockConfigGenerationContext, option: GenerateSearchFormControlOption) {
  const { sdRpdSearchFormItem, mainEntity, entities } = option;

  const rpdEntity = find(mainEntity.fields, {code: sdRpdSearchFormItem.code})!;
  const targetEntity = find(entities, {singularCode: rpdEntity.targetSingularCode})!;

  const listDataStoreName = `searchFormItemList-${sdRpdSearchFormItem.code}`;
  const listDataStoreConfig: EntityStoreConfig = {
    type: "entityStore",
    name: listDataStoreName,
    entityModel: targetEntity,
    orderBy: [
      {
        field: "id",
      },
    ],
  };

  context.dataStores.push(listDataStoreConfig);

  const searchFormControlConfig: RockConfig = {
    $type: "antdSelect",
    $exps: {
      options: `_.map($scope.stores['${listDataStoreName}'].data?.list, function (item) { return {label: item.name, value: item.id}})`,
    },
    allowClear: !sdRpdSearchFormItem.required,
    placeholder: sdRpdSearchFormItem.placeholder,
  };
  return searchFormControlConfig;
}

const formItemTypeToFormControlTypeMap: Record<string, string> = {
  text: "antdInput",
  switch: "antdSwitch",
  number: "antdInputNumber",
  dateRange: "antdInput",
  time: "antdDatePicker",
  dateTimeRange: "antdRangePicker",
  select: "",
}

export function generateSearchFormControlConfig(context: PageRockConfigGenerationContext, option: GenerateSearchFormControlOption) {
  const { sdRpdSearchFormItem: formItem, mainEntity } = option;

  const rpdEntity = find(mainEntity.fields, {code: formItem.code})!;
  if (rpdEntity.type === "option") {
    return generateSearchFormControlConfigForOptionProperty(option);
  } else if (rpdEntity.type === "relation") {
    return generateSearchFormControlConfigForRelationProperty(context, option);
  } else {
    const searchFormControlConfig: RockConfig = {
      $type: formItem.formControlType || formItemTypeToFormControlTypeMap[formItem.type] || "antdInput",
      ...formItem.formControlProps,
    };
    return searchFormControlConfig;
  }
}

export function generateRuiPageConfig(option: GenerateRuiPageConfigOption<SdRpdTablePage>) {
  const { sdPage, entities, dataDictionaries } = option;
  const searchFormConfig = sdPage.searchForm;
  const tableConfig = sdPage.table;
  const mainEntityCode = tableConfig.entityCode;
  const mainEntity = find(entities, item => item.code === mainEntityCode);
  if (!mainEntity) {
    return generateRuiPageConfigOfError(new Error(`Entitiy with code '${mainEntityCode}' not found.`))
  }

  const ruiConfigGenerationContext: PageRockConfigGenerationContext = {
    dataStores: [],
    view: [],
  };

  const dataSourceCode = "list";

  const filterConfigurations: SearchFormFilterConfiguration[] = [];
  each(sdPage.searchForm?.items, formItem => {
    filterConfigurations.push({
      code: formItem.code,
      filterMode: formItem.filterMode,
      filterFields: formItem.filterFields,
    });
  });

  const listDataStoreConfig: EntityStoreConfig = {
    type: "entityStore",
    name: dataSourceCode,
    entityModel: mainEntity,
    orderBy: [
      {
        field: 'id',
      }
    ],
    $exps: {
      "pagination": "{offset: ($scope.vars.page - 1) * $scope.vars.pageSize, limit: $scope.vars.pageSize }",
      "filters": `$functions.searchParamsToFilters(${JSON.stringify(filterConfigurations)}, $scope.vars)`,
    }
  };

  const searchFormItemRocks: RockConfig[] = [];
  if (searchFormConfig && searchFormConfig.items) {
    searchFormConfig.items.forEach((formItemConfig) => {
      const formItemWrapRock: RockConfig = {
        $type: "antdCol",
        span: 8,
        children: {
          $type: "antdFormItem",
          name: formItemConfig.code,
          label: formItemConfig.label,
          children: generateSearchFormControlConfig(ruiConfigGenerationContext, {
            sdRpdSearchFormItem: formItemConfig,
            mainEntity,
            entities,
            dataDictionaries,
          }),
        },
      };

      searchFormItemRocks.push(formItemWrapRock);
    })
  }

  const searchFormRockConfig: RockConfig = {
    $type: "antdForm",
    $id: "searchForm",
    labelCol: { span: 8 },
    wrapperCol: { span: 24},
    children: [
      {
        $type: "antdRow",
        gutter: 24,
        children: [
          ...searchFormItemRocks,
          {
            $type: "antdCol",
            span: 8,
            children: [
              {
                $type: "antdButton",
                type: "primary",
                htmlType: "submit",
                children: {
                  $type: "text",
                  text: "搜索",
                },
              }
            ]
          },
        ]
      },
    ],
    onFinish: [
      {
        $action: "script",
        script: (event: any) => {
          const { scope } = event;
          const searchParams = Object.assign({}, event.args[0], { page: 1});
          scope.setVars(searchParams);
          const store: IStore = scope.stores[dataSourceCode];
          store.setPropertyExpression("filters", `$functions.searchParamsToFilters(${JSON.stringify(filterConfigurations)}, $scope.vars)`);
          store.loadData();
        }
      }
    ],
    $exps: {
      initialValues: "{code: $scope.vars.code}",
    }
  };

  const toolbarItemRocks: RockConfig[] = [];
  const toolbarConfig = sdPage.toolbar;
  forEach(toolbarConfig?.items, (toolbarItem) => {
    const toolbarItemRock: RockConfig = {
      $type: "antdButton",
      type: toolbarItem.actionStyle,
      danger: toolbarItem.danger,
      icon: toolbarItem.icon ? generateAntdIcon({name: toolbarItem.icon}) : null,
      children: {
        $type: "htmlElement",
        htmlTag: "span",
        children: {
          $type: "text",
          text: toolbarItem.label,
        },
      },
    };

    if (toolbarItem.actionType === "pageLink") {
      toolbarItemRock.href = `/pages/${toolbarItem.pageCode}`;
    } else if (toolbarItem.actionType === "link") {
      toolbarItemRock.href = toolbarItem.url;
    }
    toolbarItemRocks.push(toolbarItemRock);
  })


  const tableColumnRocks: RockConfig[] = [];
  tableConfig.columns.forEach((column) => {
    let cell: RockConfig | RockConfig[] | null = null;

    if (column.columnType === "link") {
      const linkUrl: string | undefined = column.rendererProps?.url;
      if (linkUrl) {
        cell = {
          $type: "anchor",
          href: linkUrl,
          children: {
            $type: "text",
            $exps: {
              text: "$slot.value",
            },
          },
          $exps: {
            href: `$rui.execVarText('${linkUrl}', $slot.record)`,
          }
        };
      }
    } else {
      const rpdField = find(mainEntity.fields, { code: column.code });
      if (rpdField) {
        if (rpdField.type === "datetime") {
          cell = {
            $type: "rapidDateTimeRenderer",
            $exps: {
              value: "$slot.value",
            }
          };
        } else if (rpdField.type === "boolean") {
          cell = {
            $type: "rapidBoolRenderer",
            trueText: "是",
            falseText: "否",
            defaultText: "-",
            $exps: {
              value: "$slot.value",
            }
          }; 
        } else if (rpdField.type === "option") {
          const dataDictionaryCode = rpdField.dataDictionary;
          let dataDictionary = find(dataDictionaries, {code: dataDictionaryCode})!; 
          cell = {
            $type: "rapidReferenceRenderer",
            list: dataDictionary.entries,
            valueFieldName: "value",
            textFieldName: "name",
            $exps: {
              value: "$slot.value",
            }
          };
        }
      }
    }
    

    const tableColumnRock: RockConfig = {
      $type: "rapidTableColumn",
      title: column.title,
      dataIndex: column.code,
      key: column.code,
      width: column.width,
      cell,
    };
    tableColumnRocks.push(tableColumnRock);
  })

  let cell: RockConfig | RockConfig[] | null = null;

  if (tableConfig.actions && tableConfig.actions.length) {
    cell = [];
    for (const action of tableConfig.actions) {
      const actionRock: RockConfig = {
        $type: 'anchor',
        className: "rui-table-action-link",
        children: {
          $type: "text",
          text: action.actionText,
        },
        $exps: {
          "data-id": "$slot.record.id",
        },
      };

      if (action.actionType === "delete") {
        actionRock.onClick = {
          $action: "script",
          script: (event: RockEvent) => {
            Modal.confirm({
              title: action.confirmText,
              onOk: async () => {
                try {
                  await rapidApi.delete(`${mainEntity.namespace}/${mainEntity.pluralCode}/${event.sender.$slot.record.id}`)
                  message.info("删除成功。");
                  event.scope.loadStoreData("list");
                } catch (err: any) {
                  message.error(`删除失败：${err.message}`);
                }
              },
            });
          }
        }
      } else if (action.actionType === "link") {
        if (action.onAction) {
          actionRock.onClick = action.onAction;
        }
      }

      if (action.$exps) {
        Object.assign(actionRock.$exps!, action.$exps);
      }
      cell.push(actionRock);
    }

    const tableActionsColumnRock: RockConfig = {
      $type: "rapidTableColumn",
      title: '操作',
      dataIndex: 'id',
      key: '_actions',
      width: '200px',
      cell,
    };
    tableColumnRocks.push(tableActionsColumnRock);
  }

  const tableRockConfig: RockConfig = {
    $id: "table",
    $type: "rapidTable",
    $exps: {
      dataSource: "$scope.stores.list.data?.list",
      pagination: "{pageSize: $scope.vars.pageSize, current: $scope.vars.page, total: $scope.stores.list.data?.total}"
    },
    size: "small",
    rowKey: "id",
    rowSelection: {
      type: "checkbox",
    },
    columns: tableColumnRocks,
    onChange: [
      {
        $action: "script",
        script: (event: any) => {
          const [ pagination ] = event.args;
          console.log("handle table.onChange event.")
          event.scope.setVars({
            page: pagination.current,
          })
        }
      },
      {
        $action: "script",
        script: (event: any) => {
          event.scope.loadStoreData("list");
        }
      }
    ],
  };

  // TODO: should move this into rui-page-generator.ts
  generateRockConfigForPageBlocks(ruiConfigGenerationContext, sdPage, {entities, dictionaries: dataDictionaries})

  const ruiPageConfig: PageConfig = {
    $id: sdPage.code,
    initialVars: {
      page: 1,
      pageSize: 5,
    },
    stores: [
      listDataStoreConfig,
      ...ruiConfigGenerationContext.dataStores,
    ],
    view: [
      {
        $type: "box",
        $id: "searchFormContainer",
        className: "rui-page-section",
        children: [
          searchFormRockConfig,
        ],
      },
      {
        $type: "box",
        className: "rui-page-section",
        children: [
          {
            $id: "tableToolbar",
            $type: "box",
            className: "rui-toolbar",
            children: toolbarItemRocks,
          },
          {
            $id: "showControl",
            $type: "show",
            $exps: {
              when: "!!$scope.stores.list.data?.list",
            },
            fallback: {
              $type: "antdSpin",
            },
            children: [
              tableRockConfig,
            ],
          },
        ],
      },
      ...ruiConfigGenerationContext.view,
    ],
  };

  return ruiPageConfig;
}