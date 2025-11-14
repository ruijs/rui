import type { RockConfig, Rock, SimpleRockConfig } from "@ruiapp/move-style";
import { genRockRenderer } from "@ruiapp/react-renderer";

export interface ListProps extends SimpleRockConfig {
  dataSource?: any[];
  header?: RockConfig;
  item?: RockConfig;
  separator?: RockConfig;
  footer?: RockConfig;
}

export default {
  $type: "list",

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [],
    },
  ],

  slots: {
    itemContainer: {
      required: false,
      allowMultiComponents: false,
      toRenderProp: true,
      argumentsToProps: true,
      argumentNames: ["item", "list", "index", "key", "children"],
    },

    item: {
      required: false,
      allowMultiComponents: false,
      toRenderProp: true,
      argumentsToProps: true,
      argumentNames: ["item", "list", "index", "key"],
    },

    separator: {
      required: false,
      allowMultiComponents: false,
    },

    header: {
      required: false,
      allowMultiComponents: true,
    },

    footer: {
      required: false,
      allowMultiComponents: true,
    },
  },

  Renderer: genRockRenderer("list", List),
} as Rock<ListProps>;

function List(props: any) {
  const { dataSource, itemContainer: itemContainerRenderer, item: itemRenderer, separator, header, footer } = props;
  const dataList = dataSource || [];

  return (
    <div>
      {header}
      {dataList.map((dataItem, index) => {
        if (separator) {
          if (index > 0) {
            return (
              <>
                {separator}
                {renderItem(itemContainerRenderer, itemRenderer, dataItem, dataList, index, `item-${index}`)}
              </>
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
