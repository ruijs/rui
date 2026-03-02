import { fireEvent, RockConfig, RockConfigBase, RockEvent, RockEventHandler, RockEventHandlerScript, Rock } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { useCallback } from "react";

export interface TextSetterInputProps extends RockConfigBase {
  value?: string;
  readOnly?: boolean;
  onChange?: RockEventHandler;
}

export default {
  $type: "textSetterInput",

  Renderer(context, props: TextSetterInputProps) {
    const { framework, page, scope } = context;
    const { $id, readOnly, onChange } = props;

    const onInputChange: RockEventHandlerScript["script"] = useCallback(
      (event: RockEvent) => {
        const value = event.args[0].target.value;
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
      $type: "antdInput",
      value: props.value,
      disabled: readOnly,
      onChange: {
        $action: "script",
        script: onInputChange,
      },
    };

    return renderRock({ context, rockConfig });
  },
} as Rock;
