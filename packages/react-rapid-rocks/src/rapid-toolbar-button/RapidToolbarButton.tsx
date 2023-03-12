import { Rock, RockConfig } from "@ruijs/move-style";
import RapidToolbarMeta from "./RapidToolbarButtonMeta";
import { renderRock, useRuiFramework, useRuiPage, useRuiScope } from "@ruijs/react-renderer";
import { RapidToolbarButtonRockConfig } from "./rapid-toolbar-button-types";


export default {
  $type: "rapidToolbarButton",

  Renderer(context, props: RapidToolbarButtonRockConfig) {
    const actionEventName = props.actionEventName || "onClick";

    const rockConfig: RockConfig = {
      $type: "antdButton",
      type: props.actionStyle,
      danger: !!props.danger,
      ghost: !!props.ghost,
      icon: props.icon ? { $type: "antdIcon", name: props.icon } : null,
      children: {
        $type: "htmlElement",
        htmlTag: "span",
        children: {
          $type: "text",
          text: props.text,
        },
      },
    };

    if (props.actionType === "pageLink") {
      rockConfig.href = `/pages/${props.pageCode}`;
    } else if (props.actionType === "link") {
      rockConfig.href = props.url;
    }

    if (props.onAction) {
      rockConfig[actionEventName] = props.onAction;
    }
    return renderRock({context, rockConfig});
  },

  ...RapidToolbarMeta,
} as Rock;