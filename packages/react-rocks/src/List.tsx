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
    item: {
      required: false,
      allowMultiComponents: false,
      toRenderProp: true,
      argumentsToProps: true,
      argumentNames: ["item", "list", "index"],
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
  const { dataSource, item, separator, header, footer } = props;
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
                {item(dataItem, dataList, index)}
              </>
            );
          } else {
            return item(dataItem, dataList, index);
          }
        } else {
          return item(dataItem, dataList, index);
        }
      })}
      {footer}
    </div>
  );
}
