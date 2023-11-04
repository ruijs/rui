import { ContainerRockConfig, RockConfig, RockEventHandlerConfig } from "@ruiapp/move-style";
import { RapidFormItemConfig } from "../rapid-form-item/rapid-form-item-types";

export type RapidFormConfig = {
  /**
   * 数据源编号
   */
  dataSourceCode?: string | null;

  /**
   * 大小，默认为`middle`
   */
  size?: "default" | "middle" | "small";

  /**
   * 布局模式，默认为`horizontal`
   */
  layout?: "horizontal" | "vertical" | "inline";

  /**
   * 是否显示冒号
   */
  colon?: boolean;

  /**
   * 栏数，默认为1
   */
  column?: number;

  /**
   * 表单项
   */
  items: RapidFormItemConfig[];

  /**
   * 表单操作配置。如：提交、重置、取消等
   */
  actions?: RapidFormAction[];

  /**
   * 表单默认字段，可用于新建表单设置默认值
   */
  defaultFormFields?: Record<string, any>;
}


/**
 * 表单动作
 */
export type RapidFormAction = {
  /**
   * 操作类型
   */
  actionType: RapidFormActionType;

  /**
   * 操作文字
   */
  actionText?: string;

  /**
   * 操作按钮其它属性
   */
  actionProps?: any;

  /**
   * 动作数据，提交时会合并到表单数据中
   */
  actionData?: Record<string, any>;

  /**
   * 请求方法，设置后会覆盖表单的请求方法
   */
  requestMethod?: "POST" | "PUT";

  /**
   * 请求地址，设置后覆盖表单的请求地址
   */
  requestUrl?: string;
}

export type RapidFormActionType =
  | "submit" // 提交
  | "reset" // 重置
  // | "closeModal" // 关闭模态窗
  // | "closeDrawer" // 关闭抽屉
  ;


export interface RapidFormRockConfig extends ContainerRockConfig, RapidFormConfig {
}