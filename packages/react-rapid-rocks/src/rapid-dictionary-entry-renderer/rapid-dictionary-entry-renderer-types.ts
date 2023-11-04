import { RockConfig, SimpleRockConfig } from "@ruiapp/move-style";
import { RapidDataDictionaryEntry } from "../rapid-entity-types";

export type RapidDictionaryEntryRendererConfig = {
  value?: RapidDataDictionaryEntry;
}

export interface RapidDictionaryEntryRendererRockConfig extends SimpleRockConfig, RapidDictionaryEntryRendererConfig {
}