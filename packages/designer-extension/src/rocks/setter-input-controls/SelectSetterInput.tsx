import { handleComponentEvent, RockConfig, RockConfigBase, RockEvent, RockEventHandler, RockEventHandlerScript, Rock } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
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

  Renderer(context, props: SelectSetterInputProps) {
    const { framework, page, scope } = context;
    const { $id, onChange, options, showSearch } = props;

    const onSelectChange: RockEventHandlerScript["script"] = useCallback((event: RockEvent) => {
      const value = event.args[0];
      handleComponentEvent("onChange", framework, page, scope, props, onChange, [value]);
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

    return renderRock({context, rockConfig});
  },
} as Rock;