import { omit } from "lodash";
import { RockConfig } from "../types/rock-types";

export function omitSystemRockConfigFields(rockConfig: RockConfig) {
  return omit(rockConfig, ["$exps", "$id", "$type", "_state", "_initialized"])
}
