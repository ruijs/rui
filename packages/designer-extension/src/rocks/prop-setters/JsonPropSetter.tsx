import { TextRockPropSetter, RockConfig, Rock, MoveStyleUtils } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { isUndefined } from "lodash";
import { ExpressionPropSetterProps } from "../internal-prop-setters/ExpressionPropSetter";
import { SingleControlPropSetterProps } from "../internal-prop-setters/SingleControlPropSetter";
import { getComponentPropValue } from "../../utilities/SetterUtility";

export interface JsonPropSetterProps extends TextRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "jsonPropSetter",

  Renderer(context, props: JsonPropSetterProps) {
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

      const value = getComponentPropValue(componentConfig, propName, defaultValue);
      if (!isUndefined(value)) {
        (rockConfig as SingleControlPropSetterProps).extra = {
          $type: "jsonValueDisplay",
        };
      }
    }

    return renderRock({ context, rockConfig });
  },
} as Rock;
