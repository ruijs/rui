import type { RapidFormAction, RapidFormActionType, RapidFormConfig, RapidFormItemConfig, RapidFormItemType } from "@ruijs/react-rapid-rocks";
import type { PageAction } from "./page-action-types";
import type { RockPageEventSubscriptionConfig, RockPropExpressions } from "@ruijs/move-style";

export interface BlockDataForm extends RapidFormConfig {
  type: "dataForm";

  code: string;

  entityCode: string;

  mode?: "view" | "edit" | "new";

  entityId?: string;

  /**
   * 保存成功后动作
   */
  onSaveSuccess?: PageAction | PageAction[];

  $exps?: RockPropExpressions;
  $when?: RockPageEventSubscriptionConfig;
}

/**
 * 表单项
 */
export type BlockDataFormItem = RapidFormItemConfig;

export type BlockFormItemType = RapidFormItemType;



/**
 * 表单动作
 */
export type BlockFormAction = RapidFormAction;

export type BlockFormActionType = RapidFormActionType;
