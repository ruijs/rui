import { RockMeta, CommonProps } from "@ruiapp/move-style";
import { LABEL_ROCK_TYPE } from "./label-types";

export default {
  $type: LABEL_ROCK_TYPE,

  props: {
    text: {
      valueType: "string",
      valueNotNull: true,
    },
    ...CommonProps.TextStyleProps,
  },
} as RockMeta<typeof LABEL_ROCK_TYPE>;
