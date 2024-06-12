import { RockMeta } from "@ruiapp/move-style";

const metaOfRocks: Record<string, RockMeta> = {};

function regMetaOfRocks(meta: RockMeta) {
  const rockType = meta.$type;
  if (metaOfRocks[rockType]) {
    throw new Error("Duplicated antd rock meta. Rock type: " + rockType);
  }

  metaOfRocks[meta.$type] = meta;
}

import Alert from "./rock-meta/Alert";
regMetaOfRocks(Alert);

import Badge from "./rock-meta/Badge";
regMetaOfRocks(Badge);

import Button from "./rock-meta/Button";
regMetaOfRocks(Button);

import Descriptions from "./rock-meta/Descriptions";
regMetaOfRocks(Descriptions);

import DescriptionsItem from "./rock-meta/DescriptionsItem";
regMetaOfRocks(DescriptionsItem);

import FormItem from "./rock-meta/FormItem";
regMetaOfRocks(FormItem);

import Input from "./rock-meta/Input";
regMetaOfRocks(Input);

import ListItemMeta from "./rock-meta/ListItemMeta";
regMetaOfRocks(ListItemMeta);

import Modal from "./rock-meta/Modal";
regMetaOfRocks(Modal);

import Drawer from "./rock-meta/Drawer";
regMetaOfRocks(Drawer);

import Rate from "./rock-meta/Rate";
regMetaOfRocks(Rate);

import Switch from "./rock-meta/Switch";
regMetaOfRocks(Switch);

import Tabs from "./rock-meta/Tabs";
regMetaOfRocks(Tabs);

import TabPane from "./rock-meta/TabPane";
regMetaOfRocks(TabPane);

import Tree from "./rock-meta/Tree";
regMetaOfRocks(Tree);

export default metaOfRocks;
