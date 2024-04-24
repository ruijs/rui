import { RockConfig, RockEvent, RockEventHandlerScript, Rock, SingleControlRockPropSetter } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { useMemo } from "react";
import { DesignerStore } from "../../stores/DesignerStore";
import { sendDesignerCommand } from "../../utilities/DesignerUtility";
import { PropSetterProps } from "../PropSetter";
import { getComponentPropValue } from "../../utilities/SetterUtility";

export interface SingleControlPropSetterProps extends SingleControlRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "singleControlPropSetter",

  Renderer(context, props: SingleControlPropSetterProps) {
    const { page } = context;
    const { propName, defaultValue, control, extra, componentConfig } = props;

    const controlRock: RockConfig = useMemo(() => {
      const inputControlRockConfig = control;
      inputControlRockConfig.$id = `${props.$id}-setterControl-${propName}`;
      inputControlRockConfig.value = getComponentPropValue(componentConfig, propName, defaultValue);

      const onInputControlChange: RockEventHandlerScript["script"] = (event: RockEvent) => {
        const propValue = event.args[0];
        const store = page.getStore<DesignerStore>("designerStore");
        sendDesignerCommand(page, store, {
          name: "setComponentProperty",
          payload: {
            componentId: store.selectedComponentId,
            propName,
            propValue,
          }
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
      extra.$id = `${props.$id}-setterControl-${propName}-extra`;
      extra.value = getComponentPropValue(componentConfig, propName, defaultValue);
    }

    const rockConfig: PropSetterProps = {
      $type: "propSetter",
      $id: props.$id,
      label: props.label,
      labelTip: props.labelTip,
      expressionPropName: propName,
      componentConfig,
      children: controlRock,
      extra,
    };

    return renderRock({context, rockConfig});
  },
} as Rock;