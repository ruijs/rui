import type { SdRpdFormPage, SdRpdMeta } from "~/proton";
import { autoConfigSourcePage } from "./autoConfigSourcePage";
import { generateRuiPageConfig } from "./generateRuiPageConfig";
import type { GenerateRuiPageConfigOption } from "~/expanders/rui-page-generator-types";
import { preConfigRapidPage } from "../page-pre-configure";

export function generateFormPage(option: GenerateRuiPageConfigOption<SdRpdFormPage>) {
  const sdRpdMeta: SdRpdMeta = {
    entities: option.entities,
    dictionaries: option.dataDictionaries,
  };
  const sourcePage = autoConfigSourcePage(option.sdPage, sdRpdMeta);

  preConfigRapidPage(option.sdPage, sdRpdMeta);

  const ruiPage = generateRuiPageConfig({
    sdPage: sourcePage,
    entities: option.entities,
    dataDictionaries: option.dataDictionaries,
  });
  return ruiPage;
}