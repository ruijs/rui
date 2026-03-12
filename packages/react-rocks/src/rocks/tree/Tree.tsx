import { Rock, RockComponentProps } from "@ruiapp/move-style";
import TreeMeta from "./TreeMeta";
import { TreeRockConfig, TREE_ROCK_TYPE } from "./tree-types";
import TreeComponent from "./components/Tree";
import { wrapToRockComponent, wrapToRockRenderer } from "@ruiapp/react-renderer";

export function configTree(config: RockComponentProps<TreeRockConfig>): TreeRockConfig {
  config.$type = TREE_ROCK_TYPE;
  return config as TreeRockConfig;
}

const Tree = wrapToRockComponent(TreeMeta, TreeComponent);

export default {
  Renderer: wrapToRockRenderer(TreeMeta, Tree, true),
  ...TreeMeta,
} as Rock<TreeRockConfig>;
