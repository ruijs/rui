import type { RockConfig } from "@ruijs/move-style";

export function generateAntdIcon(option: any) {
  const rock: RockConfig = {
    $type: "antdIcon",
    name: option.name,
  };

  return rock;
}
