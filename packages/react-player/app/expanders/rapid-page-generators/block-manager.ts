import type { BlockComponent } from "./block-types";
import DataFormBlock from "./blocks/data-form-block";
import EntityListBlock from "./blocks/entity-list-block";
import ModalBlock from "./blocks/modal-block";
import TabsBlock from "./blocks/tabs-block";

const blockTypes: Record<string, BlockComponent> = {};
blockTypes[DataFormBlock.type] = DataFormBlock;
blockTypes[EntityListBlock.type] = EntityListBlock;
blockTypes[ModalBlock.type] = ModalBlock;
blockTypes[TabsBlock.type] = TabsBlock;

export function getBlock(blockType: string) {
  return blockTypes[blockType];
}