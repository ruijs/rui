import { Rock, RockMetaSlots, SimpleRockConfig } from "@ruiapp/move-style";
import Tree, { TreeProps } from "./components/Tree";
import { convertToEventHandlers, convertToSlotProps } from "@ruiapp/react-renderer";

/**
 * 树组件
 */
export interface TreeRockConfig extends SimpleRockConfig, TreeProps {}

const slotsMeta: RockMetaSlots = {
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
};

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

  slots: slotsMeta,

  Renderer: (context, props: TreeRockConfig) => {
    const {} = props;
    const eventHandlers = convertToEventHandlers({ context, rockConfig: props });
    const slotProps = convertToSlotProps({ context, rockConfig: props, slotsMeta });

    const treeProps = {
      ...props,
      ...eventHandlers,
      ...slotProps,
    };

    return <Tree {...treeProps}></Tree>;
  },
} as Rock;
