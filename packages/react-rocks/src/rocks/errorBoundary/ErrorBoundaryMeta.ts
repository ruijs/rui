import { RockMeta } from "@ruiapp/move-style";
import { ERROR_BOUNDARY_ROCK_TYPE } from "./error-boundary-types";

export default {
  $type: ERROR_BOUNDARY_ROCK_TYPE,

  slots: {
    fallback: {
      allowMultiComponents: true,
      required: false,
    },
  },
} as RockMeta;
