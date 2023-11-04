import type { RockConfig } from "@ruiapp/move-style";

export function generateAntdIcon(option: any) {
  const rock: RockConfig = {
    $type: "antdIcon",
    name: option.name,
  };

  return rock;
}
