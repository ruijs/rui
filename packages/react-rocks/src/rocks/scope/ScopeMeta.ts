import { RockMeta } from "@ruiapp/move-style";
import { SCOPE_ROCK_TYPE } from "./scope-types";

export default {
  $type: SCOPE_ROCK_TYPE,

  slots: {
    children: {
      allowMultiComponents: true,
      lazyCreate: true,
    },
  },

  props: {},
} as RockMeta;
