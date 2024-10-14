import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdDropdown",

  slots: {
    menu: {
      allowMultiComponents: false,
      required: true,
      withAdapter: true,
    },
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [],
    },
  ],
} as RockMeta;
