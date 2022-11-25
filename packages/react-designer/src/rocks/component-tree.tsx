import { Framework, Page, PageConfig, PageWithoutLayoutConfig, RockConfig, RockConfigBase, RockEvent, RockEventHandlerScript, RockMeta } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { useCallback, useMemo } from "react";
import DesignerStore from "../DesignerStore";

export interface ComponentTreeProps extends RockConfigBase {
  designingPage: Page;
  style?: any;
}

export type ComponentTreeNode = ComponentNode | SlotNode;

export interface ComponentNode {
  nodeType: "component";
  $id: string;
  $type?: string;
  label: string;
  children?: ComponentTreeNode[];
}

export interface SlotNode {
  nodeType: "slot";
  $id: string;
  label: string;
  children?: ComponentTreeNode[];
}

export default {
  $type: "designerComponentTree",

  renderer(props: ComponentTreeProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const designingPage: Page = props.designingPage;
    const designingPageConfig = designingPage.getConfig();

    const componentTree = useMemo(() => convertPageConfigToComponentTree(framework, designingPageConfig), [designingPageConfig]);

    const onComponentTreeNodeSelect: RockEventHandlerScript["script"] = useCallback((event: RockEvent) => {
      const componentId = event.args[0][0];
      page.getStore<DesignerStore>("designerStore").selectedComponentId = componentId;
    }, [componentTree]);

    const onComponentTreeNodeDrop: RockEventHandlerScript["script"] = useCallback((event: RockEvent) => {
      const { event: dragEvent, node, dragNode } = event.args[0];
      console.log({
        dragEvent,
        node,
        dragNode,
      })
    }, [componentTree]);

    const rockConfig: RockConfig = {
      $id: `${props.$id}-internal`,
      $type: "antdTree",
      fieldNames: { key: "$id", title: "label" },
      defaultExpandAll: true,
      treeData: componentTree,
      selectedKeys: [page.getStore<DesignerStore>("designerStore").selectedComponentId],
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

    return renderRock(framework, page, rockConfig);
  },
} as RockMeta;

export function convertPageConfigToComponentTree(framework: Framework, pageConfig: PageConfig) {
  const componentTree: ComponentTreeNode[] = [];
  const rockTree = (pageConfig as PageWithoutLayoutConfig).view;
  travalRockTree(framework, rockTree, componentTree);
  return componentTree;
}

function travalRockTree(framework: Framework, rockTree: RockConfig[], componentTree: ComponentTreeNode[]) {
  for (const rock of rockTree) {
    const component: ComponentTreeNode = {
      nodeType: "component",
      $id: rock.$id,
      $type: rock.$type,
      label: rock.$type,
    };

    const rockMeta = framework.getComponent(rock.$type);
    if (rockMeta.slots) {
      if (!component.children) {
        component.children = [];
      }

      for(const slotName in rockMeta.slots) {
        const slotNode: ComponentTreeNode = {
          nodeType: "slot",
          $id: `${rock.$id}.${slotName}`,
          label: `#${slotName}`,
        };
        component.children.push(slotNode);

        const slotChildren = rock[slotName];
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