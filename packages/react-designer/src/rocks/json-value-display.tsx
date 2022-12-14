import { Rock, RockConfig } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";

export default {
  $type: "jsonValueDisplay",

  renderer(props) {
    const framework = useRuiFramework();
    const page = useRuiPage();
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

    return renderRock(framework, page, rockConfig);
  },
} as Rock;