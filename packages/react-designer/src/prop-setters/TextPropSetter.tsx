import { TextRockPropSetter, RockConfig, Rock, moveStyleUtils } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { ExpressionPropSetterProps } from "../internal-prop-setters/ExpressionPropSetter";
import { SingleControlPropSetterProps } from "../internal-prop-setters/SingleControlPropSetter";

export interface TextPropSetterProps extends TextRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "textPropSetter",

  renderer(props: TextPropSetterProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const { $id, label, labelTip, componentConfig, propName } = props;
    const isPropDynamic = moveStyleUtils.isComponentPropertyDynamic(componentConfig, propName);

    let rockConfig: SingleControlPropSetterProps | ExpressionPropSetterProps = {
      $id: isPropDynamic ? `${$id}-dynamic` : `${$id}-static`,
      $type: isPropDynamic ? "expressionPropSetter" : "singleControlPropSetter",
      label,
      labelTip,
      propName,
      componentConfig,
    } as any;

    if (!isPropDynamic) {
      (rockConfig as SingleControlPropSetterProps).control = {
        $type: "textSetterInput",
      };
    }

    return renderRock(framework, page, rockConfig);
  },
} as Rock;