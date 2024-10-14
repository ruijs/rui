import { RockMeta } from "@ruiapp/move-style";
import Alert from "./rock-meta/Alert";
import Badge from "./rock-meta/Badge";
import Button from "./rock-meta/Button";
import Descriptions from "./rock-meta/Descriptions";
import DescriptionsItem from "./rock-meta/DescriptionsItem";
import FormItem from "./rock-meta/FormItem";
import Input from "./rock-meta/Input";
import ListItemMeta from "./rock-meta/ListItemMeta";
import Modal from "./rock-meta/Modal";
import Drawer from "./rock-meta/Drawer";
import Dropdown from "./rock-meta/Dropdown";
import DropdownButton from "./rock-meta/DropdownButton";
import Rate from "./rock-meta/Rate";
import Switch from "./rock-meta/Switch";
import Tabs from "./rock-meta/Tabs";
import TabPane from "./rock-meta/TabPane";
import Tree from "./rock-meta/Tree";
import Result from "~/rocks/rock-meta/Result";
import Table from "~/rocks/rock-meta/Table";

const metaOfRocks: Record<string, RockMeta> = {};

function regMetaOfRocks(meta: RockMeta) {
  const rockType = meta.$type;
  if (metaOfRocks[rockType]) {
    throw new Error("Duplicated antd rock meta. Rock type: " + rockType);
  }

  metaOfRocks[meta.$type] = meta;
}

[
  Badge,
  Alert,
  Button,
  Descriptions,
  DescriptionsItem,
  Drawer,
  Dropdown,
  DropdownButton,
  FormItem,
  Input,
  ListItemMeta,
  Modal,
  Rate,
  Result,
  Switch,
  Table,
  TabPane,
  Tabs,
  Tree,
].forEach((meta) => {
  regMetaOfRocks(meta);
});

export default metaOfRocks;
