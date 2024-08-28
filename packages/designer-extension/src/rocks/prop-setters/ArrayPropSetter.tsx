import { Rock, TextRockPropSetter, PropSetterRockConfigBase } from "@ruiapp/move-style";
import { renderSingleControlPropSetter } from "../internal-prop-setters/SingleControlPropSetter";
import { ColorPickerProps } from "../controls/color-picker";

export interface arrayPropSetterProps extends TextRockPropSetter, PropSetterRockConfigBase {}

export default {
  $type: "arrayPropSetter",

  Renderer(context, props: arrayPropSetterProps) {
    const { } = props;
    return renderSingleControlPropSetter(context, {
      ...props,
      control: {
        $type: "arrayBuilder",
      },
    });
  },
} as Rock;
