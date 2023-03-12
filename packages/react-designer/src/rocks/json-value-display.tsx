import { Rock, RockConfig } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage, useRuiScope } from "@ruijs/react-renderer";

export default {
  $type: "jsonValueDisplay",

  Renderer(context, props) {
    const { $id, value } = props;

    const rockConfig: RockConfig = {
      $type: "htmlElement",
      $id: $id,
      htmlTag: "pre",
      attributes: {
        style: {
          margin: "0",
        },
      },
      children: [
        {
          $id: `${$id}-text`,
          $type: "text",
          text: value && JSON.stringify(value, null, 2) || "",
        },
      ],
    }

    return renderRock({context, rockConfig});
  },
} as Rock;