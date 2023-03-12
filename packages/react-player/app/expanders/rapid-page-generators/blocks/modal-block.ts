import type { GenerateBlockRuiConfigOption, BlockTabs, PageRockConfigGenerationContext, SdRpdMeta, SdRpdPageBase, BlockModal, Block } from "~/proton";
import type { BlockComponent, BlockPreConfigure, RuiConfigGenerator } from "../block-types";
import type { RockConfig } from "@ruijs/move-style";
import { forEach, map } from "lodash";

const block: BlockComponent = {
  type: "modal",

  preConfig(page: SdRpdPageBase, block: Block, meta: SdRpdMeta, configure: BlockPreConfigure) {
    const modalBlock: BlockModal = block as any;
    forEach(modalBlock.children, (childBlock) => {
      configure(page, childBlock, meta, configure);
    })
  },

  generateRuiConfig(context: PageRockConfigGenerationContext, option: GenerateBlockRuiConfigOption, generator: RuiConfigGenerator): RockConfig {
    const block: BlockModal = option.blockConfig as any;
    const modalChildrenRocks = map(block.children, (childBlock) => {
      return generator(context, {
        blockConfig: childBlock,
        pageConfig: option.pageConfig,
        entities: option.entities,
        dataDictionaries: option.dataDictionaries,
      }, generator);
    });

    const rock: RockConfig = {
      $id: block.code,
      $type: "antdModal",
      title: block.title,
      children: modalChildrenRocks,
      onOk: block.onOk,
      onCancel: block.onCancel,
      $exps: {
        open: `$scope.vars["modal-${block.code}-open"]`,
      }
    }

    return rock;
  }
};

export default block;