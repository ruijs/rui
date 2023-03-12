import type { RockConfig, StoreConfig } from "@ruijs/move-style";
import type { Block, SdRpdDataDictionary, SdRpdEntity, SdRpdPage } from "~/proton";

export interface PageRockConfigGenerationContext {
  dataStores: StoreConfig[];
  view: RockConfig[];
}

export interface GenerateRuiPageConfigOption<TPage = SdRpdPage> {
  sdPage: TPage;
  entities: SdRpdEntity[];
  dataDictionaries: SdRpdDataDictionary[];
}

export interface GenerateBlockRuiConfigOption {
  pageConfig: SdRpdPage;
  blockConfig: Block;
  entities: SdRpdEntity[];
  dataDictionaries: SdRpdDataDictionary[];
}