import { Rock, SimpleRockConfig } from "@ruiapp/move-style";
import Tree, { TreeProps } from "./components/Tree";

/**
 * 树组件
 */
export interface TreeRockConfig extends SimpleRockConfig, TreeProps {}

export default {
  $type: "tree",

  props: {
    text: {
      valueType: "string",
      valueNotNull: true,
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

  Renderer: (context, props: TreeRockConfig) => {
    const {} = props;

    return <Tree {...props}></Tree>;
  },
} as Rock;
