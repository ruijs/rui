import { Rock, RockInstance } from "@ruiapp/move-style";
import SrMeta from "./SrMeta";
import { SrProps, SrRockConfig } from "./sr-types";
import { genRockRenderer } from "@ruiapp/react-renderer";

export function configSr(config: SrRockConfig): SrRockConfig {
  return config;
}

export function Sr(props: SrProps) {
  const { ns, name, params } = props;
  const { _context: context } = props as any as RockInstance;
  const { framework } = context;

  return framework.getLocaleStringResource(ns, name, params);
}

export default {
  Renderer: genRockRenderer(SrMeta.$type, Sr, true),
  ...SrMeta,
} as Rock<SrRockConfig>;
