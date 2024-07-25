import { Framework, Page, PageConfig, RockConfig, RockConfigBase, RockEvent, RockEventHandlerScript, Rock } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { useCallback, useMemo } from "react";
import { DesignerStore } from "../stores/DesignerStore";

export interface ComponentTreeProps extends RockConfigBase {
  designingPage: Page;
  style?: any;
}

export type ComponentTreeNode = ComponentNode | SlotNode;

export interface ComponentNode {
  $nodeType: "component";
  $id: string;
  $type?: string;
  label: string;
  children?: ComponentTreeNode[];
}

export interface SlotNode {
  $nodeType: "slot";
  $id: string;
  $componentId: string;
  $slotPropName: string;
  label: string;
  children?: ComponentTreeNode[];
}

export default {
  $type: "designerComponentTree",

  Renderer(context, props: ComponentTreeProps) {
    const { framework, page } = context;
    const designingPage: Page = props.designingPage;
    const designingPageConfig = designingPage.getConfig();

    const componentTree = useMemo(() => convertPageConfigToComponentTree(framework, designingPageConfig), [designingPageConfig]);

    const onComponentTreeNodeSelect: RockEventHandlerScript["script"] = useCallback(
      (event: RockEvent) => {
        const [selectedKeys, { node }] = event.args as [string[], { node: ComponentTreeNode }];
        const isNodeSelected = selectedKeys.length !== 0;
        let selectedComponentId: string = null;
        let selectedSlotPropName: string = null;
        if (isNodeSelected) {
          if (node.$nodeType === "component") {
            selectedComponentId = node.$id;
            selectedSlotPropName = null;
          } else if (node.$nodeType === "slot") {
            selectedComponentId = node.$componentId;
            selectedSlotPropName = node.$slotPropName;
          }
        }
        const designerStore = page.getStore<DesignerStore>("designerStore");
        designerStore.setSelectedComponentTreeNode(selectedKeys[0], selectedComponentId, selectedSlotPropName);
      },
      [componentTree],
    );

    const onComponentTreeNodeDrop: RockEventHandlerScript["script"] = useCallback(
      (event: RockEvent) => {
        const { event: dragEvent, node, dragNode } = event.args[0];
        console.log({
          dragEvent,
          node,
          dragNode,
        });
      },
      [componentTree],
    );

    const rockConfig: RockConfig = {
      $id: `${props.$id}-internal`,
      $type: "antdTree",
      fieldNames: { key: "$id", title: "label" },
      defaultExpandAll: true,
      treeData: componentTree,
      selectedKeys: [page.getStore<DesignerStore>("designerStore").selectedComponentTreeNodeId],
      style: props.style,
      onSelect: {
        $action: "script",
        script: onComponentTreeNodeSelect,
      } as RockEventHandlerScript,
      onDrop: {
        $action: "script",
        script: onComponentTreeNodeDrop,
      } as RockEventHandlerScript,
    };

    return renderRock({ context, rockConfig });
  },
} as Rock;

export function convertPageConfigToComponentTree(framework: Framework, pageConfig: PageConfig) {
  const componentTree: ComponentTreeNode[] = [];
  const rockTree = pageConfig.view;
  travalRockTree(framework, rockTree, componentTree);
  return componentTree;
}

function travalRockTree(framework: Framework, rockTree: RockConfig[], componentTree: ComponentTreeNode[]) {
  for (const rock of rockTree) {
    const rockMeta = framework.getComponent(rock.$type);

    const rockLabel = rock.$name || rockMeta.name || rock.$type;
    const component: ComponentTreeNode = {
      $nodeType: "component",
      $id: rock.$id,
      $type: rock.$type,
      label: rockLabel,
    };

    if (rockMeta.slots) {
      if (!component.children) {
        component.children = [];
      }

      for (const slotPropName in rockMeta.slots) {
        const slotMeta = rockMeta.slots[slotPropName];
        let slotLabel = `#${slotPropName}`;
        if (slotMeta.name) {
          slotLabel += ` ${slotMeta.name}`;
        }
        const slotNode: ComponentTreeNode = {
          $nodeType: "slot",
          $id: `${rock.$id}.${slotPropName}`,
          $componentId: rock.$id,
          $slotPropName: slotPropName,
          label: slotLabel,
        };
        component.children.push(slotNode);

        const slotChildren = rock[slotPropName];
        if (slotChildren) {
          slotNode.children = [];
          if (Array.isArray(slotChildren)) {
            travalRockTree(framework, slotChildren, slotNode.children);
          } else {
            travalRockTree(framework, [slotChildren], slotNode.children);
          }
        }
      }
    }

    if (rock.children) {
      if (!component.children) {
        component.children = [];
      }

      if (Array.isArray(rock.children)) {
        travalRockTree(framework, rock.children, component.children);
      } else {
        travalRockTree(framework, [rock.children], component.children);
      }
    }
    componentTree.push(component);
  }
}
