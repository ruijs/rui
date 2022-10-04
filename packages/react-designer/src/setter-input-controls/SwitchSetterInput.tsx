import { handleComponentEvent, RockConfig, RockConfigBase, RockEvent, RockEventHandler, RockEventHandlerScript, RockMeta } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { useCallback } from "react";

export interface SwitchSetterInputProps extends RockConfigBase {
  value?: string;
  onChange?: RockEventHandler;
  checkedValue?: any;
  uncheckedValue?: any;
}

export default {
  $type: "switchSetterInput",

  renderer(props: SwitchSetterInputProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();
    const { $id, onChange  } = props;
    const checkedValue = props.checkedValue || true;
    const uncheckedValue = props.uncheckedValue || false;

    const onInputChange: RockEventHandlerScript["script"] = useCallback((event: RockEvent) => {
      const checked = event.args[0];
      const value = checked ? checkedValue : uncheckedValue;
      handleComponentEvent("onChange", page, $id, onChange, value);
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

    return renderRock(framework, page, rockConfig);
  },
} as RockMeta;