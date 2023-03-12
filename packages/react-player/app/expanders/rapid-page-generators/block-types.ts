import type { RockConfig } from "@ruijs/move-style";
import type { GenerateBlockRuiConfigOption, PageRockConfigGenerationContext, Block, SdRpdMeta, SdRpdPageBase } from "~/proton";

export type BlockPreConfigure = (page: SdRpdPageBase, block: Block, meta: SdRpdMeta, configure: BlockPreConfigure) => void;
export type RuiConfigGenerator = (context: PageRockConfigGenerationContext, option: GenerateBlockRuiConfigOption, generator: RuiConfigGenerator) => RockConfig;

export interface BlockComponent {
  type: string;

  preConfig(page: SdRpdPageBase, blockConfig: Block, meta: SdRpdMeta, configure: BlockPreConfigure): void;

  generateRuiConfig(context: PageRockConfigGenerationContext, option: GenerateBlockRuiConfigOption, generator: RuiConfigGenerator): RockConfig;
}