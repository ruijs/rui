import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdBadge",

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "numberPropSetter",
          label: "count",
          propName: "count",
        },

        {
          $type: "switchPropSetter",
          label: "dot",
          propName: "dot",
        },

        {
          $type: "textPropSetter",
          label: "status",
          propName: "status",
        },

        {
          $type: "textPropSetter",
          label: "text",
          propName: "text",
        },
      ],
    },
  ],
} as RockMeta;
