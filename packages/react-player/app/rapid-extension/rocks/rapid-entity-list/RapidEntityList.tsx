import type { Rock, RockChildrenConfig, RockConfig, RockEvent } from "@ruijs/move-style";
import { renderRock, renderRockChildren } from "@ruijs/react-renderer";
import RapidEntityListMeta from "./RapidEntityListMeta";
import type { RapidEntityListRockConfig, RapidEntityListState } from "./rapid-entity-list-types";
import { filter, find, forEach, map, set, uniq } from "lodash";
import rapidAppDefinition from "~/rapidAppDefinition";
import { generateRockConfigOfError } from "~/rock-generators/generateRockConfigOfError";
import type { RapidFieldType, RapidToolbarRockConfig } from "@ruijs/react-rapid-rocks";
import type { EntityStore, EntityStoreConfig } from "~/rapid-extension/stores/entity-store";
import type { SdRpdEntity, SdRpdField } from "~/types/sd-rapid-types";

const fieldTypeToDisplayRockTypeMap: Record<RapidFieldType, string> = {
  text: "rapidTextRenderer",
  integer: "rapidTextRenderer", // TODO: should use rapidNumberRenderer
  long: "rapidTextRenderer",
  float: "rapidTextRenderer",
  double: "rapidTextRenderer",
  boolean: "rapidBoolRenderer",
  date: "rapidDateTimeRenderer",
  time: "rapidDateTimeRenderer",
  datetime: "rapidDateTimeRenderer",
  datetimetz: "rapidDateTimeRenderer",
  option: "rapidReferenceRenderer",
  relation: "rapidObjectRenderer",
  json: "rapidJsonRenderer",
};

const defaultDisplayPropsOfFieldType: Record<string, Record<string, any>> = {
  date: {
    format: "YYYY-MM-DD",
  },

  datetime: {
    format: "YYYY-MM-DD HH:mm:ss",
  },

  boolean: {
    trueText: "是",
    falseText: "否",
    defaultText: "-",
  }
}

export default {
  onResolveState(props, state) {
    return {
      selectedIds: [],
    }
  },

  onInit(context, props) {
    const { entities } = rapidAppDefinition;
    const entityCode = props.entityCode;
    if (!entityCode) {
      return;
    }

    const mainEntity = find(entities, item => item.code === entityCode);
    if (!mainEntity) {
      return;
    }

    const dataSourceCode = props.dataSourceCode || "list";
    if (!context.scope.stores[dataSourceCode]) {
      const { columns, pageSize } = props;
      const properties: string[] = uniq(props.queryProperties || [
        'id',
        ...map(filter(columns, column => !!column.code), column => column.code),
        ...props.extraProperties || [],
      ]);
      const listDataStoreConfig: EntityStoreConfig = {
        type: "entityStore",
        name: dataSourceCode,
        entityModel: mainEntity,
        fixedFilters: props.fixedFilters,
        properties,
        orderBy: props.orderBy || [
          {
            field: 'id',
          }
        ],
        pagination: pageSize > 0 ? {
          limit: pageSize,
          offset: ((props.pageNum || 1) - 1) * pageSize,
        } : undefined,
        $exps: pageSize > 0 ? {
          "pagination.limit": `${pageSize}`,
          "pagination.offset": `(($scope.vars['stores-${dataSourceCode}-pageNum'] || 1) - 1) * ${pageSize}`,
        } : undefined,
      };
      context.scope.addStore(listDataStoreConfig);
    }
  },

  onReceiveMessage(message, state, props) {
    if (message.name === "refreshView") {
      state.scope.stores[props.dataSourceCode]?.loadData();
    }
  },

  Renderer(context, props, state) {
    const { entities, dataDictionaries } = rapidAppDefinition;
    const entityCode = props.entityCode;
    let mainEntity: SdRpdEntity | undefined;

    if (entityCode) {
      mainEntity = find(entities, item => item.code === entityCode);
      if (!mainEntity) {
        const errorRockConfig = generateRockConfigOfError(new Error(`Entitiy with code '${entityCode}' not found.`))
        return renderRock({context, rockConfig: errorRockConfig});
      }
    }

    const dataSourceCode = props.dataSourceCode || "list";
    const tableColumnRocks: RockConfig[] = [];

    props.columns.forEach((column) => {
      let cell: RockConfig | RockConfig[] | null = null;

      let rpdField: SdRpdField | undefined;
      if (mainEntity) {
        rpdField = find(mainEntity.fields, { code: column.code });
        if (!rpdField) {
          console.warn(`Unknown field code '${column.code}'`);
        }
      }

      if (!column.title && rpdField) {
        column.title = rpdField.name;
      }

      if (column.cell) {
        cell = column.cell;
      } else if (column.columnType === "link") {
        const linkUrl: string | undefined = column.rendererProps?.url;
        const linkText: string | undefined = column.rendererProps?.text;
        if (linkUrl) {
          cell = {
            $type: "anchor",
            href: linkUrl,
            children: {
              $type: "text",
              $exps: {
                text: linkText ? `$rui.execVarText('${linkText}', $slot.record)` : "$slot.value",
              },
            },
            $exps: {
              href: `$rui.execVarText('${linkUrl}', $slot.record)`,
            }
          };
        }
      } else if (column.columnType === "auto") {
        let fieldType = column.fieldType || rpdField?.type || "text";
        let rendererType = column.rendererType || fieldTypeToDisplayRockTypeMap[fieldType] || "rapidTextRenderer";
        let defaultRendererProps: any = defaultDisplayPropsOfFieldType[fieldType] || {};
        let fieldTypeRelatedRendererProps: any = {};
        if (rpdField) {
          if (fieldType === "option") {
            const dataDictionaryCode = rpdField.dataDictionary;
            let dataDictionary = find(dataDictionaries, {code: dataDictionaryCode})!; 
            fieldTypeRelatedRendererProps = {
              list: dataDictionary.entries,
              itemRenderer: {
                $type: "rapidDictionaryEntryRenderer",
              },
              valueFieldName: "value",
              textFieldName: "name",
            };
          } else if (fieldType === "relation") {
            if (rpdField.relation === "many") {
              rendererType = "rapidArrayRenderer";
            } else {
              rendererType = "rapidObjectRenderer";
            }
          }
        }

        cell = {
          $type: rendererType,
          ...defaultRendererProps,
          ...fieldTypeRelatedRendererProps,
          ...column.rendererProps,
          $exps: {
            ...(column.rendererProps?.$exps || {}),
            value: "$slot.value",
          }
        };
      }

      const tableColumnRock: RockConfig = {
        ...column,
        $type: "rapidTableColumn",
        cell,
      };
      tableColumnRocks.push(tableColumnRock);
    })

    if (!props.hideActionsColumn) {
      forEach(props.actions, (recordActionConfig) => {
        set(recordActionConfig, "$exps.recordId", "$slot.record.id");
      });

      if (props.actions && props.actions.length) {
        const tableActionsColumnRock: RockConfig = {
          $type: "rapidTableColumn",
          title: '操作',
          code: 'id',
          key: '_actions',
          width: props.actionsColumnWidth || '150px',
          fixed: 'right',
          cell: props.actions,
        };
        tableColumnRocks.push(tableActionsColumnRock);
      }
    }

    let rowSelection = null;
    if (props.selectionMode && props.selectionMode !== "none") {
      rowSelection = {
        type: props.selectionMode === "multiple" ? "checkbox" : "radio",
        onChange: [
          {
            $action: "setVars",
            $exps: {
              [`vars.${props.$id}-selectedIds`]: "$event.args[0]",
            }
          },
          {
            $action: "handleEvent",
            eventName: "onSelectedIdsChange",
            handlers: props.onSelectedIdsChange,
            $exps: {
              args: "{selectedIds: $event.args[0], selectedRecords: $event.args[1]}",
            }
          }
        ]
      };
    }

    const tableRockConfig: RockConfig = {
      $id: `${props.$id}-table`,
      $type: "rapidTable",
      $exps: {
        dataSource: `$scope.stores.${dataSourceCode}.data?.list`,
        pagination: props.pageSize > 0 ? `{pageSize: ${props.pageSize}, current: $scope.vars["${`stores-${dataSourceCode}-pageNum`}"], total: $scope.stores.${dataSourceCode}.data?.total}` : "false",
        // "rowSelection.selectedRowKeys": `$scope.vars['${props.$id}-selectedIds']`,
      },
      size: "small",
      rowKey: "id",
      rowSelection,
      columns: tableColumnRocks,
      showHeader: props.showHeader,
      ...props.tableProps,
      convertListToTree: props.convertListToTree,
      listIdField: props.listIdField,
      listParentField: props.listParentField,
      treeChildrenField: props.treeChildrenField,
      onChange: [
        {
          $action: "script",
          script: async (event: RockEvent) => {
            const [ pagination ] = event.args;
            const store: EntityStore = event.scope.stores[dataSourceCode];
            // store.setPagination({
            //   limit: props.pageSize,
            //   offset: ((pagination.current || 1) - 1) * props.pageSize
            // });
            event.scope.setVars({
              [`stores-${dataSourceCode}-pageNum`]: pagination.current,
            })
            await store.loadData();
          }
        },
      ],
    };

    const toolbarRockConfig: RapidToolbarRockConfig = {
      $id: `${props.$id}-toolbar`,
      $type: "rapidToolbar",
      items: props.listActions,
      extras: props.extraActions,
      dataSourceCode: props.dataSourceCode,
    }

    const rockChildrenConfig: RockChildrenConfig = [
      toolbarRockConfig,
      tableRockConfig,
    ];

    return renderRockChildren({context, rockChildrenConfig});
  },

  ...RapidEntityListMeta
} as Rock<RapidEntityListRockConfig, RapidEntityListState>;