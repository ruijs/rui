import { NumberWithSliderRockPropSetter, RockConfig, Rock, MoveStyleUtils } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage, useRuiScope } from "@ruijs/react-renderer";
import { ExpressionPropSetterProps } from "../internal-prop-setters/ExpressionPropSetter";
import { MultiControlsPropSetterProps } from "../internal-prop-setters/MultiControlsPropSetter";

export interface NumberWithSliderPropSetterProps extends NumberWithSliderRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "numberWithSliderPropSetter",

  Renderer(context, props: NumberWithSliderPropSetterProps) {
    const { $id, label, labelTip, componentConfig, propName, defaultValue, min, max, step } = props;
    const isPropDynamic = MoveStyleUtils.isComponentPropertyDynamic(componentConfig, propName);

    let rockConfig: MultiControlsPropSetterProps | ExpressionPropSetterProps = {
      $id: isPropDynamic ? `${$id}-dynamic` : `${$id}-static`,
      $type: isPropDynamic ? "expressionPropSetter" : "multiControlsPropSetter",
      label,
      labelTip,
      propName,
      componentConfig,
    } as any;

    if (!isPropDynamic) {
      const multiControlPropSetter = rockConfig as MultiControlsPropSetterProps;
      multiControlPropSetter.expressionPropName = propName;
      multiControlPropSetter.controls = [
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
      ];
    }

    return renderRock({context, rockConfig});
  },
} as Rock;