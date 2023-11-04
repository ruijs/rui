import type { SimpleRockConfig, StoreConfig } from "@ruiapp/move-style";
import type { RapidEntityListConfig } from "../rapid-entity-list/rapid-entity-list-types";
import type { RapidEntityFormConfig } from "../rapid-entity-form/rapid-entity-form-types";

export interface SonicEntityListConfig extends RapidEntityListConfig {
  newForm?: RapidEntityFormConfig;
  editForm?: RapidEntityFormConfig;
  stores?: StoreConfig[]
};

export interface SonicEntityListRockConfig extends SimpleRockConfig, SonicEntityListConfig {
}