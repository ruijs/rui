import { NumberRockPropSetter, RockConfig, Rock, MoveStyleUtils } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { ExpressionPropSetterProps } from "../internal-prop-setters/ExpressionPropSetter";
import { SingleControlPropSetterProps } from "../internal-prop-setters/SingleControlPropSetter";

export interface NumberPropSetterProps extends NumberRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "numberPropSetter",

  renderer(props: NumberPropSetterProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const { $id, label, labelTip, componentConfig, propName, defaultValue, min, max, step } = props;
    const isPropDynamic = MoveStyleUtils.isComponentPropertyDynamic(componentConfig, propName);

    let rockConfig: SingleControlPropSetterProps | ExpressionPropSetterProps = {
      $id: isPropDynamic ? `${$id}-dynamic` : `${$id}-static`,
      $type: isPropDynamic ? "expressionPropSetter" : "singleControlPropSetter",
      label,
      labelTip,
      propName,
      componentConfig,
    } as any;

    if (!isPropDynamic) {
      (rockConfig as SingleControlPropSetterProps).defaultValue = defaultValue;
      (rockConfig as SingleControlPropSetterProps).control = {
        $type: "numberSetterInput",
        min,
        max,
        step,
      };
    }

    return renderRock(framework, page, rockConfig);
  },
} as Rock;