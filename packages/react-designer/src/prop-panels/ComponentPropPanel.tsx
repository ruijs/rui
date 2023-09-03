import { RockConfig, RockConfigBase, Rock, RockPropSetter } from "@ruijs/move-style";
import { renderRockChildren } from "@ruijs/react-renderer";
import { useMemo } from "react";


export interface TextPropPanelProps extends RockConfigBase {
  componentConfig: RockConfig;
  setters: RockPropSetter[];
}

export default {
  $type: "componentPropPanel",

  Renderer(context, props: TextPropPanelProps) {
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

    return <div>
      <h3>Component: {componentConfig.$type}</h3>
      {
        renderRockChildren({context, rockChildrenConfig})
      }
    </div>

  },
} as Rock;