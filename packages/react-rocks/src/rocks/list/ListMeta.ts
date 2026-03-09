import type { RockMeta } from "@ruiapp/move-style";
import { LIST_ROCK_TYPE } from "./list-types";

export default {
  $type: LIST_ROCK_TYPE,

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [],
    },
  ],

  slots: {
    itemContainer: {
      required: false,
      allowMultiComponents: false,
      toRenderProp: true,
      argumentsToProps: true,
      argumentNames: ["item", "list", "index", "key", "children"],
    },

    item: {
      required: false,
      allowMultiComponents: false,
      toRenderProp: true,
      argumentsToProps: true,
      argumentNames: ["item", "list", "index", "key"],
    },

    separator: {
      required: false,
      allowMultiComponents: false,
    },

    header: {
      required: false,
      allowMultiComponents: true,
    },

    footer: {
      required: false,
      allowMultiComponents: true,
    },
  },
} as RockMeta;
