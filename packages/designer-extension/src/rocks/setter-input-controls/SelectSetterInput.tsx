import { fireEvent, RockConfig, RockConfigBase, RockEvent, RockEventHandler, RockEventHandlerScript, Rock } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { useCallback } from "react";

export interface SelectSetterInputProps extends RockConfigBase {
  value?: string;
  onChange?: RockEventHandler;
  options: {
    label: string;
    value: string;
  }[];
  showSearch?: boolean;
  allowClear?: boolean;
}

export default {
  $type: "selectSetterInput",

  Renderer(context, props: SelectSetterInputProps) {
    const { framework, page, scope } = context;
    const { $id, onChange, options, showSearch, allowClear } = props;

    const onSelectChange: RockEventHandlerScript["script"] = useCallback(
      (event: RockEvent) => {
        const value = event.args[0];
        fireEvent({
          eventName: "onChange",
          framework,
          page,
          scope,
          sender: props,
          eventHandlers: onChange,
          eventArgs: [value],
        });
      },
      [page, $id, onChange],
    );

    const rockConfig: RockConfig = {
      $id: `${props.$id}-internal`,
      $type: "antdSelect",
      style: {
        width: "100%",
      },
      value: props.value,
      options,
      showSearch,
      allowClear,
      onChange: {
        $action: "script",
        script: onSelectChange,
      },
    };

    return renderRock({ context, rockConfig });
  },
} as Rock;
