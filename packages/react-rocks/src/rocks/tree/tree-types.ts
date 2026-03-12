import { RockConfig } from "@ruiapp/move-style";
import { TreeProps as ComponentTreeProps } from "./components/Tree";

export const TREE_ROCK_TYPE = "tree" as const;

export interface TreeProps extends ComponentTreeProps {}

export type TreeRockConfig = RockConfig<TreeProps, typeof TREE_ROCK_TYPE>;
