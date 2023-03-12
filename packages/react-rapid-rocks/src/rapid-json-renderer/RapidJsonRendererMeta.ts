import { RockMeta } from "@ruijs/move-style";

export default {
  $type: "rapidJsonRenderer",

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "jsonPropSetter",
          label: "value",
          propName: "value",
        },

        {
          $type: "textPropSetter",
          label: "defaultText",
          propName: "defaultText",
        },
      ],
    },
  ],
} as RockMeta;