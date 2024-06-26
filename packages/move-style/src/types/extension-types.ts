import { ConfigProcessor } from "~/ConfigProcessor";
import { EventAction, FunctionMeta, Rock } from "./rock-types";
import { StoreMeta } from "./store-types";

export type RuiExtension = {
  rocks?: Rock[];
  eventActions?: EventAction<any>[];
  functions?: FunctionMeta[];
  stores?: StoreMeta<any>[];
  configProcessors?: ConfigProcessor[];
};
