import type { SimpleRockConfig } from "@ruijs/move-style";
import type {  RapidRecordActionBase } from "../rapid-action-types";

export interface RapidTableActionConfig extends RapidRecordActionBase {
}

export interface RapidTableActionRockConfig extends SimpleRockConfig, RapidTableActionConfig {
}