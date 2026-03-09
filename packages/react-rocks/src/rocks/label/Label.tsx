import { Rock, RockInstance, CommonProps } from "@ruiapp/move-style";
import LabelMeta from "./LabelMeta";
import { LabelProps, LabelRockConfig } from "./label-types";
import { genRockRenderer } from "@ruiapp/react-renderer";
import React from "react";
import { pick } from "lodash";

export function configLabel(config: LabelRockConfig): LabelRockConfig {
  return config;
}

export function Label(props: LabelProps) {
  const { $id } = props as any as RockInstance;
  const { text } = props;
  const style: React.CSSProperties = pick(props, CommonProps.TextStylePropNames) as any;

  return (
    <span data-component-id={$id} style={style}>
      {text}
    </span>
  );
}

export default {
  Renderer: genRockRenderer(LabelMeta.$type, Label, true),
  ...LabelMeta,
} as Rock<LabelRockConfig>;
