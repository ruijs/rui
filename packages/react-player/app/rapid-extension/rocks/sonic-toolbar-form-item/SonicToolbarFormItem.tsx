import type { IStore, Rock, RockEvent } from "@ruijs/move-style";
import RapidToolbarFormItemMeta from "./SonicToolbarFormItemMeta";
import { renderRock } from "@ruijs/react-renderer";
import type { SonicToolbarFormItemRockConfig } from "./sonic-toolbar-form-item-types";
import type { SearchFormFilterConfiguration } from "@ruijs/react-rapid-rocks/src/rapid-types";
import type { RapidFormItemRockConfig } from "@ruijs/react-rapid-rocks/src/rapid-form-item/rapid-form-item-types";


export default {
  Renderer(context, props) {
    const actionEventName = props.actionEventName || "onClick";

    const rockConfig: RapidFormItemRockConfig = {
      $type: "rapidFormItem",
      code: props.code,
      type: props.formItemType,
      label: props.label,
      placeholder: props.placeholder,
      filterMode: props.filterMode,
      filterFields: props.filterFields,
      formControlType: props.formControlType,
      formControlProps: {
        ...props.formControlProps,
        [actionEventName]: [
          {
            $action: "script",
            script: (event: RockEvent) => {
              const { scope } = event;
              const dataSourceCode = props.dataSourceCode || "list";
              // 设置搜索变量
              scope.setVars({
                [props.code]: event.args[0],
                [`stores-${dataSourceCode}-pageNum`]: 1,
              });

              const store: IStore = scope.stores[dataSourceCode];
              // 设置过滤filters
              const filterConfigurations: SearchFormFilterConfiguration[] = [];
              filterConfigurations.push({
                code: props.code,
                filterMode: props.filterMode,
                filterFields: props.filterFields,
              });
              store.setPropertyExpression("filters", `$functions.searchParamsToFilters(${JSON.stringify(filterConfigurations)}, $scope.vars)`);
              // 重新加载数据
              store.loadData();
            }
          }
        ]
      },
    };

    if (props.onAction) {
      rockConfig[actionEventName] = props.onAction;
    }
    return renderRock({context, rockConfig});
  },

  ...RapidToolbarFormItemMeta,
} as Rock<SonicToolbarFormItemRockConfig>;