import { handleComponentEvent, RockConfig, RockConfigBase, RockEvent, RockEventHandler, RockEventHandlerScript, Rock } from "@ruijs/move-style";
import { renderRock } from "@ruijs/react-renderer";
import { useCallback } from "react";

export interface NumberSetterInputProps extends RockConfigBase {
  value?: string;
  onChange?: RockEventHandler;
  min?: number;
  max?: number;
  step?: number;
}

export default {
  $type: "numberSetterInput",

  Renderer(context, props: NumberSetterInputProps) {
    const { framework, page, scope } = context;
    const { $id, onChange, min, max, step } = props;
    
    const onInputChange: RockEventHandlerScript["script"] = useCallback((event: RockEvent) => {
      const value = event.args[0];
      handleComponentEvent("onChange", framework, page, scope, props, onChange, value);
    }, [page, $id, onChange]);

    const rockConfig: RockConfig = {
      $id: `${props.$id}-internal`,
      $type: "antdInputNumber",
      style: {
        width: "100%",
      },
      min,
      max,
      step,
      value: props.value,
      onChange: {
        $action: "script",
        script: onInputChange,
      }
    };

    return renderRock({context, rockConfig});
  },
} as Rock;