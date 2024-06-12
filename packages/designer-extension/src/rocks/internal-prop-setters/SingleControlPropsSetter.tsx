import { RockConfig, RockEvent, RockEventHandlerScript, Rock, RockConfigBase } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { useMemo } from "react";
import { DesignerStore } from "../../stores/DesignerStore";
import { sendDesignerCommand } from "../../utilities/DesignerUtility";
import { PropSetterProps } from "../PropSetter";
import { getComponentPropsValue } from "../../utilities/SetterUtility";

export interface SingleControlPropsSetterProps extends RockConfigBase {
  $id: string;
  componentConfig: RockConfig;
  label: string;
  labelTip?: string;
  propNames: string[];
  defaultValue?: Record<string, any>;
  control: RockConfig;
  extra?: RockConfig;
}

export default {
  $type: "singleControlPropsSetter",

  Renderer(context, props: SingleControlPropsSetterProps) {
    const { page } = context;
    const { propNames = [], defaultValue, control, extra, componentConfig } = props;

    const propNamesStr = propNames?.join(",");

    const controlRock: RockConfig = useMemo(() => {
      const inputControlRockConfig = control;
      inputControlRockConfig.$id = `${props.$id}-setterControl-${propNamesStr}`;
      inputControlRockConfig.value = getComponentPropsValue(componentConfig, propNames, defaultValue);

      const onInputControlChange: RockEventHandlerScript["script"] = (event: RockEvent) => {
        const propValue = event.args[0];
        const store = page.getStore<DesignerStore>("designerStore");
        sendDesignerCommand(page, store, {
          name: "setComponentProperties",
          payload: {
            componentId: store.selectedComponentId,
            props: propValue,
          },
        });
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

    const rockConfig: PropSetterProps = {
      $type: "propSetter",
      $id: props.$id,
      label: props.label,
      labelTip: props.labelTip,
      componentConfig,
      children: controlRock,
      extra,
    };

    return renderRock({ context, rockConfig });
  },
} as Rock;
