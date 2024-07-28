import { lineStyleOptions, RockConfig, RockConfigBase, Rock, RockPropSetter, unitOptions } from "@ruiapp/move-style";
import { renderComponentPropPanel } from "./ComponentPropPanel";

const setters: RockPropSetter[] = [
  {
    $type: "textPropSetter",
    label: "fontFamily",
    propName: "fontFamily",
  },

  {
    $type: "selectPropSetter",
    label: "fontWeight",
    propName: "fontWeight",
    options: [
      { label: "lighter", value: "lighter" },
      { label: "normal", value: "normal" },
      { label: "bold", value: "bold" },
    ],
  },

  {
    $type: "textPropSetter",
    label: "color",
    propName: "color",
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "fontSize",
    propName: "fontSize",
    min: 0,
    unitOptions,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "lineHeight",
    propName: "lineHeight",
    unitOptions,
  },

  {
    $type: "selectPropSetter",
    label: "textDecorationLine",
    propName: "textDecorationLine",
    options: [
      { label: "", value: "" },
      { label: "initial", value: "initial" },
      { label: "underline", value: "underline" },
      { label: "line-through", value: "line-through" },
    ],
  },

  {
    $type: "selectPropSetter",
    label: "textDecorationStyle",
    propName: "textDecorationStyle",
    options: lineStyleOptions,
  },
];

export interface TextPropPanelRockConfig extends RockConfigBase {
  componentConfig: RockConfig;
}

export default {
  $type: "textPropPanel",

  Renderer(context, props: TextPropPanelRockConfig) {
    return renderComponentPropPanel(context, {
      ...props,
      title: "文字",
      setters,
    });
  },
} as Rock;
