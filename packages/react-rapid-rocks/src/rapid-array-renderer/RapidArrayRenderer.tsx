import { MoveStyleUtils, Rock, RockConfig } from "@ruijs/move-style";
import RapidArrayRendererMeta from "./RapidArrayRendererMeta";
import { RapidArrayRendererRockConfig } from "./rapid-array-renderer-types";
import { map } from "lodash";
import { renderRockChildren } from "@ruijs/react-renderer";

export default {
  $type: "rapidObjectRenderer",

  Renderer(context, props: RapidArrayRendererRockConfig) {
    const { value, format, itemRenderer, defaultText } = props;
    if (!value) {
      return defaultText || "";
    }


    if (itemRenderer) {
      const rockChildrenConfig = map(value, (item, index) => {
        return {
          ...itemRenderer,
          value: item,
          $id: `${props.$id}-${index}`,
        } as RockConfig;
      })
      return renderRockChildren({context, rockChildrenConfig});
    } else if (format) {
      return map(value, item => {
        return MoveStyleUtils.fulfillVariablesInString(format, item);
      }).join(", ");
    }

    return "";
  },

  ...RapidArrayRendererMeta,
} as Rock;