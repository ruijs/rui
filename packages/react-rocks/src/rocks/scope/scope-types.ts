import type { ContainerRockConfig, StoreConfig, RockChildrenConfig } from "@ruiapp/move-style";

export const SCOPE_ROCK_TYPE = "scope" as const;

export interface ScopeProps {
  stores?: StoreConfig[];
  initialVars?: Record<string, any>;
  children?: RockChildrenConfig;
}

export interface ScopeRockConfig extends ContainerRockConfig, Omit<ScopeProps, "children"> {
  $type: typeof SCOPE_ROCK_TYPE;
}
