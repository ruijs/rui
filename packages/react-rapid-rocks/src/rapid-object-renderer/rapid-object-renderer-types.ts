import { SimpleRockConfig } from "@ruijs/move-style";

export interface RapidObjectRendererRockConfig extends SimpleRockConfig {
  value: Record<string, any> | null | undefined;

  defaultText?: string;

  items: RapidPropertyRenderConfig[];
}

export interface RapidPropertyRenderConfig {
  /**
   * 属性Code/字段名
   */
  code: string;

  /**
   * 标签文字
   */
  label?: string;

  /**
   * 展示值的渲染器类型
   */
  valueRendererType?: string;

  /**
   * 展示值的渲染器属性
   */
  valueRendererProps?: Record<string, any>;
}