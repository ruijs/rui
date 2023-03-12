import { MoveStyleUtils, Rock  } from "@ruijs/move-style";
import { useRuiFramework, useRuiPage, toRenderRockSlot, useRuiScope, convertToEventHandlers, convertToSlotProps } from "@ruijs/react-renderer";
import { Table, TableProps } from "antd";
import { ColumnType } from "antd/lib/table/interface";
import _ from "lodash";
import RapidTableMeta from "./RapidTableMeta";
import { RapidTableRockConfig } from "./rapid-table-types";

export default {
  Renderer(context, props: RapidTableRockConfig) {
    const tableColumns = _.map(props.columns, (column) => {
      return {
        title: column.title,
        dataIndex: (column.fieldName || column.code).split("."),
        key: column.key || column.fieldName || column.code,
        width: column.width,
        align: column.align,
        render: toRenderRockSlot({context, slot: column.cell, rockType: column.$type, slotName: "cell"}),
      } as ColumnType<any>;
    });

    const eventHandlers = convertToEventHandlers({context, rockConfig: props});
    const slotProps = convertToSlotProps({context, rockConfig: props, slotsMeta: RapidTableMeta.slots});

    let dataSource = props.dataSource;
    if (props.convertListToTree) {
      dataSource = MoveStyleUtils.listToTree(props.dataSource, {
        listIdField: props.listIdField,
        listParentField: props.listParentField,
        treeChildrenField: props.treeChildrenField,
      });
    }

    const antdProps: TableProps<any> = {
      dataSource: dataSource,
      rowKey: props.rowKey || "id",
      bordered: props.bordered,
      size: props.size,
      pagination: props.pagination,
      ...eventHandlers,
      ...slotProps,
      columns: tableColumns,
      showHeader: props.showHeader,
    };

    return <Table {...antdProps}></Table>
  },

  ...RapidTableMeta
} as Rock;