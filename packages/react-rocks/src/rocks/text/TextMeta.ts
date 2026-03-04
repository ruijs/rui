import type { RockMeta } from "@ruiapp/move-style";
import { TEXT_ROCK_TYPE } from "./text-types";

export default {
  $type: TEXT_ROCK_TYPE,

  props: {
    text: {
      valueType: "string",
      valueNotNull: true,
    },
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "text",
          propName: "text",
        },
      ],
    },
  ],
} as RockMeta;
