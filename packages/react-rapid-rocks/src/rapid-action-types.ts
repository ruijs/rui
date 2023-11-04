import { RockEventHandlerConfig, RockPropExpressions } from "@ruiapp/move-style";

export type RapidActionBase = {
  code: string;
  /**
   * 图标名称
   */
  icon?: string;

  /**
   * 显示文字
   */
  text?: string;

  /**
   * 是否禁用
   */
  disabled?: boolean;

  /**
   * 提示文字
   */
  tip?: string;

  /**
   * 触发onAction事件的事件名，一般为onClick。
   */
  actionEventName?: string;

  onAction?: RockEventHandlerConfig;
}

export type RapidActionButtonBase = RapidActionBase & {
  actionStyle?: "default" | "primary" | "dashed" | "text" | "link"
  danger?: boolean;
  ghost?: boolean;
}

export type RapidActionButton = RapidActionButtonBase & {
  actionType: "button";
}

export type RapidRecordAction<TBlock> = 
  | RapidRecordActionEdit<TBlock>
  | RapidRecordActionDelete
  | RapidRecordActionRequest
  | RapidRecordActionLink
  | RapidRecordActionPageLink
  ;

export type RapidRecordActionBase = {

  code: string;

  icon?: string;

  /**
   * 操作链接文字
   */
  actionText?: string;

  /**
   * 提示文字
   */
  tip?: string;

  /**
   * 需求描述
   */
  requirements?: string;

  /**
   * 执行操作前的确认文本
   */
  confirmText?: string;

  /**
   * 当前记录Id
   */
  recordId?: string;

  onAction?: RockEventHandlerConfig;
  $exps?: RockPropExpressions;
}

export type RapidActionInteractionConfigBase<TRock> = {
  interactionMode?: "drawer" | "modal",
  interactionContent?: TRock[];
  interactionContentFrom?: {
    materialCode: string,
  }
}

export type RapidRecordActionEdit<TRock> = RapidRecordActionBase & RapidActionInteractionConfigBase<TRock> & {
  actionType: "edit";
};

export type RapidRecordActionDelete = RapidRecordActionBase & {
  actionType: "delete";
}

export type RapidRecordActionLink = RapidRecordActionBase & {
  actionType: "link";

  /**
   * 链接地址
   */
  url?: string;
}

export type RapidRecordActionPageLink = RapidRecordActionBase & {
  actionType: "pageLink";

  /**
   * 链接页面
   */
  linkPageCode?: string;
}

export type RapidRecordActionRequest = RapidRecordActionBase & {
  actionType: "request";
}
