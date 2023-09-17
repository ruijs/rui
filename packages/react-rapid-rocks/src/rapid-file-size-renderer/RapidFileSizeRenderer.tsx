import { MoveStyleUtils, Rock } from "@ruijs/move-style";
import RapidFileSizeRendererMeta from "./RapidFileSizeRendererMeta";
import { RapidFileSizeRendererConfig } from "./rapid-file-size-renderer-types";
import { isNull, isObject, isUndefined } from "lodash";
import { formatFileSize } from "../utility";

export default {
  $type: "rapidFileSizeRenderer",

  Renderer(context, props) {
    const { value, decimalPlaces, defaultText } = props;
    if (isUndefined(value) || isNull(value)) {
      return defaultText || "";
    }

    return formatFileSize(value, decimalPlaces || 2);
  },

  ...RapidFileSizeRendererMeta,
} as Rock<RapidFileSizeRendererConfig>;