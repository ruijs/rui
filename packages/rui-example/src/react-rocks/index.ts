import { Rock } from "@ruiapp/move-style/source";

import colorPicker from "./color-picker";
import componentPropertiesPanel from "./component-properties-panel";

const config = {
  name: "react-rocks",
  title: "react-rocks",
  examples: [colorPicker, componentPropertiesPanel],
} as PKGConfig<Rock>;

export default config;
