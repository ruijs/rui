import { Rock, RockConfig } from "@ruijs/move-style";
import RapidToolbarMeta from "./RapidTableActionMeta";
import { renderRock, useRuiFramework, useRuiPage, useRuiScope } from "@ruijs/react-renderer";
import { RapidTableActionRockConfig } from "./rapid-table-action-types";
import { set } from "lodash";


export default {
  $type: "rapidTableAction",

  Renderer(context, props) {
    const rockConfig: RockConfig = {
      $id: `${props.$id}-anchor`,
      $type: 'anchor',
      className: "rui-table-action-link",
      "data-record-id": props.recordId,
      children: {
        $type: "text",
        text: props.actionText,
      },
    };

    if (props.onAction) {
      rockConfig.onClick = props.onAction;
    }

    return renderRock({context, rockConfig});
  },

  ...RapidToolbarMeta,
} as Rock<RapidTableActionRockConfig>;