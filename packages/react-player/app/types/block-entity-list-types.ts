import type { RapidEntityListConfig } from "~/rapid-extension/rocks/rapid-entity-list/rapid-entity-list-types";
import { RemoveField } from "./type-utils";
import { RockPropExpressions } from "@ruijs/move-style";

export type BlockEntityList<TBlock=any> = RemoveField<RapidEntityListConfig, "dataSourceCode"> & {
  type: "entityList";
  code: string;

  /**
   * 数据源。
   */
  dataSourceCode?: string;

  $exps?: RockPropExpressions;
}

// export type BlockDataListAction<TBlock> = BlockDataListActionLink | BlockDataListActionPageLink | BlockDataListActionInteraction<TBlock>;

// export type BlockDataListActionBase = {
//   code: string;
//   label: string;
//   icon?: string;
//   actionStyle?: "default" | "primary" | "dashed" | "ghost" | "link"
//   danger?: boolean;
//   disabled?: boolean;
// }

// export type BlockDataListActionLink = BlockDataListActionBase & {
//   actionType: "link";
//   url: string;
// }

// export type BlockDataListActionPageLink = BlockDataListActionBase & {
//   actionType: "pageLink";
//   pageCode: string;
// }

// export type BlockDataListActionInteraction<TBlock> = BlockDataListActionBase & {
//   actionType: "interaction";
//   interactionMode?: "drawer" | "modal",
//   interactionContent?: TBlock[];
//   interactionContentFrom?: {
//     materialCode: string,
//   };
// };

