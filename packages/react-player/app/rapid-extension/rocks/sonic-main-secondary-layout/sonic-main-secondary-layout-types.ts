import type { RockConfig, SimpleRockConfig, StoreConfig } from "@ruijs/move-style";

export interface SonicMainSecondaryLayoutConfig {
  stores?: StoreConfig[];
  gutter?: number;
  main: RockConfig;
  mainTitle?: string;
  mainColSpan: number;
  secondary: RockConfig;
  secondaryTitle?: string;
  secondaryColSpan: number;
};

export interface SonicMainSecondaryLayoutRockConfig extends SimpleRockConfig, SonicMainSecondaryLayoutConfig {
}