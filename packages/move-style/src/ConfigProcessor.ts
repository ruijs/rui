import { RockConfig, RockInstanceContext } from "./types/rock-types";

export type BeforeRockRenderOptions = {
  context: RockInstanceContext;
  rockConfig: RockConfig;
};

export interface ConfigProcessor {
  beforeRockRender?: (options: BeforeRockRenderOptions) => void;
}
