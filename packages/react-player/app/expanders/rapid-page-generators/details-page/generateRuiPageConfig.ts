import type { PageConfig, RockConfig, RockEvent, StoreConfig } from "@ruiapp/move-style";
import { handleComponentEvent } from "@ruiapp/move-style";
import type { SdRpdDataFormItem, SdRpdDetailsPage, SdRpdDataDictionary, SdRpdEntity } from "~/proton";
import { find, map } from "lodash";
import type { GenerateRuiPageConfigOption, PageRockConfigGenerationContext } from "~/expanders/rui-page-generator-types";
import { generateRuiPageConfigOfError } from "../../../rock-generators/generateRuiPageConfigOfError";
import { generateRockConfigForPageBlocks } from "../rapid-page-generator";
import { EntityStoreConfig } from "~/rapid-extension/stores/entity-store";

export interface GenerateDataFormControlOption {
  sdRpdDataFormItem: SdRpdDataFormItem;
  mainEntity: SdRpdEntity;
  entities: SdRpdEntity[];
  dataDictionaries: SdRpdDataDictionary[]; 
}

export function generateDataFormControlConfigForOptionProperty(option: GenerateDataFormControlOption) {
  const { sdRpdDataFormItem, mainEntity } = option;

  const rpdField = find(mainEntity.fields, {code: sdRpdDataFormItem.code})!;
  const dataDictionaryCode = rpdField.dataDictionary;
  let dataDictionary = find(option.dataDictionaries, {code: dataDictionaryCode});

  const dataFormControlConfig: RockConfig = {
    $type: "antdSelect",
    options: dataDictionary ? map(dataDictionary.entries, item => { return { value: item.value, label: item.name }}) : [],
    allowClear: !sdRpdDataFormItem.required,
    placeholder: sdRpdDataFormItem.placeholder,
  };
  return dataFormControlConfig;
}

export function generateDataFormControlConfigForRelationProperty(context: PageRockConfigGenerationContext, option: GenerateDataFormControlOption) {
  const { sdRpdDataFormItem, mainEntity, entities } = option;

  const rpdEntity = find(mainEntity.fields, {code: sdRpdDataFormItem.code})!;
  const targetEntity = find(entities, {singularCode: rpdEntity.targetSingularCode})!;

  const listDataStoreName = `dataFormItemList-${sdRpdDataFormItem.code}`;
  const listDataStoreConfig: EntityStoreConfig = {
    type: "entityStore",
    name: listDataStoreName,
    entityModel: targetEntity,
    orderBy: [
      {
        field: "id",
      }
    ]
  };

  context.dataStores.push(listDataStoreConfig);

  const dataFormControlConfig: RockConfig = {
    $type: "antdSelect",
    $exps: {
      options: `_.map($scope.stores['${listDataStoreName}'].data?.list, function (item) { return {label: item.name, value: item.id}})`,
    },
    allowClear: !sdRpdDataFormItem.required,
    placeholder: sdRpdDataFormItem.placeholder,
  };
  return dataFormControlConfig;
}

export function generateDataFormControlConfig(context: PageRockConfigGenerationContext, option: GenerateDataFormControlOption) {
  const { sdRpdDataFormItem, mainEntity } = option;

  const rpdEntity = find(mainEntity.fields, {code: sdRpdDataFormItem.code})!;
  if (rpdEntity.type === "option") {
    return generateDataFormControlConfigForOptionProperty(option);
  } else if (rpdEntity.type === "relation") {
    return generateDataFormControlConfigForRelationProperty(context, option);
  }

  let dataFormControlConfig: RockConfig;
  if (sdRpdDataFormItem.formControlType) {
    dataFormControlConfig = {
      $type: sdRpdDataFormItem.formControlType,
    };
  } else {
    dataFormControlConfig = {
      $type: "antdInput",
    };
  }

  return dataFormControlConfig;
}

export function generateRuiPageConfig(option: GenerateRuiPageConfigOption<SdRpdDetailsPage>) {
  const { sdPage, entities, dataDictionaries } = option;

  const ruiConfigGenerationContext: PageRockConfigGenerationContext = {
    dataStores: [],
    view: [],
  };

  // TODO: should move this into rui-page-generator.ts
  generateRockConfigForPageBlocks(ruiConfigGenerationContext, sdPage, {entities, dictionaries: dataDictionaries})

  const ruiPageConfig: PageConfig = {
    $id: sdPage.code,
    view: [
      {
        $type: "box",
        $id: "dataFormContainer",
        className: "rui-page-section",
        children: ruiConfigGenerationContext.view,
      },
    ],
  };

  return ruiPageConfig;
}