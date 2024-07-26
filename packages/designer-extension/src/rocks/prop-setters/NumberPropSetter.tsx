import { NumberRockPropSetter, Rock, PropSetterRockConfigBase } from "@ruiapp/move-style";
import { renderSingleControlPropSetter } from "../internal-prop-setters/SingleControlPropSetter";

export interface NumberPropSetterProps extends NumberRockPropSetter, PropSetterRockConfigBase {}

export default {
  $type: "numberPropSetter",

  Renderer(context, props: NumberPropSetterProps) {
    const { min, max, step } = props;
    return renderSingleControlPropSetter(context, {
      ...props,
      control: {
        $type: "numberSetterInput",
        min,
        max,
        step,
      },
    });
  },
} as Rock;
