import { RockConfig, RockConfigBase, Rock } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { useMemo } from "react";

export interface ComponentPropPanelProps extends RockConfigBase {
  title?: string;
  componentConfig: RockConfig;
  setters: RockConfig[];
}

export default {
  $type: "componentEventHandlerSetterGroup",

  Renderer(context, props: ComponentPropPanelProps) {
    const { componentConfig, setters } = props;
    const rockChildrenConfig: RockConfig[] = useMemo(() => {
      return setters.map((setter) => {
        return Object.assign({}, setter, {
          $id: `${props.$id}-${setter.eventName}`,
          $type: "scriptEventHandlerSetter",
          componentConfig: props.componentConfig,
        });
      });
    }, [setters, componentConfig]);

    let groupTitle = props.title;
    if (!groupTitle) {
      if(componentConfig.$type) {
        const rockMeta: Rock = context.framework.getComponent(componentConfig.$type);
        groupTitle = rockMeta.name || rockMeta.$type;
      } else {
        groupTitle = "事件";
      }
    }

    return (
      <div>
        <h3>{groupTitle}</h3>
        {renderRockChildren({ context, rockChildrenConfig })}
      </div>
    );
  },
} as Rock;
