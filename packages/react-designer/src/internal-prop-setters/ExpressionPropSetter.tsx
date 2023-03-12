import { RockConfig, RockEvent, RockEventHandlerScript, Rock, ExpressionRockPropSetter } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage, useRuiScope } from "@ruijs/react-renderer";
import { useMemo } from "react";
import DesignerStore from "../DesignerStore";
import { sendDesignerCommand } from "../DesignerUtility";
import { PropSetterProps } from "../rocks/PropSetter";

export interface ExpressionPropSetterProps extends ExpressionRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "expressionPropSetter",

  Renderer(context, props: ExpressionPropSetterProps) {
    const { page } = context;
    const { propName, componentConfig } = props;

    const controlRock: RockConfig = useMemo(() => {
      const inputControlRockConfig: RockConfig = {
        $type: "expressionSetterInput",
      };
      inputControlRockConfig.$id = `${props.$id}-setterControl-${propName}`;
      inputControlRockConfig.value = componentConfig.$exps?.[propName];

      const onInputControlChange: RockEventHandlerScript["script"] = (event: RockEvent) => {
        const propExpression = event.args;
        const designerStore = page.getStore<DesignerStore>("designerStore");
        sendDesignerCommand(page, designerStore, {
          name: "setComponentPropertyExpression",
          payload: {
            componentId: designerStore.selectedComponentId,
            propName,
            propExpression,
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
    }, [componentConfig]);

    const rockConfig: PropSetterProps = {
      $type: "propSetter",
      $id: props.$id,
      label: props.label,
      labelTip: props.labelTip,
      expressionPropName: propName,
      componentConfig,
      children: controlRock,
    };

    return renderRock({context, rockConfig});
  },
} as Rock;