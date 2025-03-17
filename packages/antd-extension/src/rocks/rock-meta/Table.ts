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

    summary: {
      allowMultiComponents: false,
      required: false,
      argumentNames: ["records"],
      argumentsToProps: true,
      toRenderProp: true,
    },
  },

  propertyPanels: [],
} as RockMeta;
