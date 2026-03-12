import { RockMeta } from "@ruiapp/move-style";
import { SR_ROCK_TYPE } from "./sr-types";

export default {
  $type: SR_ROCK_TYPE,

  props: {
    name: {
      valueType: "string",
      valueNotNull: true,
    },

    ns: {
      valueType: "string",
      valueNotNull: false,
    },

    params: {
      valueType: "object",
      valueNotNull: false,
    },
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "ns",
          propName: "ns",
        },
        {
          $type: "textPropSetter",
          label: "name",
          propName: "name",
        },
        {
          $type: "jsonPropSetter",
          label: "params",
          propName: "params",
        },
      ],
    },
  ],
} as RockMeta<typeof SR_ROCK_TYPE>;
