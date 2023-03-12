import { get } from "lodash";

export interface ArrayToTreeOption {
  parentField?: string;
  keyField?: string;
  childrenField?: string;
}

export function arrayToTree<TA>(arr: TA[], parent?: any, option?: ArrayToTreeOption): TA[] {
  const { parentField = "parent", keyField = "id", childrenField = "children" } = option || {};

  return arr.filter(item => {
      return get(item, parentField, null) === parent
    })
    .map((child:any) => {
      return {
        ...child,
        [childrenField]: arrayToTree(arr, child[keyField], option)
      }
    });
}