import { Rock, RockConfig, SimpleRockConfig } from "@ruijs/move-style";
import { useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { Table, TableProps, TableColumnProps } from "antd";
import RapidTableColumnMeta from "./RapidTableColumnMeta";

export interface RapidTableColumnProps extends SimpleRockConfig {
  title: string;
  columnType: "text" | "number" | "link" | "actions";
  key?: string;
  dataIndex?: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  cell?: RockConfig | RockConfig[];
}

export default {
  renderer(props: RapidTableColumnProps) {
    return null;
  },

  ...RapidTableColumnMeta
} as Rock;