import { RockMeta } from "@ruiapp/move-style";
import { SHOW_ROCK_TYPE } from "./show-types";

export default {
  $type: SHOW_ROCK_TYPE,

  props: {
    when: {
      valueType: "boolean",
      defaultValue: true,
    },
  },

  slots: {
    fallback: {
      allowMultiComponents: true,
      required: false,
    },
  },

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
} as RockMeta<typeof SHOW_ROCK_TYPE>;
