import {
  RockConfig,
  RockEvent,
  RockEventHandlerScript,
  Rock,
  PropSetterRockConfigBase,
  handleComponentEvent,
  MoveStyleUtils,
  RockInstanceContext,
  RockMultiPropsSetterBase,
} from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { useMemo } from "react";
import { PropSetterRockConfig } from "../PropSetter";
import { getComponentPropsValue } from "../../utilities/SetterUtility";

export interface SingleControlPropsSetterRockConfig<TPropValue = any>
  extends RockMultiPropsSetterBase<"singleControlMultiPropsSetter", TPropValue>,
    PropSetterRockConfigBase {
  componentConfig: RockConfig;
  propNames: string[];
  control: RockConfig;
  extra?: RockConfig;
}

export default {
  $type: "singleControlMultiPropsSetter",

  Renderer(context, props: SingleControlPropsSetterRockConfig) {
    const { framework, page, scope } = context;
    const { propNames = [], defaultValue, control, extra, componentConfig, onPropValueChange } = props;

    const propNamesStr = propNames?.join(",");

    const controlRock: RockConfig = useMemo(() => {
      const inputControlRockConfig = control;
      inputControlRockConfig.$id = `${props.$id}-setterControl-${propNamesStr}`;
      inputControlRockConfig.value = getComponentPropsValue(componentConfig, propNames, defaultValue);

      const onInputControlChange: RockEventHandlerScript["script"] = (event: RockEvent) => {
        let propValues = MoveStyleUtils.omitImmutableRockConfigFields(event.args[0] || {});
        handleComponentEvent("onPropValueChange", framework, page, scope, props, onPropValueChange, [propValues]);
      };

      inputControlRockConfig.onChange = {
        $action: "script",
        script: onInputControlChange,
      };
      return {
        $id: `${inputControlRockConfig.$id}-wrap`,
        $type: "htmlElement",
        htmlTag: "div",
        children: inputControlRockConfig,
      } as RockConfig;
    }, [control, componentConfig]);

    if (extra) {
      extra.$id = `${props.$id}-setterControl-${propNamesStr}-extra`;
      extra.value = getComponentPropsValue(componentConfig, propNames, defaultValue);
    }

    const rockConfig: PropSetterRockConfig = {
      $type: "propSetter",
      $id: props.$id,
      label: props.label,
      labelTip: props.labelTip,
      dynamicForbidden: true,
      componentConfig,
      children: controlRock,
      extra,
    };

    return renderRock({ context, rockConfig });
  },
} as Rock;

export function renderSingleControlMultiPropsSetter(context: RockInstanceContext, props: Omit<SingleControlPropsSetterRockConfig, "$type">) {
  let rockConfig: SingleControlPropsSetterRockConfig = {
    ...props,
    $id: `${props.$id}-single-setter`,
    $type: "singleControlMultiPropsSetter",
  } as any;

  return renderRock({ context, rockConfig });
}
