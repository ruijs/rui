import type { ContainerRockConfig, RockEventHandlerConfig } from "@ruiapp/move-style";

export const BOX_ROCK_TYPE = "box" as const;

export interface BoxProps {
  className?: string;
  style?: any;
  onClick?: RockEventHandlerConfig;
}

export type BoxRockConfig = ContainerRockConfig<BoxProps, typeof BOX_ROCK_TYPE>;
