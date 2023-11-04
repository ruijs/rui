import { Rock } from "@ruiapp/move-style";
import RapidJsonRendererMeta from "./RapidJsonRendererMeta";
import { RapidJsonRendererConfig } from "./rapid-json-renderer-types";

export default {
  $type: "rapidJsonRenderer",

  Renderer(context, props: RapidJsonRendererConfig) {
    const { value, defaultText } = props;
    if (value) {
      return <pre>{JSON.stringify(value, null, 2)}</pre>;
    } else {
      return defaultText || "";
    }
  },

  ...RapidJsonRendererMeta,
} as Rock;