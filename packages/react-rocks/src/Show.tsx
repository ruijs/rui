import { Rock, RockInstance } from "@ruiapp/move-style";
import ShowMeta from "./ShowMeta";
import { ShowProps, ShowRockConfig } from "./show-types";
import { genRockRenderer, renderRockChildren } from "@ruiapp/react-renderer";
import React from "react";

export function configShow(config: ShowRockConfig): ShowRockConfig {
  return config;
}

export function Show(props: ShowProps) {
  const { _context: context } = props as any as RockInstance;
  const { when, children, fallback } = props;

  if (when) {
    return renderRockChildren({
      context,
      rockChildrenConfig: children,
    });
  }

  if (fallback) {
    return renderRockChildren({
      context,
      rockChildrenConfig: fallback,
    });
  }

  return null;
}

export default {
  Renderer: genRockRenderer(ShowMeta.$type, Show),
  ...ShowMeta,
} as Rock<ShowRockConfig>;
