import { cloneDeep, get } from "lodash";

export interface ListToTreeOptions {
  listIdField?: string;
  listParentField?: string;
  treeChildrenField?: string;
}

export default function listToTree<TListItem = any, TTreeNode = TListItem>(list: TListItem[], options: ListToTreeOptions): TTreeNode[] {
  if (!list) {
    return [];
  }

  const { listIdField = "id", listParentField = "parentId", treeChildrenField = "children" } = options;
  const mapOfTreeNode = new Map();

  list = cloneDeep(list);
  for (const item of list) {
    item["key"] = item[listIdField];
    const itemId = get(item, listIdField);
    let node = mapOfTreeNode.get(itemId);
    if (node) {
      console.warn(`Duplicated list item with id '${itemId}'.`);
      continue;
    }

    mapOfTreeNode.set(itemId, item);
  }

  for (const item of list) {
    const itemParentId = get(item, listParentField);
    if (!itemParentId) {
      continue;
    }

    const parentNode = mapOfTreeNode.get(itemParentId);
    if (!parentNode) {
      console.warn(`Parent node with id '${itemParentId}' was not found.`);
      continue;
    }
    let children = parentNode[treeChildrenField];
    if (!children) {
      children = parentNode[treeChildrenField] = [];
    }
    children.push(item);
  }

  const tree = [];
  for (const item of list) {
    if (!get(item, listParentField)) {
      tree.push(item);
    }
  }

  return tree;
}
