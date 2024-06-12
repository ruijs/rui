import { lineStyleOptions, RockConfig, RockConfigBase, Rock, RockPropSetter, unitOptions } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { useMemo } from "react";

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

export interface TextPropPanelProps extends RockConfigBase {
  componentConfig: RockConfig;
}

export default {
  $type: "textPropPanel",

  Renderer(context, props: TextPropPanelProps) {
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
        <h3>Text</h3>
        {renderRockChildren({ context, rockChildrenConfig })}
      </div>
    );
  },
} as Rock;
