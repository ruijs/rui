import { SwitchRockPropSetter, RockConfig, Rock, MoveStyleUtils } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { ExpressionPropSetterProps } from "../internal-prop-setters/ExpressionPropSetter";
import { SingleControlPropSetterProps } from "../internal-prop-setters/SingleControlPropSetter";

export interface SwitchPropSetterProps extends SwitchRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
  checkedValue?: any;
  uncheckedValue?: any;
}

export default {
  $type: "switchPropSetter",

  Renderer(context, props: SwitchPropSetterProps) {
    const { $id, label, labelTip, componentConfig, propName, defaultValue, checkedValue, uncheckedValue } = props;
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
        $type: "switchSetterInput",
        checkedValue,
        uncheckedValue,
      };
    }

    return renderRock({context, rockConfig});
  },
} as Rock;