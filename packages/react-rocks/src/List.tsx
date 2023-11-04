import type { RockConfig, Rock, SimpleRockConfig } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { each } from "lodash";

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
      setters: [
      ]
    }
  ],

  slots: {
    item: {
      required: false,
      allowMultiComponents: false,
    },

    separator: {
      required: false,
      allowMultiComponents: false,
    },

    header: {
      required: false,
      allowMultiComponents: false,
    },

    footer: {
      required: false,
      allowMultiComponents: false,
    },
  },

  Renderer(context, props) {
    const { $id, dataSource, item, separator, header, footer} = props;
    let children: RockConfig[] = [];

    if (header) {
      children.push({
        ...header,
        $id: `${$id}-header`,
      });
    }
    
    if (dataSource) {
      each(dataSource, (value, index) => {
        if (index !== 0 && separator) {
          children.push({
            ...separator,
            $id: `${$id}-separator-${index}`,
          });
        }

        children.push({
          ...item,
          $id: `${$id}-item-${index}`,
          value,
        });
      })
    }

    if (footer) {
      children.push({
        ...footer,
        $id: `${$id}-footer`,
      });
    }

    return renderRockChildren({context, 
      rockChildrenConfig: children,
    });
  },

} as Rock<ListProps>;