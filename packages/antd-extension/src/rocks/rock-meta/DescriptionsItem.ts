import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdDescriptionsItem",

  slots: {
    children: {
      allowMultiComponents: true,
      earlyCreate: true,
    },
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "label",
          propName: "label",
        },
      ],
    }
  ]
} as RockMeta;