import { RockConfig, RockEvent, RockEventHandlerScript, Rock, SingleControlRockPropSetter } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import _ from "lodash";
import { useMemo } from "react";
import DesignerStore from "../DesignerStore";
import { sendDesignerCommand } from "../DesignerUtility";
import { PropSetterProps } from "../rocks/PropSetter";
import { getComponentPropValue } from "../SetterUtility";

export interface SingleControlPropSetterProps extends SingleControlRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "singleControlPropSetter",

  renderer(props: SingleControlPropSetterProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const { propName, defaultValue, control, extra, componentConfig } = props;

    const controlRock: RockConfig = useMemo(() => {
      const inputControlRockConfig = control;
      inputControlRockConfig.$id = `${props.$id}-setterControl-${propName}`;
      inputControlRockConfig.value = getComponentPropValue(componentConfig, propName, defaultValue);

      const onInputControlChange: RockEventHandlerScript["script"] = (event: RockEvent) => {
        const propValue = event.args;
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

    const setterRock: PropSetterProps = {
      $type: "propSetter",
      $id: props.$id,
      label: props.label,
      labelTip: props.labelTip,
      expressionPropName: propName,
      componentConfig,
      children: controlRock,
      extra,
    };

    return renderRock(framework, page, setterRock);
  },
} as Rock;