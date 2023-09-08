import { RapidFieldType } from "./rapid-entity-types";

export const fieldTypeToDisplayRockTypeMap: Record<RapidFieldType, string> = {
  text: "rapidTextRenderer",
  integer: "rapidTextRenderer", // TODO: should use rapidNumberRenderer
  long: "rapidTextRenderer",
  float: "rapidTextRenderer",
  double: "rapidTextRenderer",
  boolean: "rapidBoolRenderer",
  date: "rapidDateTimeRenderer",
  time: "rapidDateTimeRenderer",
  datetime: "rapidDateTimeRenderer",
  datetimetz: "rapidDateTimeRenderer",
  option: "rapidReferenceRenderer",
  relation: "rapidObjectRenderer",
  json: "rapidJsonRenderer",
}

export const defaultDisplayPropsOfFieldType: Record<string, Record<string, any>> = {
  date: {
    format: "YYYY-MM-DD",
  },

  datetime: {
    format: "YYYY-MM-DD HH:mm:ss",
  },
}