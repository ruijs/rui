import { RockConfig, RockConfigBase, Rock, RockPropSetter, unitOptions } from "@ruiapp/move-style";
import { renderComponentPropPanel } from "./ComponentPropPanel";

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
    allowClear: true,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "left",
    propName: "left",
    unitOptions,
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
];

export interface PositionPropPanelRockConfig extends RockConfigBase {
  componentConfig: RockConfig;
}

export default {
  $type: "positionPropPanel",

  Renderer(context, props: PositionPropPanelRockConfig) {
    return renderComponentPropPanel(context, {
      ...props,
      title: "位置",
      setters,
    });
  },
} as Rock;
