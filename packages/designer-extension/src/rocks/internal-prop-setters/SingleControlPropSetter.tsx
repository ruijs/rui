import { RockConfig, RockEvent, Rock, SingleControlRockPropSetter, fireEvent, PropSetterRockConfigBase, RockInstanceContext } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { useMemo } from "react";
import { PropSetterRockConfig } from "../PropSetter";
import { getComponentPropValue } from "../../utilities/SetterUtility";

export interface SingleControlPropSetterRockConfig<TPropValue = any> extends SingleControlRockPropSetter<TPropValue>, PropSetterRockConfigBase {}

export default {
  $type: "singleControlPropSetter",

  Renderer(context, props: SingleControlPropSetterRockConfig) {
    const { framework, page, scope } = context;
    const {
      $id,
      propName,
      defaultValue,
      readOnly,
      control,
      extra,
      componentConfig,
      dynamicForbidden,
      onPropValueChange,
      onSettingPropExpression,
      onPropExpressionChange,
      onPropExpressionRemove,
    } = props;

    const propValue = getComponentPropValue(componentConfig, propName, defaultValue);

    const controlRock: RockConfig = useMemo(() => {
      const inputControlRockConfig: RockConfig = {
        ...control,
        $id: `${$id}-setterControl-${propName}`,
        readOnly,
        value: propValue,
        onChange: {
          $action: "script",
          script: (event: RockEvent) => {
            const propValue = event.args[0];
            const propChanges = {
              [propName]: propValue,
            };
            fireEvent({
              eventName: "onPropValueChange",
              framework,
              page,
              scope,
              sender: props,
              eventHandlers: onPropValueChange,
              eventArgs: [propChanges],
            });
          },
        },
      };

      return {
        $id: `${inputControlRockConfig.$id}-wrap`,
        $type: "htmlElement",
        htmlTag: "div",
        children: inputControlRockConfig,
      } as RockConfig;
    }, [$id, control, componentConfig, propName, propValue]);

    if (extra) {
      extra.$id = `${props.$id}-setterControl-${propName}-extra`;
      extra.value = getComponentPropValue(componentConfig, propName, defaultValue);
    }

    const rockConfig: PropSetterRockConfig = {
      $type: "propSetter",
      $id: props.$id,
      label: props.label,
      labelTip: props.labelTip,
      dynamicForbidden,
      expressionPropName: propName,
      componentConfig,
      children: controlRock,
      extra,
      onSettingPropExpression,
      onPropExpressionChange,
      onPropExpressionRemove,
    };

    return renderRock({ context, rockConfig });
  },
} as Rock;

export function renderSingleControlPropSetter(context: RockInstanceContext, props: Omit<SingleControlPropSetterRockConfig, "$type">) {
  let rockConfig: SingleControlPropSetterRockConfig = {
    ...props,
    $id: `${props.$id}-single-setter`,
    $type: "singleControlPropSetter",
  } as any;

  return renderRock({ context, rockConfig });
}
