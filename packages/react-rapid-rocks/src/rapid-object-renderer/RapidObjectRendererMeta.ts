import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "rapidObjectRenderer",

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "format",
          propName: "format",
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