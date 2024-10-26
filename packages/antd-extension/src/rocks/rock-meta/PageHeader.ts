import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdPageHeader",

  slots: {
    avatar: {
      allowMultiComponents: false,
      required: false,
    },

    backIcon: {
      allowMultiComponents: false,
      required: false,
    },

    tags: {
      allowMultiComponents: true,
      required: false,
    },

    extra: {
      allowMultiComponents: true,
      required: false,
    },

    footer: {
      allowMultiComponents: true,
      required: false,
    },
  },

  propertyPanels: [],
} as RockMeta;
