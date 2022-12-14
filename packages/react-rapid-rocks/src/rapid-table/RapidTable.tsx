import { Rock, SimpleRockConfig } from "@ruijs/move-style";
import { useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { Table, TableProps } from "antd";
import RapidTableMeta from "./RapidTableMeta";

export interface RapidTableProps extends SimpleRockConfig {
  size: "default" | "middle" | "small";
  bordered: boolean;
}

export default {
  renderer(props: RapidTableProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const antdProps: TableProps<any> = {
      bordered: props.bordered,
    };

    return <Table {...antdProps}></Table>
  },

  ...RapidTableMeta
  
} as Rock;