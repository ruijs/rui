import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdTabsTabPane",

  slots: {
    closeIcon: {
      allowMultiComponents: false,
      required: false,
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

        {
          $type: "textPropSetter",
          label: "key",
          propName: "key",
        },

        {
          $type: "switchPropSetter",
          label: "disabled",
          propName: "disabled",
        },

        {
          $type: "switchPropSetter",
          label: "forceRender",
          propName: "forceRender",
        },
      ],
    },
  ],
} as RockMeta;
