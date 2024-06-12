import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdAlert",

  slots: {
    icon: {
      allowMultiComponents: false,
      required: false,
    },

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
          $type: "selectPropSetter",
          label: "type",
          propName: "type",
          options: [
            {
              label: "success",
              value: "success",
            },
            {
              label: "info",
              value: "info",
            },
            {
              label: "warning",
              value: "warning",
            },
            {
              label: "error",
              value: "error",
            },
          ],
        },

        {
          $type: "textPropSetter",
          label: "message",
          propName: "message",
        },

        {
          $type: "textPropSetter",
          label: "description",
          propName: "description",
        },

        {
          $type: "textPropSetter",
          label: "closeText",
          propName: "closeText",
        },

        {
          $type: "switchPropSetter",
          label: "showIcon",
          propName: "showIcon",
        },

        {
          $type: "switchPropSetter",
          label: "closable",
          propName: "closable",
        },
      ],
    },
  ],
} as RockMeta;
