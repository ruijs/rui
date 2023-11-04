import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdModal",

  slots: {
    footer: {
      allowMultiComponents: true,
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
          label: "okText",
          propName: "okText",
        },

        {
          $type: "textPropSetter",
          label: "cancelText",
          propName: "cancelText",
        },

        {
          $type: "numberPropSetter",
          label: "width",
          propName: "width",
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
          defaultValue: false,
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