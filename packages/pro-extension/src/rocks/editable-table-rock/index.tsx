import type { Rock } from "@ruiapp/move-style";
import EditableTable from "~/components/editable-table";
import meta from "./meta";
import { EditableTableRockConfig } from "./type";

export default {
  Renderer(context, props: EditableTableRockConfig) {
    return <EditableTable {...props} />;
  },

  ...meta,
} as Rock;
