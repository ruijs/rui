import type { RockConfig, SimpleRockConfig, StoreConfig } from "@ruiapp/move-style";

export interface SonicMainSecondaryLayoutConfig {
  stores?: StoreConfig[];
  gutter?: number;
  main: RockConfig;
  mainTitle?: string;
  mainColSpan: number;
  mainClassName?: string;
  secondary: RockConfig;
  secondaryTitle?: string;
  secondaryColSpan: number;
  secondaryClassName?: string;
};

export interface SonicMainSecondaryLayoutRockConfig extends SimpleRockConfig, SonicMainSecondaryLayoutConfig {
}