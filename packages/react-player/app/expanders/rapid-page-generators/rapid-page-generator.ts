import type { SdRapidPage, SdRpdMeta, SdRpdPage } from "~/proton";
import type { GenerateBlockRuiConfigOption, GenerateRuiPageConfigOption, PageRockConfigGenerationContext } from "~/expanders/rui-page-generator-types";
import { preConfigRapidPage } from "./page-pre-configure";
import type { PageConfig, RockConfig } from "@ruijs/move-style";
import { forEach } from "lodash";
import type { RuiConfigGenerator } from "./block-types";
import { getBlock } from "./block-manager";

export function generateRapidPage(option: GenerateRuiPageConfigOption<SdRapidPage>) {
  const sdRpdMeta: SdRpdMeta = {
    entities: option.entities,
    dictionaries: option.dataDictionaries,
  };
  preConfigRapidPage(option.sdPage, sdRpdMeta);
  const { sdPage, entities, dataDictionaries } = option;

  const rockConfigGenerationContext: PageRockConfigGenerationContext = {
    dataStores: [],
    view: [],
  };

  // TODO: should move this into rui-page-generator.ts
  generateRockConfigForPageBlocks(rockConfigGenerationContext, sdPage, {entities, dictionaries: dataDictionaries})

  const ruiPageConfig: PageConfig = {
    $id: sdPage.code,
    stores: [...rockConfigGenerationContext.dataStores, ...(sdPage.stores || [])],
    view: [
      {
        $id: `${sdPage.code}-scope`,
        $type: "scope",
        children: [
          ...(sdPage.view ? (sdPage.view.length ? sdPage.view : [sdPage.view]) : []) as RockConfig[],
          ...rockConfigGenerationContext.view,
        ].map((child, index) => {
          return {
            $type: "box",
            $id: `page-section-${index + 1}`,
            className: "rui-page-section",
            children: child,
          }
        })
      },
    ],
    eventSubscriptions: sdPage.eventSubscriptions,
  };

  return ruiPageConfig;
}


export function generateRockConfigForPageBlocks(context: PageRockConfigGenerationContext, page: SdRpdPage, meta: SdRpdMeta) {
  const blocks = page.blocks;
  if (blocks) {
    forEach(blocks, (blockConfig, index) => {
      const blockRuiConfig = generateRuiConfig(context, {
        pageConfig: page,
        blockConfig: blockConfig,
        entities: meta.entities,
        dataDictionaries: meta.dictionaries,
      }, generateRuiConfig);

      context.view.push(blockRuiConfig);
    })
  }
}

function generateRuiConfig(context: PageRockConfigGenerationContext, option: GenerateBlockRuiConfigOption, generator: RuiConfigGenerator): RockConfig {
  const blockConfig = option.blockConfig;
  const block = getBlock(blockConfig.type);
  if (!block) {
    console.warn(`Failed to generate rui config of rapid block with type ${blockConfig.type}`);
    return {
      $type: "htmlElement",
      htmlTag: "pre",
      children: {
        $type: "text",
        text: JSON.stringify(blockConfig, null, 2),
      }
    };
  }
  return block.generateRuiConfig(context, option, generator);
}