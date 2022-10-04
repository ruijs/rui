import { handleComponentEvent, RockConfig, RockConfigBase, RockEvent, RockEventHandler, RockEventHandlerScript, RockMeta } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { useCallback } from "react";

export interface SelectSetterInputProps extends RockConfigBase {
  value?: string;
  onChange?: RockEventHandler;
  options: {
    label: string,
    value: string,
  }[];
  showSearch?: boolean;
}

export default {
  $type: "selectSetterInput",

  renderer(props: SelectSetterInputProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();
    const { $id, onChange, options, showSearch } = props;

    const onSelectChange: RockEventHandlerScript["script"] = useCallback((event: RockEvent) => {
      const value = event.args[0];
      handleComponentEvent("onChange", page, $id, onChange, value);
    }, [page, $id, onChange]);

    const rockConfig: RockConfig = {
      $id: `${props.$id}-internal`,
      $type: "antdSelect",
      style: {
        width: "100%",
      },
      value: props.value,
      options,
      showSearch,
      onChange: {
        $action: "script",
        script: onSelectChange,
      },
    };

    return renderRock(framework, page, rockConfig);
  },
} as RockMeta;