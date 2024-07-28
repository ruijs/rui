import { NumberWithSliderRockPropSetter, RockConfig, Rock, MoveStyleUtils, PropSetterRockConfigBase } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { ExpressionPropSetterProps } from "../internal-prop-setters/ExpressionPropSetter";
import { MultiControlsPropSetterRockConfig, renderMultiControlsPropSetter } from "../internal-prop-setters/MultiControlsPropSetter";

export interface NumberWithSliderPropSetterProps extends NumberWithSliderRockPropSetter, PropSetterRockConfigBase {}

export default {
  $type: "numberWithSliderPropSetter",

  Renderer(context, props: NumberWithSliderPropSetterProps) {
    const { propName, defaultValue, min, max, step } = props;
    return renderMultiControlsPropSetter(context, {
      ...props,
      controls: [
        {
          propName,
          defaultValue,
          span: 1,
          control: {
            $type: "numberSetterInput",
            min,
            max,
            step,
          },
        },
        {
          propName,
          defaultValue,
          span: 1,
          control: {
            $type: "sliderSetterInput",
            min,
            max,
            step,
            tooltipOpen: false,
          },
        },
      ],
    });
  },
} as Rock;
