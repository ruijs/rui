import type { RockMeta } from "@ruiapp/move-style";
import { RapidRocks } from "@ruiapp/react-rapid-rocks";


export default {
  $type: "rapidEntityForm",

  slots: {
    ...RapidRocks["rapidForm"].slots,
  },

  propertyPanels: [
    ...RapidRocks["rapidForm"].propertyPanels!,
  ]
} as RockMeta;