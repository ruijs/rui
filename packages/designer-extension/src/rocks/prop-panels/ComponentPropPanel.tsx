import { RockConfig, RockConfigBase, Rock, RockPropSetter } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { useMemo } from "react";


export interface ComponentPropPanelProps extends RockConfigBase {
  title?: string;
  componentConfig: RockConfig;
  setters: RockPropSetter[];
}

export default {
  $type: "componentPropPanel",

  Renderer(context, props: ComponentPropPanelProps) {
    const { componentConfig, setters } = props;
    console.debug(`[RUI][Designer] rendering componentPropPanel.`)

    const rockChildrenConfig: RockConfig[] = useMemo(() => {
      return setters.map((setter) => {
        return Object.assign({}, setter, {
          $id: `${props.$id}-${setter.label}`,
          componentConfig: props.componentConfig,
        });
      });
    }, [setters, componentConfig]);

    let panelTitle = props.title;
    if (!panelTitle) {
      const rockMeta: Rock = context.framework.getComponent(componentConfig.$type)
      panelTitle = rockMeta.name || rockMeta.$type;
    }

    return <div>
      <h3>{panelTitle}</h3>
      {
        renderRockChildren({context, rockChildrenConfig})
      }
    </div>

  },
} as Rock;