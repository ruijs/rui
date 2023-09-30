import type { SimpleRockConfig } from "@ruijs/move-style";
import { EChartsReactProps } from "echarts-for-react";

export type EChartsConfig = EChartsReactProps

export interface EChartsRockConfig extends SimpleRockConfig, EChartsConfig {
}