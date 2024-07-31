import { Rock, TextRockPropSetter, PropSetterRockConfigBase } from "@ruiapp/move-style";
import { renderSingleControlPropSetter } from "../internal-prop-setters/SingleControlPropSetter";

export interface SelectIconPropSetterProps extends TextRockPropSetter, PropSetterRockConfigBase {}

export default {
  $type: "selectIconPropSetter",

  Renderer(context, props: SelectIconPropSetterProps) {
    return renderSingleControlPropSetter(context, {
      ...props,
      control: {
        $type: "selectIcon",
      },
    });
  },
} as Rock;
