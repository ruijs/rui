import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdTree",

  slots: {
    titleRender: {
      allowMultiComponents: false,
      required: false,
      toRenderProp: true,
      argumentsToProps: true,
      argumentNames: ["nodeData"],
    },
  },

  propertyPanels: [],
} as RockMeta;
