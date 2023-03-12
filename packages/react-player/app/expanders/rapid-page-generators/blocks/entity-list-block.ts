import type { GenerateBlockRuiConfigOption, PageRockConfigGenerationContext, SdRpdMeta, SdRpdPageBase, BlockEntityList } from "~/proton";
import type { BlockComponent, BlockPreConfigure, RuiConfigGenerator } from "../block-types";
import type { RockConfig } from "@ruijs/move-style";
import type { RapidEntityListRockConfig } from "~/rapid-extension/rocks/rapid-entity-list/rapid-entity-list-types";
import { get } from "lodash";

const block: BlockComponent = {
  type: "entityList",

  preConfig(page: SdRpdPageBase, block: BlockEntityList, meta: SdRpdMeta, configure: BlockPreConfigure) {
  },

  generateRuiConfig(context: PageRockConfigGenerationContext, option: GenerateBlockRuiConfigOption, generator: RuiConfigGenerator): RockConfig {
    const { blockConfig } = option;
    const entityListConfig = blockConfig as BlockEntityList;
    const dataSourceCode = entityListConfig.dataSourceCode || "list";
    const pageSize = get(entityListConfig, "pageSize", 10);
    const entityListRockConfig: RapidEntityListRockConfig = {
      ...entityListConfig,
      dataSourceCode,
      pageSize,
      $type: "rapidEntityList",
      $id: entityListConfig.code,
    };
  
    return entityListRockConfig;
  }
};

export default block;