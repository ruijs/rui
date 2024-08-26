import { ReactNode, useRef, useState } from "react";
import TreeNode from "./TreeNode";

import "./Tree.css";

export type DefaultTreeNodeData = Record<string, any>;

export type TreeNodeState<TNodeData> = {
  expanded: boolean;
  isLeaf: boolean;
  isActive: boolean;
  isMouseHover: boolean;
  data: TNodeData;
};

export type TreeNodePartRenderer<TNodeData> = (nodeData: TreeNodeState<TNodeData>) => ReactNode;

export interface TreeProps<TNodeData = DefaultTreeNodeData> {
  width?: string;
  initialData: TNodeData[];
  expandNodesByDefault?: boolean;
  expandNodeOnDoubleClick?: boolean;
  defaultExpandedKeys?: string[];
  defaultSelectedKeys?: string[];
  defaultActiveKey?: string;

  // Node props
  keyField?: string;
  labelField?: string;
  childrenField?: string;
  childrenAccessor?: (TreeNodeData) => TNodeData[];
  togglerRenderer?: TreeNodePartRenderer<TNodeData>;
  iconRenderer?: TreeNodePartRenderer<TNodeData>;
  actionsRenderer?: TreeNodePartRenderer<TNodeData>;

  onSelect?: (selectedKeys: string[]) => void;
}

export interface TreeCmds<TNodeData> {
  keyField?: string;
  labelField?: string;
  childrenField?: string;
  childrenAccessor?: (TreeNodeData) => TNodeData[];
  togglerRenderer?: TreeNodePartRenderer<TNodeData>;
  iconRenderer?: TreeNodePartRenderer<TNodeData>;
  actionsRenderer?: TreeNodePartRenderer<TNodeData>;
  expandNodesByDefault: boolean;
  expandNodeOnDoubleClick: boolean;
  expandedKeys: string[];
  selectedKeys: string[];
  activeKey?: string;
  notifyNodeExpand: (nodeKey: string) => void;
  notifyNodeCollapse: (nodeKey: string) => void;
  notifyNodeActive: (nodeKey: string) => void;
}

function Tree<TNodeData>(props: TreeProps<TNodeData>) {
  const {
    width = "100%",
    initialData = [],
    keyField = "id",
    labelField = "name",
    childrenField = "children",
    childrenAccessor,
    togglerRenderer,
    iconRenderer,
    actionsRenderer,
    expandNodesByDefault = false,
    expandNodeOnDoubleClick = false,
    defaultExpandedKeys = [],
    defaultSelectedKeys = [],
    defaultActiveKey,
  } = props;
  const [expandedKeys] = useState(defaultExpandedKeys);
  const [selectedKeys] = useState(defaultSelectedKeys);
  const [activeKey, setActiveKey] = useState(defaultActiveKey);

  const notifyNodeExpand = (nodeKey: string) => {};
  const notifyNodeCollapse = (nodeKey: string) => {};
  const notifyNodeActive = (nodeKey: string) => {
    setActiveKey(nodeKey);
  };

  const treeCmds: TreeCmds<TNodeData> = {
    keyField,
    labelField,
    childrenField,
    childrenAccessor,
    togglerRenderer,
    iconRenderer,
    actionsRenderer,
    expandNodesByDefault,
    expandNodeOnDoubleClick,
    expandedKeys,
    selectedKeys,
    activeKey,
    notifyNodeExpand,
    notifyNodeCollapse,
    notifyNodeActive,
  };

  return (
    <div style={{ width }} className="rp-tree">
      {initialData.map((treeNodeData) => {
        return <TreeNode key={treeNodeData[keyField]} tree={treeCmds} level={0} data={treeNodeData} />;
      })}
    </div>
  );
}

export default Tree;
