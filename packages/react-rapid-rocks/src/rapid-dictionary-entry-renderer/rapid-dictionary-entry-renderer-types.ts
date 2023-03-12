import { RockConfig, SimpleRockConfig } from "@ruijs/move-style";
import { RapidDataDictionaryEntry } from "../rapid-entity-types";

export type RapidDictionaryEntryRendererConfig = {
  value?: RapidDataDictionaryEntry;
}

export interface RapidDictionaryEntryRendererRockConfig extends SimpleRockConfig, RapidDictionaryEntryRendererConfig {
}