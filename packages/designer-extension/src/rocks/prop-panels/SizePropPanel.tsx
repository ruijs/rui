import { RockConfig, RockConfigBase, Rock, RockPropSetter, unitOptions } from "@ruiapp/move-style";
import { renderComponentPropPanel } from "./ComponentPropPanel";

const setters: RockPropSetter[] = [
  {
    $type: "numberWithUnitsPropSetter",
    label: "width",
    propName: "width",
    unitOptions,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "height",
    propName: "height",
    unitOptions,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "minWidth",
    propName: "minWidth",
    unitOptions,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "maxWidth",
    propName: "maxWidth",
    unitOptions,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "minHeight",
    propName: "minHeight",
    unitOptions,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "maxHeight",
    propName: "maxHeight",
    unitOptions,
  },
];

export interface SizePropPanelRockConfig extends RockConfigBase {
  componentConfig: RockConfig;
}

export default {
  $type: "sizePropPanel",

  Renderer(context, props: SizePropPanelRockConfig) {
    return renderComponentPropPanel(context, {
      ...props,
      title: "大小",
      setters,
    });
  },
} as Rock;
