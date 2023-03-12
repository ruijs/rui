import type { Block, SdRpdPage, SdRpdMeta, SdRpdPageBase } from "~/proton";
import type { BlockPreConfigure } from "./block-types";
import { forEach } from "lodash";
import { getBlock } from "./block-manager";

export function preConfigRapidPage(page: SdRpdPage, meta: SdRpdMeta) {
  const blocks = page.blocks;
  if (blocks) {
    forEach(blocks, (blockConfig) => {
      preConfigRapidBlock(page, blockConfig, meta, preConfigRapidBlock)
    })
  }

  const materials = page.materials;
  if (materials) {
    forEach(materials, (blockConfig) => {
      preConfigRapidBlock(page, blockConfig, meta, preConfigRapidBlock)
    })
  }
}

function preConfigRapidBlock(page: SdRpdPageBase, blockConfig: Block, meta: SdRpdMeta, configure: BlockPreConfigure) {
  const block = getBlock(blockConfig.type);
  if (!block) {
    console.warn(`Failed to pre-config rapid block with type ${blockConfig.type}`);
    return;
  }

  block.preConfig(page, blockConfig as any, meta, configure);
}