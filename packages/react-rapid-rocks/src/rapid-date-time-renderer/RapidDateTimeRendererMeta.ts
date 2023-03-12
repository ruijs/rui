import { RockMeta } from "@ruijs/move-style";

export default {
  $type: "rapidDateTimeRenderer",

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "format",
          propName: "format",
        },
      ],
    },
  ],
} as RockMeta;