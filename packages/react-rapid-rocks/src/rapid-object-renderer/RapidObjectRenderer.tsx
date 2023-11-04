import { MoveStyleUtils, Rock } from "@ruiapp/move-style";
import RapidObjectRendererMeta from "./RapidObjectRendererMeta";
import { RapidObjectRendererRockConfig } from "./rapid-object-renderer-types";

export default {
  $type: "rapidObjectRenderer",

  Renderer(context, props: RapidObjectRendererRockConfig) {
    const { value, format, defaultText } = props;
    if (value) {
      if (!format) {
        return value.toString();
      }
      return MoveStyleUtils.fulfillVariablesInString(format, value);
    } else {
      return defaultText || "";
    }
  },

  ...RapidObjectRendererMeta,
} as Rock;