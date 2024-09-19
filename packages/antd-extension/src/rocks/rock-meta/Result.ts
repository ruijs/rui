import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdResult",

  slots: {
    extra: {
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
          label: "title",
          propName: "title",
        },

        {
          $type: "textPropSetter",
          label: "subTitle",
          propName: "subTitle",
        },

        {
          $type: "selectPropSetter",
          label: "status",
          propName: "status",
          options: [
            {
              label: "success",
              value: "success",
            },
            {
              label: "error",
              value: "error",
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
              label: "404",
              value: "404",
            },
            {
              label: "403",
              value: "403",
            },
            {
              label: "500",
              value: "500",
            },
          ],
          defaultValue: "success",
        },
      ],
    },
  ],
} as RockMeta;
