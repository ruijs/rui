import { ConfigProcessor } from "~/ConfigProcessor";
import { EventAction, FunctionMeta, Rock } from "./rock-types";
import { StoreMeta } from "./store-types";
import { LocaleResource } from "./locale-types";

export type RuiExtension = {
  name: string;
  rocks?: Rock[];
  eventActions?: EventAction<any>[];
  functions?: FunctionMeta[];
  stores?: StoreMeta<any>[];
  configProcessors?: ConfigProcessor[];
  locales?: Record<string, LocaleResource>;
};
