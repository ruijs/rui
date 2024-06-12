import { RockConfig, RockConfigBase, Rock, RockPropSetter, unitOptions } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { useMemo } from "react";

const setters: RockPropSetter[] = [
  {
    $type: "selectPropSetter",
    label: "position",
    propName: "position",
    options: [
      { label: "relative", value: "relative" },
      { label: "absolute", value: "absolute" },
      { label: "fixed", value: "fixed" },
      { label: "inherit", value: "inherit" },
    ],
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "top",
    propName: "top",
    unitOptions,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "right",
    propName: "right",
    unitOptions,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "bottom",
    propName: "bottom",
    unitOptions,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "left",
    propName: "left",
    unitOptions,
  },
];

export interface PositionPropPanelProps extends RockConfigBase {
  componentConfig: RockConfig;
}

export default {
  $type: "positionPropPanel",

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
        <h3>Position</h3>
        {renderRockChildren({ context, rockChildrenConfig })}
      </div>
    );
  },
} as Rock;
