import { SimpleRockConfig } from "@ruiapp/move-style";
import { ReactNode } from "react";

type ChangeHandler = (value: any) => void;

export interface EditableTableColumn {
  name: string;
  width: number;
  title?: string;
  fixed?: "left" | "right";
  control?: "input" | "number" | "select" | "datepicker" | ((record: any, index: number, change: ChangeHandler) => ReactNode);
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

export interface EditableTableRockConfig extends SimpleRockConfig, EditableTableProps {}
