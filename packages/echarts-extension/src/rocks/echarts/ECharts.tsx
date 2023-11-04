import type { Rock, RockConfig } from "@ruiapp/move-style";
import RapidOptionFieldRendererMeta from "./ECartsMeta";
import type { EChartsRockConfig } from "./echarts-types";
import { renderRock } from "@ruiapp/react-renderer";
import { find } from "lodash";
import EChartsReact, { EChartsReactProps } from "echarts-for-react";

export default {
  Renderer(context, props: EChartsRockConfig) {

    const rockConfig: RockConfig = {
      $type: "text",
      text: "echarts",
    } as RockConfig;

    const echartsProps: EChartsReactProps = props;
    return <EChartsReact {...echartsProps} />;
  },

  ...RapidOptionFieldRendererMeta,
} as Rock;