import { RockConfig, RockConfigBase, Rock, RockPropSetter, unitOptions, lineStyleOptions } from "@ruijs/move-style";
import { renderRockChildren, useRuiFramework, useRuiPage, useRuiScope } from "@ruijs/react-renderer";
import { useMemo } from "react";

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

export interface AppearancePropPanelProps extends RockConfigBase {
  componentConfig: RockConfig;
}

export default {
  $type: "appearancePropPanel",

  Renderer(context, props: AppearancePropPanelProps) {
    const { componentConfig } = props;

    const rockChildrenConfig: RockConfig[] = useMemo(() => {
      return setters.map((setter) => {
        return Object.assign({}, setter, {
          $id: `${props.$id}-${setter.label}`,
          componentConfig: props.componentConfig,
        });
      });
    }, [setters, componentConfig]);

    return <div>
      <h3>Appearance</h3>
      {
        renderRockChildren({context, rockChildrenConfig})
      }
    </div>

  },
} as Rock;