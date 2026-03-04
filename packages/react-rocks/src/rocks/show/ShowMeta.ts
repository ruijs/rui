import { RockMeta } from "@ruiapp/move-style";
import { SHOW_ROCK_TYPE } from "./show-types";

export default {
  $type: SHOW_ROCK_TYPE,

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "switchPropSetter",
          label: "when",
          propName: "when",
        },
      ],
    },
  ],

  slots: {
    fallback: {
      required: false,
      allowMultiComponents: true,
    },
  },
} as RockMeta;
