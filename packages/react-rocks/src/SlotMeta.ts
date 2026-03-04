import { RockMeta } from "@ruiapp/move-style";
import { SLOT_ROCK_TYPE } from "./slot-types";

export default {
  $type: SLOT_ROCK_TYPE,

  props: {
    slotName: {
      valueType: "string",
      defaultValue: "children",
    },
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "slotName",
          propName: "slotName",
        },
      ],
    },
  ],
} as RockMeta;
