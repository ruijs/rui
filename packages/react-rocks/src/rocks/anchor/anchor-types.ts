import type { ContainerRockConfig, RockConfig, RockEventHandler } from "@ruiapp/move-style";

export const ANCHOR_ROCK_TYPE = "anchor" as const;

export interface AnchorProps {
  className?: string;
  href?: string;
  target?: string;
  children?: RockConfig;
  onClick?: RockEventHandler;
}

export interface AnchorRockConfig extends ContainerRockConfig, Omit<AnchorProps, "children"> {
  $type: typeof ANCHOR_ROCK_TYPE;
}
