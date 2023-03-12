import { Rock, RockConfig, SimpleRockConfig } from "@ruijs/move-style";
import RapidDictionaryEntryRendererMeta from "./RapidDictionaryEntryRendererMeta";
import { RapidDictionaryEntryRendererRockConfig } from "./rapid-dictionary-entry-renderer-types";
import { renderRock, useRuiFramework, useRuiPage, useRuiScope } from "@ruijs/react-renderer";

export default {
  $type: "rapidDictionaryEntryRenderer",

  Renderer(context, props: RapidDictionaryEntryRendererRockConfig) {
    const { value } = props;

    if (!value) {
      return null;
    }

    const rockConfig: RockConfig = {
      $id: `${props.$id}`,
      $type: "antdTag",
      color: value.color,
      children: {
        $id: `${props.$id}-txt`,
        $type: "text",
        text: value.name,
      },
    } as RockConfig;

    return renderRock({context, rockConfig});
  },

  ...RapidDictionaryEntryRendererMeta,
} as Rock;