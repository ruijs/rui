import type { SimpleRockConfig } from "@ruiapp/move-style";

export function generateRockConfigOfError(error: Error | string) {
  const rockConfig: SimpleRockConfig  = {
    $type: "antdAlert",
    message: (error as Error).message || error,
    type: "error",
  };
  return rockConfig;
}
