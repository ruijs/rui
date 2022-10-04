import { RockConfig } from "./rock-types"
import { StoreConfig } from "./store-types";

export type PageConfig = PageWithoutLayoutConfig | PageWithLayoutConfig;

export type PageWithoutLayoutConfig = {
  $id?: string;
  stores?: StoreConfig[];
  view: RockConfig[];
}

export type PageWithLayoutConfig = {
  $id?: string;
  stores?: StoreConfig[];
  layout: string;
  sections: Record<string, RockConfig[]>;
}