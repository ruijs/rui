import { handleComponentEvent, RockConfig, RockConfigBase, RockEvent, RockEventHandlerScript, Rock, RockEventHandlerConfig } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { useCallback } from "react";

export interface ExpressionSetterInputProps extends RockConfigBase {
  value?: string;
  onClick?: RockEventHandlerConfig;
}

export default {
  $type: "expressionSetterDisplay",

  Renderer(context, props: ExpressionSetterInputProps) {
    const { framework, page, scope } = context;
    const { $id, onClick } = props;

    const onDisplayClick = useCallback(() => {
      handleComponentEvent("onClick", framework, page, scope, props, onClick, []);
    }, [page, $id, onClick]);

    return (
      <div
        style={{
          backgroundColor: "#c038ff",
          border: "1px solid #c038ff",
          borderRadius: "2px",
          padding: "4px 11px",
          color: "#ffffff",
          cursor: "pointer",
          height: "32px",
          overflow: "hidden",
        }}
        onClick={onDisplayClick}
      >
        {props.value}
      </div>
    );
  },
} as Rock;
