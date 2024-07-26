import { Rock } from "@ruiapp/move-style";
import { isNull, isUndefined } from "lodash";

export interface TextPropRendererRockConfig {
  value: string | Record<string, any> | null | undefined;

  defaultText?: string;
}

export default {
  $type: "textPropRenderer",

  Renderer(context, props: TextPropRendererRockConfig) {
    const { value, defaultText } = props;
    if (isUndefined(value) || isNull(value)) {
      return defaultText || "";
    }

    return value.toString();
  },
} as Rock;
