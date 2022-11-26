import { handleComponentEvent, RockConfig, RockConfigBase, RockEvent, RockEventHandler, RockEventHandlerScript, Rock } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { useCallback } from "react";

export interface SliderSetterInputProps extends RockConfigBase {
  value?: string;
  onChange?: RockEventHandler;
  min?: number;
  max?: number;
  step?: number;
  tooltipOpen?: boolean;
}

export default {
  $type: "sliderSetterInput",

  renderer(props: SliderSetterInputProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();
    const { $id, onChange, min, max, step, tooltipOpen } = props;
    
    const onInputChange: RockEventHandlerScript["script"] = useCallback((event: RockEvent) => {
      const value = event.args[0];
      handleComponentEvent("onChange", page, $id, onChange, value);
    }, [page, $id, onChange]);

    const rockConfig: RockConfig = {
      $id: `${props.$id}-internal`,
      $type: "antdSlider",
      min,
      max,
      step,
      tooltip: {
        open: tooltipOpen,
      },
      value: props.value,
      onChange: {
        $action: "script",
        script: onInputChange,
      }
    };

    return renderRock(framework, page, rockConfig);
  },
} as Rock;