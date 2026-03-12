import { Rock, RockComponentProps, CommonProps, RockInstanceProps } from "@ruiapp/move-style";
import LabelMeta from "./LabelMeta";
import { LabelRockConfig } from "./label-types";
import { useRockInstance, wrapToRockComponent } from "@ruiapp/react-renderer";
import React from "react";
import { pick } from "lodash";

export function configLabel(config: RockComponentProps<LabelRockConfig>): LabelRockConfig {
  config.$type = LabelMeta.$type;
  return config as LabelRockConfig;
}

export function LabelComponent(props: RockInstanceProps<LabelRockConfig>) {
  const { $id } = useRockInstance(props, LabelMeta.$type);
  const { text } = props;
  const style: React.CSSProperties = pick(props, CommonProps.TextStylePropNames) as any;

  return (
    <span data-component-id={$id} style={style}>
      {text}
    </span>
  );
}

export const Label = wrapToRockComponent(LabelMeta, LabelComponent);

export default {
  Renderer: LabelComponent,
  ...LabelMeta,
} as Rock<LabelRockConfig>;
