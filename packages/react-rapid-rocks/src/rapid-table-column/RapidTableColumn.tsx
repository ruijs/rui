import type { Rock } from "@ruiapp/move-style";
import RapidTableColumnMeta from "./RapidTableColumnMeta";
import { RapidTableColumnRockConfig } from "./rapid-table-column-types";

export default {
  Renderer(context, props: RapidTableColumnRockConfig) {
    return null;
  },

  ...RapidTableColumnMeta
} as Rock;