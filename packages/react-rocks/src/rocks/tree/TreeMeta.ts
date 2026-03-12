import { RockMeta } from "@ruiapp/move-style";
import { TREE_ROCK_TYPE } from "./tree-types";

export default {
  $type: TREE_ROCK_TYPE,

  props: {},

  slots: {
    togglerRenderer: {
      required: false,
      allowMultiComponents: false,
      toRenderProp: true,
      argumentsToProps: true,
      argumentNames: ["treeNodeState"],
    },

    iconRenderer: {
      required: false,
      allowMultiComponents: false,
      toRenderProp: true,
      argumentsToProps: true,
      argumentNames: ["treeNodeState"],
    },

    actionsRenderer: {
      required: false,
      allowMultiComponents: true,
      toRenderProp: true,
      argumentsToProps: true,
      argumentNames: ["treeNodeState"],
    },
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "text",
          propName: "text",
        },
      ],
    },
  ],
} as RockMeta<typeof TREE_ROCK_TYPE>;
