import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdDrawer",

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
          $type: "numberPropSetter",
          label: "width",
          propName: "width",
        },

        {
          $type: "numberPropSetter",
          label: "height",
          propName: "height",
        },

        {
          $type: "selectPropSetter",
          label: "placement",
          propName: "placement",
          options: [
            {
              label: "top",
              value: "top",
            },
            {
              label: "right",
              value: "right",
            },
            {
              label: "bottom",
              value: "bottom",
            },
            {
              label: "left",
              value: "left",
            },
          ],
          defaultValue: 'right',
        },

        {
          $type: "switchPropSetter",
          label: "open",
          propName: "open",
        },

        {
          $type: "switchPropSetter",
          label: "closable",
          propName: "closable",
          defaultValue: true,
        },

        {
          $type: "switchPropSetter",
          label: "keyboard",
          propName: "keyboard",
          defaultValue: true,
        },

        {
          $type: "switchPropSetter",
          label: "mask",
          propName: "mask",
          defaultValue: true,
        },

        {
          $type: "switchPropSetter",
          label: "maskClosable",
          propName: "maskClosable",
          defaultValue: false,
        },
      ],
    }
  ]
} as RockMeta;