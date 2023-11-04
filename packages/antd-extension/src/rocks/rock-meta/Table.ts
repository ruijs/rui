import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdTable",

  slots: {
    rowSelection: {
      allowMultiComponents: false,
      required: false,
      withAdapter: true,
      adapterSlots: ["columnTitle"],
    },
  },

  propertyPanels: [
  ]
} as RockMeta;