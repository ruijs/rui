import type { BlockDataForm } from "./block-data-form-types";
import type { BlockEntityList } from "./block-entity-list-types";
import type { BlockModal } from "./block-modal-types";
import type { BlockTabs } from "./block-tabs-types";

export * from "./block-action-types";
export * from "./block-data-form-types";
export * from "./block-entity-list-types";
export * from "./block-modal-types";
export * from "./block-search-form-types";
export * from "./block-tabs-types";
export * from "./block-toolbar-types";

export type BlockTypes = BlockTabs | BlockDataForm | BlockEntityList | BlockModal;

export type Block = BlockTabs<BlockTypes> | BlockDataForm | BlockEntityList<BlockTypes> | BlockModal;