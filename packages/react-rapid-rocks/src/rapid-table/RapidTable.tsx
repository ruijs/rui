import { MoveStyleUtils, Rock  } from "@ruiapp/move-style";
import { toRenderRockSlot, convertToEventHandlers, convertToSlotProps } from "@ruiapp/react-renderer";
import { Table, TableProps } from "antd";
import { ColumnType } from "antd/lib/table/interface";
import { map, reduce } from "lodash";
import RapidTableMeta from "./RapidTableMeta";
import { RapidTableRockConfig } from "./rapid-table-types";

export default {
  Renderer(context, props: RapidTableRockConfig) {
    const tableColumns = map(props.columns, (column) => {
      return {
        ...MoveStyleUtils.omitSystemRockConfigFields(column),
        dataIndex: (column.fieldName || column.code).split("."),
        key: column.key || column.fieldName || column.code,
        render: toRenderRockSlot({context, slot: column.cell, rockType: column.$type, slotName: "cell"}),
      } as ColumnType<any>;
    });

    // calculate total width of columns
    const columnsTotalWidth = reduce(props.columns, (accumulatedWidth, column) => {
      return accumulatedWidth + (parseInt(column.width, 10) || parseInt(column.minWidth, 10) || 100)
    }, 0);


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
      scroll: {
        x: columnsTotalWidth,
      },
    };

    return <Table {...antdProps}></Table>
  },

  ...RapidTableMeta
} as Rock;