import { RockConfig, RockEvent, RockEventHandlerScript, Rock, SingleControlRockPropSetter } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import _ from "lodash";
import { useMemo } from "react";
import DesignerStore from "../DesignerStore";
import { sendDesignerCommand } from "../DesignerUtility";
import { PropSetterProps } from "../rocks/PropSetter";

export interface SingleControlPropSetterProps extends SingleControlRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "singleControlPropSetter",

  renderer(props: SingleControlPropSetterProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const { propName, defaultValue, control, componentConfig } = props;

    const controlRock: RockConfig = useMemo(() => {
      const inputControlRockConfig = control;
      inputControlRockConfig.$id = `${props.$id}-setterControl-${propName}`;
      if (componentConfig.hasOwnProperty(propName)) {
        inputControlRockConfig.value = componentConfig[propName];
      } else if (!_.isUndefined(defaultValue)) {
        inputControlRockConfig.value = defaultValue;
      }

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

    const setterRock: PropSetterProps = {
      $type: "propSetter",
      $id: props.$id,
      label: props.label,
      labelTip: props.labelTip,
      expressionPropName: propName,
      componentConfig,
      children: controlRock,
    };

    return renderRock(framework, page, setterRock);
  },
} as Rock;