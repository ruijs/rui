import { Rock, RockComponentProps, RockInstanceProps, fireEvent } from "@ruiapp/move-style";
import TreeMeta from "./TreeMeta";
import { TreeRockConfig, TREE_ROCK_TYPE } from "./tree-types";
import TreeComponent from "./components/Tree";
import { wrapToRockComponent, useRockInstance, useRockInstanceContext, genRockRenderer } from "@ruiapp/react-renderer";
import React from "react";

export function configTree(config: RockComponentProps<TreeRockConfig>): TreeRockConfig {
  config.$type = TREE_ROCK_TYPE;
  return config as TreeRockConfig;
}

const Tree = wrapToRockComponent(TreeMeta, TreeComponent);

export default {
  Renderer: genRockRenderer(TreeMeta.$type, Tree, true),
  ...TreeMeta,
} as Rock<TreeRockConfig>;
