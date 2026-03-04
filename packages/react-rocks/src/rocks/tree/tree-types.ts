import { RockConfig, SimpleRockConfig } from "@ruiapp/move-style";
import { TreeProps as ComponentTreeProps } from "./components/Tree";

export const TREE_ROCK_TYPE = "tree" as const;

export interface TreeProps extends ComponentTreeProps {}

export interface TreeRockConfig extends SimpleRockConfig, Omit<TreeProps, "togglerRenderer" | "iconRenderer" | "actionsRenderer"> {
  $type: typeof TREE_ROCK_TYPE;

  togglerRenderer?: RockConfig;
  iconRenderer?: RockConfig;
  actionsRenderer?: RockConfig;
}
