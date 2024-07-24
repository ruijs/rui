import { Rock } from "@ruiapp/move-style";

import declarativeRock from "./declarative-rock";
import reusedComponent from "./reused-component";

export default {
  name: "react-renderer",
  title: "react-renderer",
  examples: [declarativeRock, reusedComponent],
} as PKGConfig<Rock>;
