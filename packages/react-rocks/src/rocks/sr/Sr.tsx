import { Rock, RockComponentProps, RockInstanceProps } from "@ruiapp/move-style";
import SrMeta from "./SrMeta";
import { SrRockConfig } from "./sr-types";
import { useRockInstance, useRockInstanceContext, wrapToRockComponent } from "@ruiapp/react-renderer";
import React from "react";

export function configSr(config: RockComponentProps<SrRockConfig>): SrRockConfig {
  config.$type = SrMeta.$type;
  return config as SrRockConfig;
}

export function SrComponent(props: RockInstanceProps<SrRockConfig>) {
  const { framework } = useRockInstanceContext();
  useRockInstance(props, SrMeta.$type);
  const { ns, name, params } = props;

  return <>{framework.getLocaleStringResource(ns, name, params)}</>;
}

export const Sr = wrapToRockComponent(SrMeta, SrComponent);

export default {
  Renderer: SrComponent,
  ...SrMeta,
} as Rock<SrRockConfig>;
