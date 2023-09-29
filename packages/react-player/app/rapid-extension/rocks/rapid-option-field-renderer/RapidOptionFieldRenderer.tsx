import type { Rock, RockConfig } from "@ruijs/move-style";
import RapidOptionFieldRendererMeta from "./RapidOptionFieldRendererMeta";
import type { RapidOptionFieldRendererRockConfig } from "./rapid-option-field-renderer-types";
import { renderRock } from "@ruijs/react-renderer";
import { find } from "lodash";
import rapidAppDefinition from "~/rapidAppDefinition";

export default {
  Renderer(context, props: RapidOptionFieldRendererRockConfig) {
    const { dictionaryCode, value } = props;

    if (!value) {
      return null;
    }

    const { dataDictionaries } = rapidAppDefinition;
    let dataDictionary = find(dataDictionaries, {code: dictionaryCode});
    if (!dataDictionary) {
      return "" + value;
    }

    const rockConfig: RockConfig = {
      $id: `${props.$id}`,
      $type: "rapidReferenceRenderer",
      list: dataDictionary.entries,
      itemRenderer: {
        $type: "rapidDictionaryEntryRenderer",
      },
      valueFieldName: "value",
      textFieldName: "name",
      value,
    } as RockConfig;

    return renderRock({context, rockConfig});
  },

  ...RapidOptionFieldRendererMeta,
} as Rock;