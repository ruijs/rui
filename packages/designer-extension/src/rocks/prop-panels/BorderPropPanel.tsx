import { RockConfig, RockConfigBase, Rock, RockPropSetter, unitOptions, lineStyleOptions } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { useMemo } from "react";
import { renderComponentPropPanel } from "./ComponentPropPanel";

const setters: RockPropSetter[] = [
  {
    $type: "numberWithUnitsPropSetter",
    label: "width",
    propName: "borderWidth",
    unitOptions,
  },
  {
    $type: "selectPropSetter",
    label: "类型",
    propName: "borderStyle",
    options: lineStyleOptions,
  },
  {
    $type: "colorPropSetter" as any,
    label: "颜色",
    propName: "borderColor",
  },
  {
    $type: "numberWithUnitsPropSetter",
    label: "圆角",
    propName: "borderRadius",
    unitOptions,
  },
];

export interface BorderPropPanelRockConfig extends RockConfigBase {
  componentConfig: RockConfig;
}

export default {
  $type: "borderPropPanel",

  Renderer(context, props: BorderPropPanelRockConfig) {
    return renderComponentPropPanel(context, {
      ...props,
      title: "边框",
      setters,
    });
  },
} as Rock;
