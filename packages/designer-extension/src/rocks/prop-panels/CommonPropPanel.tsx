import { RockConfig, RockConfigBase, Rock, RockPropSetter, unitOptions } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { useMemo } from "react";

const setters: RockPropSetter[] = [
  {
    $type: "textPropSetter",
    label: "$id",
    propName: "$id",
  },

  {
    $type: "textPropSetter",
    label: "$name",
    propName: "$name",
  },

  {
    $type: "switchPropSetter",
    label: "hidden",
    propName: "_hidden",
  },
];

export interface PositionPropPanelProps extends RockConfigBase {
  componentConfig: RockConfig;
}

export default {
  $type: "commonPropPanel",

  Renderer(context, props: PositionPropPanelProps) {
    const { componentConfig } = props;

    const rockChildrenConfig: RockConfig[] = useMemo(() => {
      return setters.map((setter) => {
        return Object.assign({}, setter, {
          $id: `${props.$id}-${setter.label}`,
          componentConfig: props.componentConfig,
        });
      });
    }, [setters, componentConfig]);

    return (
      <div>
        <h3>common</h3>
        {renderRockChildren({ context, rockChildrenConfig })}
      </div>
    );
  },
} as Rock;
