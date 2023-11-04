import type { Rock, RockConfig } from "@ruiapp/move-style";
import RapidOptionFieldRendererMeta from "./ECartsMeta";
import type { EChartsRockConfig } from "./echarts-types";
import EChartsReact, { EChartsReactProps } from "echarts-for-react";

export default {
  Renderer(context, props: EChartsRockConfig) {
    const echartsProps: EChartsReactProps = props;
    return <EChartsReact {...echartsProps} />;
  },

  ...RapidOptionFieldRendererMeta,
} as Rock;