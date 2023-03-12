import { TextRockPropSetter, RockConfig, Rock, MoveStyleUtils } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage, useRuiScope } from "@ruijs/react-renderer";
import { ExpressionPropSetterProps } from "../internal-prop-setters/ExpressionPropSetter";
import { SingleControlPropSetterProps } from "../internal-prop-setters/SingleControlPropSetter";

export interface TextPropSetterProps extends TextRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "textPropSetter",

  Renderer(context, props: TextPropSetterProps) {
    const { $id, label, labelTip, componentConfig, propName, defaultValue } = props;
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
        $type: "textSetterInput",
      };
    }

    return renderRock({context, rockConfig});
  },
} as Rock;