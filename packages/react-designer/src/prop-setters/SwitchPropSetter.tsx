import { SwitchRockPropSetter, RockConfig, Rock, MoveStyleUtils } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
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

  renderer(props: SwitchPropSetterProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

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

    return renderRock(framework, page, rockConfig);
  },
} as Rock;