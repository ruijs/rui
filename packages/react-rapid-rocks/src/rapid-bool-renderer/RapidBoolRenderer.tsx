import { Rock, SimpleRockConfig } from "@ruiapp/move-style";
import RapidBoolRendererMeta from "./RapidBoolRendererMeta";

export interface RapidReferenceRendererProps extends SimpleRockConfig {
  value: boolean | null | undefined;
  strictEquals?: boolean;
  trueText?: string;
  falseText?: string;
  defaultText?: string;
}

export default {
  $type: "rapidBoolRenderer",

  Renderer(context, props: RapidReferenceRendererProps) {
    const { value, strictEquals, trueText, falseText, defaultText } = props;
    if (strictEquals) {
      if (value === true) {
        return trueText || "true";
      } else if (value === false) {
        return falseText || "false";
      } else {
        return defaultText || "";
      }
    } else {
      if (value) {
        return trueText || "true";
      } else {
        return falseText || "false";
      }
    }
  },

  ...RapidBoolRendererMeta,
} as Rock;