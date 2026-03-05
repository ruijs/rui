import { RockMeta } from "@ruiapp/move-style";
import { RUI_ROCK_TYPE } from "./rui-types";

export default {
  $type: RUI_ROCK_TYPE,

  props: {
    framework: {
      valueType: "object",
      valueNotNull: true,
    },
    pageConfig: {
      valueType: "object",
      valueNotNull: true,
    },
  },
} as RockMeta;
