import type { BlockDataListAction } from "./block-entity-list-types";

export type BlockPageToolbar<TBlock> = {
  items: BlockButtonToolbarItem<TBlock>[];
}

export type BlockButtonToolbarItem<TBlock> = 
  | BlockDataListAction<TBlock>;
