import { Rock, RockConfig, ContainerRockConfig } from "@ruijs/move-style";
import { useRuiFramework, useRuiPage, renderRockSlot, useRuiScope, convertToEventHandlers, renderRockChildren } from "@ruijs/react-renderer";
import { Descriptions, DescriptionsProps } from "antd";
import _ from "lodash";
import RapidDetailsMeta from "./RapidDetailsMeta";

export interface RapidDetailsProps extends ContainerRockConfig {
  size: "default" | "middle" | "small";
  bordered: boolean;
  /**
   * 是否显示冒号
   */
  colon?: boolean;
  /**
   * 栏数
   */
  column?: number;
  dataSource: any;
  extra: RockConfig[];
}

export default {
  $type: "rapidDetails",

  Renderer(context, props: RapidDetailsProps) {
    const antdProps: DescriptionsProps = {
      bordered: props.bordered,
      size: props.size,
      colon: props.colon,
      column: props.column,
    };

    if (props.extra) {
      antdProps.extra = renderRockSlot({context,
        slot: props.extra,
        rockType: "rapidDetails",
        slotName: "extra",
        args: []
      });
    }

    return (
      <Descriptions {...antdProps}>
        {
          renderRockChildren({context,
            rockChildrenConfig: props.children,
            fixedProps: {
              dataSource: props.dataSource
            }
          })
        }
      </Descriptions>
    )
  },

  ...RapidDetailsMeta
} as Rock;