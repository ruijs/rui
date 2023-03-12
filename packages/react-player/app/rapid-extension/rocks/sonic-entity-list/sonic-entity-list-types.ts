import type { SimpleRockConfig } from "@ruijs/move-style";
import type { RapidEntityListConfig } from "../rapid-entity-list/rapid-entity-list-types";
import type { RapidEntityFormConfig } from "../rapid-entity-form/rapid-entity-form-types";

export interface SonicEntityListConfig extends RapidEntityListConfig {
  newForm?: RapidEntityFormConfig;
  editForm?: RapidEntityFormConfig;
};

export interface SonicEntityListRockConfig extends SimpleRockConfig, SonicEntityListConfig {
}