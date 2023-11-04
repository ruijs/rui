import { Rock, SimpleRockConfig } from "@ruiapp/move-style";
import _, { find } from "lodash";
import RapidDateTimeRendererMeta from "./RapidDateTimeRendererMeta";
import dayjs from "dayjs";

export interface RapidReferenceRendererProps extends SimpleRockConfig {
  value: any;
  format: string;
}

export default {
  Renderer(context, props: RapidReferenceRendererProps) {
    const { value, format } = props;
    const dateTime = dayjs(value);
    if (!dateTime.isValid()) {
      return "-";
    }
    return dateTime.format(format || "YYYY-MM-DD HH:mm:ss");
  },

  ...RapidDateTimeRendererMeta,
} as Rock;