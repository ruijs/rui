import { RockConfig, RockConfigBase, Rock, RockPropSetter } from "@ruiapp/move-style";
import { renderComponentPropPanel } from "./ComponentPropPanel";

const setters: RockPropSetter[] = [
  {
    $type: "textPropSetter",
    label: "$id",
    propName: "$id",
    dynamicForbidden: true,
    readOnly: true,
  },

  {
    $type: "textPropSetter",
    label: "$name",
    propName: "$name",
    dynamicForbidden: true,
  },

  {
    $type: "switchPropSetter",
    label: "隐藏",
    propName: "_hidden",
  },
];

export interface CommonPropPanelRockConfig extends RockConfigBase {
  componentConfig: RockConfig;
}

export default {
  $type: "commonPropPanel",

  Renderer(context, props: CommonPropPanelRockConfig) {
    return renderComponentPropPanel(context, {
      ...props,
      setters,
    });
  },
} as Rock;
