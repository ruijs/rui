import { Rock, SimpleRockConfig } from "@ruijs/move-style";
import { renderRockChildren, useRuiFramework, useRuiPage, toRenderRockSlot } from "@ruijs/react-renderer";
import { Table, TableProps } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { ColumnType } from "antd/lib/table/interface";
import _ from "lodash";
import { RapidTableColumnProps } from "./RapidTableColumn";
import RapidTableMeta from "./RapidTableMeta";

export interface RapidTableProps extends SimpleRockConfig {
  size: SizeType;
  bordered: boolean;
  rowKey?: string;
  dataSource: any;
  columns: RapidTableColumnProps[];
}

export default {
  renderer(props: RapidTableProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const tableColumns = _.map(props.columns, (column) => {
      return {
        title: column.title,
        dataIndex: column.dataIndex || column.title,
        key: column.key || column.dataIndex || column.title,
        width: column.width,
        align: column.align,
        render: toRenderRockSlot(framework, page, column.cell, column.$type, "cell"),
      } as ColumnType<any>;
    });

    const antdProps: TableProps<any> = {
      columns: tableColumns,
      dataSource: props.dataSource,
      rowKey: props.rowKey || "id",
      bordered: props.bordered,
      size: props.size,
    };

    return <Table {...antdProps}></Table>
  },

  ...RapidTableMeta
} as Rock;