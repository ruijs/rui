import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "rapidLinkRenderer",

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "defaultText",
          propName: "defaultText",
        },
        {
          $type: "textPropSetter",
          label: "text",
          propName: "text",
        },
        {
          $type: "textPropSetter",
          label: "url",
          propName: "url",
        },
      ],
    },
  ],
} as RockMeta;