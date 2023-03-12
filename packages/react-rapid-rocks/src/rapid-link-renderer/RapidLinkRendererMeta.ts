import { RockMeta } from "@ruijs/move-style";

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
          label: "linkText",
          propName: "linkText",
        },
        {
          $type: "textPropSetter",
          label: "linkUrl",
          propName: "linkUrl",
        },
      ],
    },
  ],
} as RockMeta;