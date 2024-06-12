import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdTabs",

  slots: {
    items: {
      allowMultiComponents: true,
      required: false,
      withAdapter: true,
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
              label: "line",
              value: "line",
            },
            {
              label: "card",
              value: "card",
            },
            {
              label: "editable-card",
              value: "editable-card",
            },
          ],
          defaultValue: "line",
        },

        {
          $type: "selectPropSetter",
          label: "size",
          propName: "size",
          options: [
            {
              label: "large",
              value: "large",
            },
            {
              label: "middle",
              value: "middle",
            },
            {
              label: "small",
              value: "small",
            },
          ],
          defaultValue: "middle",
        },
      ],
    },
  ],
} as RockMeta;
