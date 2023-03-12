import { SelectRockPropSetter, RockConfig, Rock, MoveStyleUtils } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage, useRuiScope } from "@ruijs/react-renderer";
import { ExpressionPropSetterProps } from "../internal-prop-setters/ExpressionPropSetter";
import { SingleControlPropSetterProps } from "../internal-prop-setters/SingleControlPropSetter";

export interface SelectPropSetterProps extends SelectRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
  options: {
    label: string,
    value: string,
  }[];
  showSearch?: boolean;
}

export default {
  $type: "selectPropSetter",

  Renderer(context, props: SelectPropSetterProps) {
    const { $id, label, labelTip, componentConfig, propName, defaultValue, options, showSearch } = props;
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
        $type: "selectSetterInput",
        options,
        showSearch,
      };
    }

    return renderRock({context, rockConfig});
  },
} as Rock;