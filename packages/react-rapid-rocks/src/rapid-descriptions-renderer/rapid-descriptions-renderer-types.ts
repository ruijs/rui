import { SimpleRockConfig } from "@ruijs/move-style";
import { RapidFieldType } from "../rapid-entity-types";

export interface RapidDescriptionsRockConfig extends SimpleRockConfig {
  value: Record<string, any> | null | undefined;

  defaultText?: string;

  /**
   * 描述列表的标题，显示在最顶部
   */
  title?: string;

  /**
   * 大小
   */
  size: "default" | "middle" | "small";

  /**
   * 是否展示边框
   */
  bordered: boolean;
  /**
   * 是否显示冒号
   */
  colon?: boolean;
  /**
   * 栏数
   */
  column?: number;

  /**
   * 描述列表项配置
   */
  items: RapidDescriptionsItemRenderConfig[];
}

export interface RapidDescriptionsItemRenderConfig {
  /**
   * 属性Code/字段名
   */
  code: string;

  /**
   * 标签文字
   */
  label?: string;

  /**
   * 值的类型
   */
  valueFieldType?: RapidFieldType;

  /**
   * 展示值的渲染器类型
   */
  rendererType?: string;

  /**
   * 展示值的渲染器属性
   */
  rendererProps?: Record<string, any>;
}