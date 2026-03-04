import type { ContainerRockConfig, RockConfig } from "@ruiapp/move-style";
import type { ReactNode } from "react";

export const SHOW_ROCK_TYPE = "show" as const;

export interface ShowProps {
  when: boolean;
  children?: RockConfig;
  fallback?: RockConfig;
}

export interface ShowRockConfig extends ContainerRockConfig, Omit<ShowProps, "children"> {
  $type: typeof SHOW_ROCK_TYPE;
}
