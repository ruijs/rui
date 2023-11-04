import type { FunctionMeta } from "@ruiapp/move-style";
import type { SearchFormFilterConfiguration } from "@ruiapp/react-rapid-rocks";
import { isNull, isUndefined, map } from "lodash";


export const searchParamsToFilters = (filterConfigurations: SearchFormFilterConfiguration[], searchParams: Record<string, any>) => {
  const filters: any[] = [];

  for (const filterConfig of filterConfigurations) {
    const paramValue = searchParams[filterConfig.code];
    if (isNull(paramValue) || isUndefined(paramValue)) {
      continue;
    }

    const operator = filterConfig.filterMode || "contains";
    let filterFields = filterConfig.filterFields || [ filterConfig.code ];
    if (!filterFields.length) {
      filterFields = [ filterConfig.code ];
    }

    if (filterFields.length === 1) {
      filters.push({
        field: filterFields[0],
        operator,
        value: paramValue,
      });
    } else {
      filters.push({
        operator: "or",
        filters: map(filterFields, filterField => {
          return {
            field: filterField,
            operator,
            value: paramValue,
          };
        }),
      });
    }
  }

  return filters;
}

export default {
  name: "searchParamsToFilters",
  func: searchParamsToFilters,
} as FunctionMeta;