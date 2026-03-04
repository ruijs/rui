import type { SimpleRockConfig, RockConfig, ContainerRockConfig } from "@ruiapp/move-style";
import type { ReactNode } from "react";

export const LIST_ROCK_TYPE = "list" as const;

export interface ListProps {
  dataSource?: any[];
  header?: ReactNode;
  footer?: ReactNode;
  separator?: ReactNode;
  item?: (item: any, list: any[], index: number, key: string) => ReactNode;
  itemContainer?: (item: any, list: any[], index: number, key: string, children: () => ReactNode) => ReactNode;
}

export interface ListRockConfig extends SimpleRockConfig, Omit<ListProps, "header" | "footer" | "separator" | "item" | "itemContainer"> {
  $type: typeof LIST_ROCK_TYPE;
  header?: RockConfig;
  footer?: RockConfig;
  separator?: RockConfig;
  item?: RockConfig;
  itemContainer?: RockConfig;
}
