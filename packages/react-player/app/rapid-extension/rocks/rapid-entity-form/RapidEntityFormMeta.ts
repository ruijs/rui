import type { RockMeta } from "@ruijs/move-style";
import { RapidRocks } from "@ruijs/react-rapid-rocks";


export default {
  $type: "rapidEntityForm",

  slots: {
    ...RapidRocks["rapidForm"].slots,
  },

  propertyPanels: [
    ...RapidRocks["rapidForm"].propertyPanels!,
  ]
} as RockMeta;