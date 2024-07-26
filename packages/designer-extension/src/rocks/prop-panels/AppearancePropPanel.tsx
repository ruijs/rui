import { RockConfig, RockConfigBase, Rock, RockPropSetter, unitOptions, lineStyleOptions } from "@ruiapp/move-style";
import { renderComponentPropPanel } from "./ComponentPropPanel";

const setters: RockPropSetter[] = [
  {
    $type: "selectPropSetter",
    label: "textAlign",
    propName: "textAlign",
    options: [
      { label: "left", value: "left" },
      { label: "center", value: "center" },
      { label: "right", value: "right" },
      { label: "justify", value: "justify" },
    ],
  },

  {
    $type: "numberWithSliderPropSetter",
    label: "opacity",
    propName: "opacity",
    defaultValue: 1,
    min: 0,
    max: 1,
    step: 0.05,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "borderWidth",
    propName: "borderWidth",
    unitOptions,
  },

  {
    $type: "textPropSetter",
    label: "borderColor",
    propName: "borderColor",
  },

  {
    $type: "selectPropSetter",
    label: "borderStyle",
    propName: "borderStyle",
    options: lineStyleOptions,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "borderRadius",
    propName: "borderRadius",
    unitOptions,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "padding",
    propName: "padding",
    unitOptions,
  },

  {
    $type: "textPropSetter",
    label: "backgroundColor",
    propName: "backgroundColor",
  },
];

export interface AppearancePropPanelRockConfig extends RockConfigBase {
  componentConfig: RockConfig;
}

export default {
  $type: "appearancePropPanel",

  Renderer(context, props: AppearancePropPanelRockConfig) {
    return renderComponentPropPanel(context, {
      ...props,
      setters,
    });
  },
} as Rock;
