import type { GenerateBlockRuiConfigOption, PageRockConfigGenerationContext, SdRpdMeta, BlockDataForm, SdRpdFieldType, BlockFormItemType, SdRpdPageBase, SdRpdEntity, SdRpdDataDictionary, BlockDataFormItem } from "~/proton";
import type { BlockComponent, BlockPreConfigure, RuiConfigGenerator } from "../block-types";
import type { RockEvent, RockConfig, StoreConfig, RockEventHandler } from "@ruijs/move-style";
import { handleComponentEvent } from "@ruijs/move-style";
import { find, set  } from "lodash";
import { generateRockConfigOfError } from "~/rock-generators/generateRockConfigOfError";
import type { RapidFormItemConfig, RapidFormRockConfig, RapidReferenceRendererConfig, RapidSelectConfig } from "@ruijs/react-rapid-rocks";
import type { RemoveField } from "~/types/type-utils";
import type { RapidEntityFormRockConfig } from "~/rapid-extension/rocks";
import { EntityStoreConfig } from "~/rapid-extension/stores/entity-store";

const fieldTypeToFormItemTypeMap: Record<SdRpdFieldType, BlockFormItemType | null> = {
  text: 'text',
  boolean: 'switch',
  integer: 'number',
  long: 'number',
  float: 'number',
  double: 'number',
  date: 'dateRange',
  time: 'time',
  datetime: 'dateTimeRange',
  datetimetz: 'dateTimeRange',
  option: 'select',
  relation: 'select',
  json: null,
};

/**
 * 自动配置数据表单。
 * @description
 * 配置过程中主要进行以下处理：
 * - 根据字段的类型选择合适的表单项类型
 * - 自动使用字段名称作为表单项的标签
 * - 使用字段的必填设置作为表单项的必填设置
 * - 自动配置`mode`为`edit`的表单的数据源设置
 * - 自动根据表单项对应字段的类型配置引用实体或者数据字典的数据源设置
 * @param page 页面
 * @param entity 页面表单的主实体
 * @param meta 应用配置
 * @returns void
 */
export function preConfigDataForm(page: SdRpdPageBase, form: BlockDataForm, meta: SdRpdMeta) {
  if (!form) {
    return;
  }

  const entity = find(meta.entities, { code: form.entityCode});
  if (!entity) {
    console.warn(`Pre-config data form failed. Entity with code '${form.entityCode}' was not found.`)
    return;
  }

  for (const formItem of form.items) {
    const field = find(entity.fields, { code: formItem.code });
    if (!field) {
      continue;
    }

    // 使用字段名称作为表单项的标签
    if (!formItem.label) {
      formItem.label = field?.name;
    }

    // 使用字段的必填设置作为表单项的必填设置
    formItem.required = field.required;

    if (formItem.type === 'auto') {
      // 根据字段的类型选择合适的表单项类型
      const type = fieldTypeToFormItemTypeMap[field.type];
      if (type !== null) {
        formItem.type = type;
      }
    }
  }
}

export function generateRuiConfigOfDataForm(context: PageRockConfigGenerationContext, option: GenerateBlockRuiConfigOption): RockConfig {
  const { blockConfig } = option;
  const formConfig = blockConfig as BlockDataForm;
  const formRockConfig: RapidEntityFormRockConfig = {
    ...formConfig,
    $type: "rapidEntityForm",
    $id: formConfig.code,
  };

  return formRockConfig;
}

const block: BlockComponent = {
  type: "dataForm",

  preConfig(page: SdRpdPageBase, block: BlockDataForm, meta: SdRpdMeta, configure: BlockPreConfigure) {
    preConfigDataForm(page, block, meta)
  },

  generateRuiConfig(context: PageRockConfigGenerationContext, option: GenerateBlockRuiConfigOption, generator: RuiConfigGenerator): RockConfig {
    return generateRuiConfigOfDataForm(context, option);
  }
};

export default block;