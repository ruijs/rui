import { SimpleRockConfig } from "@ruiapp/move-style";

export interface RapidFileSizeRendererConfig extends SimpleRockConfig {
  value: number;

  defaultText?: string;

  /**
   * 小数点位数
   */
  decimalPlaces?: number;
}