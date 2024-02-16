import { RockConfig } from "./types/rock-types";

export interface ConfigProcessor {
  beforeRockRender?: (config: RockConfig) => void;
}