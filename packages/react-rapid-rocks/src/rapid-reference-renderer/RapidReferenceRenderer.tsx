import { Rock, RockConfig } from "@ruiapp/move-style";
import { find } from "lodash";
import RapidReferenceRendererMeta from "./RapidReferenceRendererMeta";
import { RapidReferenceRendererRockConfig } from "./rapid-reference-renderer-types";
import { renderRock } from "@ruiapp/react-renderer";

export default {
  $type: "rapidReferenceRenderer",

  Renderer(context, props: RapidReferenceRendererRockConfig) {
    const { list, value, valueFieldName, textFieldName, itemRenderer } = props;

    const item = find(list, item => {
      return item[valueFieldName] == value;
    });
    if (!item) {
      return null;
    }

    if (itemRenderer) {
      const rockConfig = {
        ...itemRenderer,
        value: item,
        $id: `${props.$id}-rdr`,
      } as RockConfig;

      return renderRock({context, rockConfig});
    }

    return "" + item[textFieldName];
  },

  ...RapidReferenceRendererMeta,
} as Rock;