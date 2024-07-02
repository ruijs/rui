import { Page, RockConfig, RockEventHandler, Rock, RockConfigBase, MoveStyleUtils } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { SingleControlPropSetterProps } from "../internal-prop-setters/SingleControlPropSetter";
import { ExpressionPropSetterProps } from "../internal-prop-setters/ExpressionPropSetter";

export type ColorPropSetterProps = {
  $id: string;
  designingPage: Page;
  label: string;
  labelTip?: string;
  propName: string;
  defaultValue?: string;
  value?: string;
  onChange: RockEventHandler;
  componentConfig: RockConfig;
} & RockConfigBase;

export default {
  $type: "colorPropSetter",

  Renderer(context, props: ColorPropSetterProps) {
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
        $type: "colorPicker",
      };
    }

    return renderRock({ context, rockConfig });
  },
} as Rock;
