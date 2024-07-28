import { TextRockPropSetter, RockConfig, Rock, PropSetterRockConfigBase } from "@ruiapp/move-style";
import { renderSingleControlPropSetter } from "../internal-prop-setters/SingleControlPropSetter";

export interface TextPropSetterRockConfig extends TextRockPropSetter, PropSetterRockConfigBase {}

export default {
  $type: "textPropSetter",

  Renderer(context, props: TextPropSetterRockConfig) {
    return renderSingleControlPropSetter(context, {
      ...props,
      control: {
        $type: "textSetterInput",
      },
    });
  },
} as Rock;
