import { MoveStyleUtils, Rock, RockConfig } from "@ruiapp/move-style";
import RapidArrayRendererMeta from "./RapidArrayRendererMeta";
import { RapidArrayRendererRockConfig } from "./rapid-array-renderer-types";
import { map } from "lodash";
import { renderRock } from "@ruiapp/react-renderer";

export default {
  $type: "rapidObjectRenderer",

  Renderer(context, props: RapidArrayRendererRockConfig) {
    const { value, format, item, separator, defaultText } = props;
    if (!value) {
      return defaultText || "";
    }

    if (item) {
      const rockConfig: RockConfig = {
        $id: props.$id,
        $type: "list",
        item: item,
        separator: separator || {
          $type: "antdDivider",
          type: "vertical",
        },
        dataSource: value,
      };
      return renderRock({context, rockConfig})
    } else if (format) {
      return map(value, item => {
        return MoveStyleUtils.fulfillVariablesInString(format, item);
      }).join(", ");
    }

    return "";
  },

  ...RapidArrayRendererMeta,
} as Rock;