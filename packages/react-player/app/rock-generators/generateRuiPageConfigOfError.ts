import type { PageConfig } from "@ruiapp/move-style";
import { generateRockConfigOfError } from "./generateRockConfigOfError";

export function generateRuiPageConfigOfError(error: Error) {
  const ruiPageConfig: PageConfig = {
    view: [
      generateRockConfigOfError(error),
    ]
  };

  return ruiPageConfig;
}
