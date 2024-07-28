import type { RuiExtension } from "@ruiapp/move-style";
import rocks from "./rocks";
import stores from "./stores";

export default {
  rocks,
  stores,
} as RuiExtension;

export * as DesignerUtility from "./utilities/DesignerUtility";
export * from "./utilities/SetterUtility";

export * from "./rocks";
export * from "./stores";
