import type { Rock } from "@ruiapp/move-style";
import { genRockRenderer } from "@ruiapp/react-renderer";
import ListMeta from "./ListMeta";
import type { ListProps, ListRockConfig } from "./list-types";
import React from "react";

export function configList(config: ListRockConfig): ListRockConfig {
  return config;
}

export function List(props: ListProps) {
  const { dataSource, itemContainer: itemContainerRenderer, item: itemRenderer, separator, header, footer } = props;
  const dataList = dataSource || [];

  return (
    <div>
      {header}
      {dataList.map((dataItem, index) => {
        if (separator) {
          if (index > 0) {
            return (
              <React.Fragment key={`sep-item-${index}`}>
                {separator}
                {renderItem(itemContainerRenderer, itemRenderer, dataItem, dataList, index, `item-${index}`)}
              </React.Fragment>
            );
          } else {
            return renderItem(itemContainerRenderer, itemRenderer, dataItem, dataList, index, `item-${index}`);
          }
        } else {
          return renderItem(itemContainerRenderer, itemRenderer, dataItem, dataList, index, `item-${index}`);
        }
      })}
      {footer}
    </div>
  );
}

function renderItem(itemContainerRenderer: any, itemRenderer: any, dataItem: any, dataList: any, index: any, key: any) {
  if (itemContainerRenderer) {
    return itemContainerRenderer(dataItem, dataList, index, key, () => {
      return itemRenderer(dataItem, dataList, index, key);
    });
  }

  return itemRenderer(dataItem, dataList, index, key);
}

export default {
  Renderer: genRockRenderer(ListMeta.$type, List, true),
  ...ListMeta,
} as Rock<ListRockConfig>;
