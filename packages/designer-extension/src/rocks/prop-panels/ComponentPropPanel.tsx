import { RockConfig, RockConfigBase, Rock, RockPropSetter, RockInstanceContext, RockEventHandlerConfig } from "@ruiapp/move-style";
import { renderRock, renderRockChildren } from "@ruiapp/react-renderer";
import { useMemo } from "react";

export interface ComponentPropPanelRockConfig extends RockConfigBase {
  title?: string;
  componentConfig: RockConfig;
  setters: RockPropSetter[];
  onPropValueChange?: RockEventHandlerConfig;
  onPropExpressionChange?: RockEventHandlerConfig;
  onPropExpressionRemove?: RockEventHandlerConfig;
  onSettingPropExpression?: RockEventHandlerConfig;
}

export default {
  $type: "componentPropPanel",

  Renderer(context, props: ComponentPropPanelRockConfig) {
    const { $id, componentConfig, setters, onPropValueChange, onPropExpressionChange, onPropExpressionRemove, onSettingPropExpression } = props;

    const rockChildrenConfig: RockConfig[] = useMemo(() => {
      return setters.map((setter, index) => {
        return {
          ...setter,
          ...{
            $id: `${$id}-${index}`,
            componentConfig: props.componentConfig,
          },
          onPropValueChange: onPropValueChange,
          onPropExpressionChange: onPropExpressionChange,
          onPropExpressionRemove: onPropExpressionRemove,
          onSettingPropExpression: onSettingPropExpression,
        };
      });
    }, [$id, setters, componentConfig]);

    let panelTitle = props.title;
    if (!panelTitle) {
      const rockMeta: Rock = context.framework.getComponent(componentConfig.$type);
      panelTitle = rockMeta.name || rockMeta.$type;
    }

    return (
      <div>
        <h3>{panelTitle}</h3>
        {renderRockChildren({ context, rockChildrenConfig })}
      </div>
    );
  },
} as Rock;

export function renderComponentPropPanel(context: RockInstanceContext, props: Omit<ComponentPropPanelRockConfig, "$type">) {
  let rockConfig: ComponentPropPanelRockConfig = {
    ...props,
    $type: "componentPropPanel",
  } as any;

  return renderRock({ context, rockConfig });
}
