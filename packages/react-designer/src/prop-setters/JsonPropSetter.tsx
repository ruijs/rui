import { TextRockPropSetter, RockConfig, Rock, MoveStyleUtils } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import _ from "lodash";
import { ExpressionPropSetterProps } from "../internal-prop-setters/ExpressionPropSetter";
import { SingleControlPropSetterProps } from "../internal-prop-setters/SingleControlPropSetter";
import { getComponentPropValue } from "../SetterUtility";

export interface JsonPropSetterProps extends TextRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "jsonPropSetter",

  renderer(props: JsonPropSetterProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

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
        $type: "jsonSetterInput",
      };

      const value = getComponentPropValue(componentConfig, propName, defaultValue)
      if (!_.isUndefined(value)) {
        (rockConfig as SingleControlPropSetterProps).extra = {
          $type: "jsonValueDisplay",
        }
      }
    }

    return renderRock(framework, page, rockConfig);
  },
} as Rock;