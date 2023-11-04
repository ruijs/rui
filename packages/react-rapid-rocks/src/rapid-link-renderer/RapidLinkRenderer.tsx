import { MoveStyleUtils, Rock, RockConfig } from "@ruiapp/move-style";
import RapidLinkRendererMeta from "./RapidLinkRendererMeta";
import { RapidLinkRendererRockConfig } from "./rapid-link-renderer-types";
import { renderRock } from "@ruiapp/react-renderer";

export default {
  $type: "rapidLinkRenderer",

  Renderer(context, props: RapidLinkRendererRockConfig) {
    const { value, text, url, defaultText } = props;
    if (!value) {
      return defaultText || "";
    }

    const rockConfig: RockConfig = {
      $id: `${props.$id}`,
      $type: "anchor",
      href: MoveStyleUtils.fulfillVariablesInString(url, value),
      children: {
        $id: `${props.$id}-text`,
        $type: "text",
        text: MoveStyleUtils.fulfillVariablesInString(text, value),
      },
    };

    return renderRock({context, rockConfig});
  },

  ...RapidLinkRendererMeta,
} as Rock;