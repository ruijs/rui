import { MoveStyleUtils, Rock, RockConfig } from "@ruijs/move-style";
import RapidLinkRendererMeta from "./RapidLinkRendererMeta";
import { RapidLinkRendererRockConfig } from "./rapid-link-renderer-types";
import { renderRock } from "@ruijs/react-renderer";

export default {
  $type: "rapidLinkRenderer",

  Renderer(context, props: RapidLinkRendererRockConfig) {
    const { value, linkText, linkUrl, defaultText } = props;
    if (!value) {
      return defaultText || "";
    }

    const rockConfig: RockConfig = {
      $id: `${props.$id}`,
      $type: "anchor",
      href: MoveStyleUtils.fulfillVariablesInString(linkUrl, value),
      children: {
        $id: `${props.$id}-text`,
        $type: "text",
        text: MoveStyleUtils.fulfillVariablesInString(linkText, value),
      },
    };

    return renderRock({context, rockConfig});
  },

  ...RapidLinkRendererMeta,
} as Rock;