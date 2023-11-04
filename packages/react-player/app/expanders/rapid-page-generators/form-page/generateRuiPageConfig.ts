import type { PageConfig } from "@ruiapp/move-style";
import type { SdRpdFormPage } from "~/proton";
import { find } from "lodash";
import type { GenerateRuiPageConfigOption, PageRockConfigGenerationContext } from "~/expanders/rui-page-generator-types";
import { generateRuiPageConfigOfError } from "../../../rock-generators/generateRuiPageConfigOfError";
import { generateRockConfigForPageBlocks } from "../rapid-page-generator";
import { generateRuiConfigOfDataForm } from "../blocks/data-form-block";

export function generateRuiPageConfig(option: GenerateRuiPageConfigOption<SdRpdFormPage>) {
  const { sdPage, entities, dataDictionaries } = option;
  const formConfig = sdPage.form;
  const mainEntityCode = formConfig.entityCode;
  const mainEntity = find(entities, item => item.code === mainEntityCode);
  if (!mainEntity) {
    return generateRuiPageConfigOfError(new Error(`Entitiy with code '${mainEntityCode}' not found.`))
  }

  const ruiConfigGenerationContext: PageRockConfigGenerationContext = {
    dataStores: [],
    view: [],
  };

  let formSectionConfig = generateRuiConfigOfDataForm(ruiConfigGenerationContext, {
    pageConfig: sdPage,
    blockConfig: sdPage.form,
    entities: entities,
    dataDictionaries: dataDictionaries,
  });

  // TODO: should move this into rui-page-generator.ts
  generateRockConfigForPageBlocks(ruiConfigGenerationContext, sdPage, {entities, dictionaries: dataDictionaries})

  const ruiPageConfig: PageConfig = {
    $id: sdPage.code,
    view: [
      {
        $type: "scope",
        $id: "rootScope",
        stores: ruiConfigGenerationContext.dataStores,
        children: [
          {
            $type: "box",
            $id: "dataFormContainer",
            className: "rui-page-section",
            children: [ formSectionConfig ],
          },
          ...ruiConfigGenerationContext.view
        ]
      },
    ],
  };

  return ruiPageConfig;
}