import { MoveStyleUtils, Rock } from "@ruiapp/move-style";
import RapidTextRendererMeta from "./RapidTextRendererMeta";
import { RapidTextRendererConfig } from "./rapid-text-renderer-types";
import { isNull, isObject, isUndefined } from "lodash";

export default {
  $type: "rapidTextRenderer",

  Renderer(context, props: RapidTextRendererConfig) {
    const { value, defaultText } = props;
    if (isUndefined(value) || isNull(value)) {
      return defaultText || "";
    }

    // if (props.format && isObject(value)) {
    //   return MoveStyleUtils.fulfillVariablesInString(props.format, value);
    // }

    return value.toString();
  },

  ...RapidTextRendererMeta,
} as Rock;