import { Rock } from "@ruiapp/move-style";
import TreeMeta from "./TreeMeta";
import { TreeRockConfig } from "./tree-types";
import Tree from "./components/Tree";
import { genRockRenderer } from "@ruiapp/react-renderer";

export function configTree(config: TreeRockConfig): TreeRockConfig {
  return config;
}

export default {
  Renderer: genRockRenderer(TreeMeta.$type, Tree, true),
  ...TreeMeta,
} as Rock<TreeRockConfig>;
