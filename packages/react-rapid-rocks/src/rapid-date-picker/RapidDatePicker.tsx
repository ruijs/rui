import { Rock, RockConfig } from "@ruijs/move-style";
import RapidToolbarLinkMeta from "./RapidDatePickerMeta";
import { renderRock, useRuiFramework, useRuiPage, useRuiScope } from "@ruijs/react-renderer";
import { RapidDatePickerRockConfig } from "./rapid-date-picker-types";
import { isString } from "lodash";
import dayjs from "dayjs";


export default {
  $type: "rapidDatePicker",

  Renderer(context, props) {
    if (isString(props.value)) {
      props.value = dayjs(props.value);
    }

    const rockConfig: RockConfig = {
      ...props,
      $id: `${props.$id}-inner`,
      $type: "antdDatePicker",
    };

    return renderRock({context, rockConfig});
  },

  ...RapidToolbarLinkMeta,
} as Rock<RapidDatePickerRockConfig>;