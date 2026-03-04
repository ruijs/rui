import type { ContainerRockConfig, RockEventHandler } from "@ruiapp/move-style";

export const BOX_ROCK_TYPE = "box" as const;

export interface BoxProps {
  className?: string;
  style?: any;
  onClick?: RockEventHandler;
  [key: string]: any;
}

export interface BoxRockConfig extends ContainerRockConfig, BoxProps {
  $type: typeof BOX_ROCK_TYPE;
}
