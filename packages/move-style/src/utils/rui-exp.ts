import { get } from "lodash";
import qs from "qs";
import { fulfillVariablesInString } from "./variable-fulfiller";
import listToTree from "./list-to-tree";

export default {
  execVarText: (input: string, variables: Record<string, any>) => {
    return fulfillVariablesInString(input, variables);
  },

  parseQuery: () => {
    const search = location.search;
    if (!search) {
      return {};
    }

    const query = qs.parse(search.substring(1));
    return query;
  },

  listToTree: listToTree,
};
