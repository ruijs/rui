import { Rock, TextRockPropSetter, PropSetterRockConfigBase } from "@ruiapp/move-style";
import { renderSingleControlPropSetter } from "../internal-prop-setters/SingleControlPropSetter";
import { ColorPickerProps } from "../controls/color-picker";

export interface ColorPropSetterProps extends TextRockPropSetter, PropSetterRockConfigBase, Pick<ColorPickerProps, "enableAlpha" | "format"> {}

export default {
  $type: "colorPropSetter",

  Renderer(context, props: ColorPropSetterProps) {
    const { enableAlpha, format } = props;
    return renderSingleControlPropSetter(context, {
      ...props,
      control: {
        $type: "colorPicker",
        enableAlpha,
        format,
      },
    });
  },
} as Rock;
