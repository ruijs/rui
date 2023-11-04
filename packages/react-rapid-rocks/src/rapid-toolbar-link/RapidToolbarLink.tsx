import { Rock, RockConfig } from "@ruiapp/move-style";
import RapidToolbarLinkMeta from "./RapidToolbarLinkMeta";
import { renderRock } from "@ruiapp/react-renderer";
import { RapidToolbarLinkRockConfig } from "./rapid-toolbar-link-types";


export default {
  $type: "rapidToolbarLink",

  Renderer(context, props) {
    const actionEventName = props.actionEventName || "onClick";

    const rockConfig: RockConfig = {
      $type: "antdButton",
      type: props.actionStyle,
      danger: props.danger,
      icon: props.icon ? { $type: "antdIcon", name: props.icon } : null,
      href: props.url,
      children: {
        $type: "htmlElement",
        htmlTag: "span",
        children: {
          $type: "text",
          text: props.text,
        },
      },
    };

    if (props.onAction) {
      rockConfig[actionEventName] = props.onAction;
    }
    return renderRock({context, rockConfig});
  },

  ...RapidToolbarLinkMeta,
} as Rock<RapidToolbarLinkRockConfig>;