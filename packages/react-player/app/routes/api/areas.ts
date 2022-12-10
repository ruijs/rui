import { MoveStyleUtils } from "@ruijs/move-style";

export function loader() {
  const areas = [
    { id: "Shanghai", name: "Shanghai" },
    { id: "Shanghai-Xuhui", name: "Xuhui", parent: "Shanghai" },
    { id: "Shanghai-Pudong", name: "Pudong", parent: "Shanghai" },
    { id: "Beijing", name: "Beijing" },
    { id: "Beijing-Haidian", name: "Haidian", parent: "Beijing" },
  ];

  return {
    data: MoveStyleUtils.listToTree(areas, { listParentField: "parent"})
  }
}