import { Rock, RockConfig, RockEvent, handleComponentEvent } from "@ruiapp/move-style";
import RapidToolbarMeta from "./RapidTableActionMeta";
import { renderRock } from "@ruiapp/react-renderer";
import { RapidTableActionRockConfig } from "./rapid-table-action-types";
import { Modal } from "antd";


export default {
  $type: "rapidTableAction",

  Renderer(context, props) {
    const {recordId, actionText, confirmText, onAction } = props;
    const rockConfig: RockConfig = {
      $id: `${props.$id}-anchor`,
      $type: 'anchor',
      className: "rui-table-action-link",
      "data-record-id": recordId,
      children: {
        $type: "text",
        text: actionText,
      },
    };

    if (onAction) {
      if (confirmText) {
        rockConfig.onClick = [
          {
            $action: "script",
            script: (event: RockEvent) => {
              Modal.confirm({
                title: confirmText,
                onOk: async () => {
                  handleComponentEvent("onAction", event.framework, event.page as any, event.scope, event.sender, onAction, null);
                },
              });
            }
          }
        ]
      } else {
        rockConfig.onClick = props.onAction;
      }
    }

    return renderRock({context, rockConfig});
  },

  ...RapidToolbarMeta,
} as Rock<RapidTableActionRockConfig>;