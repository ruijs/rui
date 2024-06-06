import { Rock } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { useState } from "react";

export default {
  $type: "colorPickerExample",

  Renderer(context, props, state) {
    const [color, setColor] = useState<string>("#fffff");

    return renderRock({
      context,
      rockConfig: {
        $type: "colorPicker",
        $id: "colorPicker_demo1",
        value: color,
        onChange: (v: string) => {
          setColor(v);
        },
      },
    });
  },
} as Rock;
