import { memo, ReactNode } from "react";
import { get, set } from "lodash";
import { Table, TableProps, Input, InputNumber, Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

type ChangeHandler = (value: any) => void;

interface EditableTableColumn {
  name: string;
  width: number;
  title?: string;
  fixed?: "left" | "right";
  control?: "input" | "number" | ((record: any, index: number, change: ChangeHandler) => ReactNode);
  controlProps?: Record<string, any>;
}

export interface EditableTableProps {
  width?: number;
  height?: number;
  disableAdd?: boolean;
  disableRemove?: boolean;
  columns: EditableTableColumn[];
  value?: any[];
  onChange?(value: any[]): void;
}

const EditableTable = memo<EditableTableProps>((props) => {
  const { columns, value, disableAdd, disableRemove } = props;

  const onFieldChange = (record: any, column: EditableTableColumn, index: number, value: any) => {
    const r = set({ ...record }, column.name, value);
    const data = props.value.map((item, idx) => (idx === index ? r : item));
    props.onChange?.(data);
  };

  let removeColumns: EditableTableColumn[] = [
    {
      name: "remove_btn",
      width: 36,
      fixed: "right",
      control: (record, index) => {
        return (
          <span
            className="ant-btn-link"
            style={{ fontSize: 18, lineHeight: 1, cursor: "pointer" }}
            onClick={() => {
              const filteredValue = props.value?.filter((item, idx) => idx !== index);
              props.onChange?.(filteredValue);
            }}
          >
            {/* @ts-ignore */}
            <MinusCircleOutlined />
          </span>
        );
      },
    },
  ];
  if (disableRemove) {
    removeColumns = [];
  }

  let tableWidthSum = 0;
  let tableColumns: TableProps<any>["columns"] = [];
  [...(columns || []), ...removeColumns].forEach((col) => {
    const width = col.width || 100;

    tableWidthSum += width;

    tableColumns.push({
      dataIndex: col.name,
      title: col.title,
      width,
      fixed: col.fixed,
      render: (_, record, index) => {
        const current = get(record, col.name);

        switch (col.control) {
          case "input":
            return (
              // @ts-ignore
              <Input
                style={{ width: "100%" }}
                {...(col.controlProps || {})}
                value={current}
                onChange={(e) => {
                  const v = e.target.value;
                  onFieldChange(record, col, index, v);
                }}
              />
            );
          case "number":
            return (
              // @ts-ignore
              <InputNumber
                style={{ width: "100%" }}
                {...(col.controlProps || {})}
                value={current}
                onChange={(v) => {
                  onFieldChange(record, col, index, v);
                }}
              />
            );
        }

        if (typeof col.control === "function") {
          return col.control(record, index, (v) => {
            onFieldChange(record, col, index, v);
          });
        }

        return current;
      },
    });
  });

  let containerStyle: Record<string, any> = {};
  if (props.width) {
    containerStyle.width = props.width;
  }

  let tableScroll: TableProps<any>["scroll"] = { x: tableWidthSum };
  if (props.height) {
    tableScroll.y = props.height;
  }

  return (
    <div style={containerStyle}>
      {/* @ts-ignore */}
      <Table size="middle" rowKey={(r, i) => `record_${i}`} columns={tableColumns} scroll={tableScroll} dataSource={props.value} pagination={false} />
      {!disableAdd && (
        // @ts-ignore
        <Button
          style={{ marginTop: 8 }}
          size="middle"
          type="dashed"
          block
          onClick={() => {
            const newValue = [...(value || []), {}];
            props.onChange?.(newValue);
          }}
        >
          {/* @ts-ignore */}
          <PlusOutlined />
          添加
        </Button>
      )}
    </div>
  );
});

export default EditableTable;
