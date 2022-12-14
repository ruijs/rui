import { RockMeta } from "@ruijs/move-style";

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

import Button from "./rock-meta/Button";
regMetaOfRocks(Button);

import FormItem from "./rock-meta/FormItem";
regMetaOfRocks(FormItem);

import Input from "./rock-meta/Input";
regMetaOfRocks(Input);

import Modal from "./rock-meta/Modal";
regMetaOfRocks(Modal);

import Rate from "./rock-meta/Rate";
regMetaOfRocks(Rate);

export default metaOfRocks;