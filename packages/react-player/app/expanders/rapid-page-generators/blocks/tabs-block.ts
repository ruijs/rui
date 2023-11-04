import type { GenerateBlockRuiConfigOption, BlockTabs, PageRockConfigGenerationContext, SdRpdMeta, SdRpdPageBase } from "~/proton";
import type { BlockComponent, BlockPreConfigure, RuiConfigGenerator } from "../block-types";
import type { RockConfig } from "@ruiapp/move-style";
import { forEach, map } from "lodash";

const block: BlockComponent = {
  type: "tabs",

  preConfig(page: SdRpdPageBase, block: BlockTabs, meta: SdRpdMeta, configure: BlockPreConfigure) {
    forEach(block.tabs, (blockTabItem) => {
      forEach(blockTabItem.children, (childBlock) => {
        configure(page, childBlock, meta, configure);
      })
    })
  },

  generateRuiConfig(context: PageRockConfigGenerationContext, option: GenerateBlockRuiConfigOption, generator: RuiConfigGenerator): RockConfig {
    const block = option.blockConfig as BlockTabs;
    const rockTabItems: any[] = [];

    forEach(block.tabs, (blockTabItem) => {
      const rockTabItem: any = {
        key: blockTabItem.code,
        label: blockTabItem.label,
        children: map(blockTabItem.children, (child) => {
          return generator(context, {
            blockConfig: child,
            pageConfig: option.pageConfig,
            entities: option.entities,
            dataDictionaries: option.dataDictionaries,
          }, generator);
        })
      };

      rockTabItems.push(rockTabItem);
    });

    const rock: RockConfig = {
      $id: block.code,
      $type: "antdTabs",
      items: rockTabItems,
    }

    return rock;
  }
};

export default block;