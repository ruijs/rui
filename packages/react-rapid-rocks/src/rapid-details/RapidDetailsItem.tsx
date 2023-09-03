import { Rock, RockConfig, SimpleRockConfig } from "@ruijs/move-style";
import { Descriptions } from "antd";
import RapidDetailsItemMeta from "./RapidDetailsItemMeta";
import { get } from "lodash";

export interface RapidDetailsItemProps extends SimpleRockConfig {
  key?: string;
  label: string;
  dataSource: any;
  dataIndex?: string;
  cell?: RockConfig | RockConfig[];
}

export default {
  $type: "rapidDetailsItem",

  Renderer(context, props: RapidDetailsItemProps) {
    let defaultText: string = "";
    if (props.dataSource) {
      defaultText = get(props.dataSource, props.dataIndex);
    }

    return (
      <Descriptions.Item label={props.label}>
        {
          defaultText
        }
      </Descriptions.Item>
    )
  },

  ...RapidDetailsItemMeta
} as Rock;