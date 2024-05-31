import { Rock } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { useState } from "react";

const Example = {
  $type: "richTextEditorExample",

  Renderer(context, props, state) {
    const [text, setText] = useState<string>("");

    return renderRock({
      context,
      rockConfig: {
        $type: "richTextEditor",
        $id: "richTextEditor_demo1",
        width: 800,
        value: text,
        onChange: (v: string) => {
          setText(v);
        },
      },
    });
  },
} as Rock;

export default {
  name: "RichText",
  title: "RichText",
  componentRock: Example,
} as PKGConfig<Rock>["examples"][0];
