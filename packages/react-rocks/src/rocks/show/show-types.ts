import type { ContainerRockConfig, RockConfig } from "@ruiapp/move-style";

export const SHOW_ROCK_TYPE = "show" as const;

export interface ShowProps {
  when?: boolean;
  children?: RockConfig;
  fallback?: RockConfig;
}

export type ShowRockConfig = ContainerRockConfig<ShowProps, typeof SHOW_ROCK_TYPE>;
