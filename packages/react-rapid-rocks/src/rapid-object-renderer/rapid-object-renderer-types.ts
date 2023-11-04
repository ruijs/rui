import { SimpleRockConfig } from "@ruiapp/move-style";

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
  rendererType?: string;

  /**
   * 展示值的渲染器属性
   */
  rendererProps?: Record<string, any>;
}