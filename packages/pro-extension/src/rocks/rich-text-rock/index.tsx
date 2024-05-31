import type { Rock } from "@ruiapp/move-style";
import Editor from "~/components/rich-text/editor";
import meta from "./meta";
import { RichTextEditorRockConfig } from "./type";

export default {
  Renderer(context, props: RichTextEditorRockConfig) {
    return <Editor {...props} />;
  },

  ...meta,
} as Rock;
