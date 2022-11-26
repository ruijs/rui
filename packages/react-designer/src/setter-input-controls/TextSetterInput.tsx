import { handleComponentEvent, RockConfig, RockConfigBase, RockEvent, RockEventHandler, RockEventHandlerScript, Rock } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { useCallback } from "react";

export interface TextSetterInputProps extends RockConfigBase {
  value?: string;
  onChange?: RockEventHandler;
}

export default {
  $type: "textSetterInput",

  renderer(props: TextSetterInputProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();
    const { $id, onChange } = props;
    
    const onInputChange: RockEventHandlerScript["script"] = useCallback((event: RockEvent) => {
      const value = event.args[0].target.value;
      handleComponentEvent("onChange", page, $id, onChange, value);
    }, [page, $id, onChange]);

    const rockConfig: RockConfig = {
      $id: `${props.$id}-internal`,
      $type: "antdInput",
      value: props.value,
      onChange: {
        $action: "script",
        script: onInputChange,
      }
    };

    return renderRock(framework, page, rockConfig);
  },
} as Rock;