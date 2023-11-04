import { handleComponentEvent, RockConfig, RockConfigBase, RockEvent, RockEventHandler, RockEventHandlerScript, Rock } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { useCallback } from "react";

export interface SwitchSetterInputProps extends RockConfigBase {
  value?: string;
  onChange?: RockEventHandler;
  checkedValue?: any;
  uncheckedValue?: any;
}

export default {
  $type: "switchSetterInput",

  Renderer(context, props: SwitchSetterInputProps) {
    const { framework, page, scope } = context;
    const { $id, onChange  } = props;
    const checkedValue = props.checkedValue || true;
    const uncheckedValue = props.uncheckedValue || false;

    const onInputChange: RockEventHandlerScript["script"] = useCallback((event: RockEvent) => {
      const checked = event.args[0];
      const value = checked ? checkedValue : uncheckedValue;
      handleComponentEvent("onChange", framework, page, scope, props, onChange, value);
    }, [page, $id, onChange]);

    const rockConfig: RockConfig = {
      $id: `${props.$id}-internal`,
      $type: "antdSwitch",
      checked: props.value == checkedValue,
      onChange: {
        $action: "script",
        script: onInputChange,
      }
    };

    return renderRock({context, rockConfig});
  },
} as Rock;