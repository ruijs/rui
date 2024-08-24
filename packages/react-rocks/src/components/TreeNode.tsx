import { TreeCmds, TreeNodeState } from "./Tree";
import { useState } from "react";
import { cx } from "../utils/classname-utility";

export interface TreeNodeProps<TNodeData> {
  tree?: TreeCmds<TNodeData>;
  data: TNodeData;
  level?: number;
}

function TreeNode<TNodeData>(props: TreeNodeProps<TNodeData>) {
  const { tree, data, level } = props;
  const {
    expandNodesByDefault,
    expandNodeOnDoubleClick,
    expandedKeys,
    keyField,
    labelField,
    childrenField,
    childrenAccessor,
    togglerRenderer,
    iconRenderer,
    actionsRenderer,
    notifyNodeActive,
  } = tree;
  const nodeKey = data[keyField];
  const [expanded, setExpanded] = useState(expandNodesByDefault || expandedKeys.includes(nodeKey));
  const [isMouseHover, setIsMouseHover] = useState(false);

  let childrenData: TNodeData[] | null = null;
  if (childrenAccessor) {
    childrenData = childrenAccessor(data);
  } else {
    childrenData = data[childrenField] || [];
  }

  const indentWidth = (level || 0) * 24 + 4;

  const isLeaf = !childrenData.length;
  const isActive = tree.activeKey === nodeKey;

  const onNodeToggle = () => {
    setExpanded(!expanded);
  };

  const onNodeClick = () => {
    notifyNodeActive(nodeKey);
  };

  const onNodeDoubleClick = () => {
    if (!isLeaf && expandNodeOnDoubleClick) {
      setExpanded(!expanded);
    }
  };

  const onNodeMouseEnter = () => {
    setIsMouseHover(true);
  };

  const onNodeMouseLeave = () => {
    setIsMouseHover(false);
  };

  const treeNodeState: TreeNodeState<TNodeData> = {
    expanded,
    isLeaf,
    isActive,
    isMouseHover,
    data,
  };

  const toggler = togglerRenderer && togglerRenderer(treeNodeState);
  const icon = iconRenderer && iconRenderer(treeNodeState);
  const actions = actionsRenderer && actionsRenderer(treeNodeState);

  return (
    <>
      <div
        className={cx("rui-tree-node", isActive && "rui-tree-node-active")}
        style={{ paddingLeft: indentWidth }}
        onClick={onNodeClick}
        onDoubleClick={onNodeDoubleClick}
        onMouseEnter={onNodeMouseEnter}
        onMouseLeave={onNodeMouseLeave}
      >
        {isLeaf ? (
          <span className="rui-tree-node-leaf"></span>
        ) : (
          <span className="rui-tree-node-toggler" onClick={onNodeToggle}>
            {toggler}
          </span>
        )}
        {icon && <span className="rui-tree-node-icon">{icon}</span>}
        <span className="rui-tree-node-label" style={styleNodeLabel}>
          {data[labelField]}
        </span>
        {actions && <span className="rui-tree-node-actions">{actions}</span>}
      </div>
      {expanded &&
        childrenData.map((childTreeNodeData) => {
          const childNodeKey = childTreeNodeData[keyField];
          return <TreeNode key={childNodeKey} tree={tree} level={level + 1} data={childTreeNodeData} />;
        })}
    </>
  );
}

const styleNodeLabel: React.CSSProperties = {};

export default TreeNode;
