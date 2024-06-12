import type { RockConfig, Rock, SimpleRockConfig, ContainerRockConfig } from "@ruiapp/move-style";
import { renderRock, renderRockChildren } from "@ruiapp/react-renderer";
import { each } from "lodash";

export interface ListProps extends SimpleRockConfig {
  dataSource?: any[];
  header?: RockConfig;
  item?: RockConfig;
  separator?: RockConfig;
  footer?: RockConfig;
  listContainer?: ContainerRockConfig;
  itemContainer?: ContainerRockConfig;
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
    listContainer: {
      required: false,
      allowMultiComponents: false,
    },

    itemContainer: {
      required: false,
      allowMultiComponents: false,
    },

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
    const { $id, dataSource, item, separator, header, footer, listContainer, itemContainer } = props;
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

        if (itemContainer) {
          children.push({
            ...itemContainer,
            $id: `${$id}-item-${index}-ctnr`,
            children: {
              ...item,
              $id: `${$id}-item-${index}`,
              value,
            },
          });
        } else {
          children.push({
            ...item,
            $id: `${$id}-item-${index}`,
            value,
          });
        }
      });
    }

    if (footer) {
      children.push({
        ...footer,
        $id: `${$id}-footer`,
      });
    }

    if (listContainer) {
      return renderRock({
        context,
        rockConfig: {
          ...listContainer,
          $id: `${$id}-ctnr`,
          children,
        },
      });
    } else {
      return renderRockChildren({ context, rockChildrenConfig: children });
    }
  },
} as Rock<ListProps>;
