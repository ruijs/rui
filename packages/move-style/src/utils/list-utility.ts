import { isNull, isUndefined } from "lodash";

export type OrderOption = {
  field: string;
  desc?: boolean;
  localeCompare?: boolean;
  //comparer?: (a: any, b: any) => number;
};

export function listOrderBy(objectList: Record<string, any>[], orderBy: OrderOption[]): Record<string, any>[] {
  if (!objectList) {
    return objectList;
  }

  const sortResult = objectList.sort((a, b) => {
    let result = compareUndefinedOrNull(a, b);
    if (!isNull(result)) {
      return result;
    }

    for (const orderOption of orderBy) {
      const { field, desc, localeCompare } = orderOption;
      const fieldValueA = a[field];
      const fieldValueB = b[field];
      const compareResult = compare(fieldValueA, fieldValueB, localeCompare);
      if (compareResult !== 0) {
        if (desc) {
          return compareResult * -1;
        }
        return compareResult;
      }
    }

    return 0;
  });

  return sortResult;
}

function compare(a: any, b: any, localeCompare: boolean): number {
  let result = compareUndefinedOrNull(a, b);
  if (!isNull(result)) {
    return result;
  }

  if (localeCompare) {
    return (a as string).localeCompare(b);
  }

  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }

  return 0;
}

function compareUndefinedOrNull(a: any, b: any): number | null {
  if (isUndefined(a)) {
    return -1;
  }
  if (isNull(a)) {
    if (isUndefined(b)) {
      return 1;
    }
    return -1;
  }
  if (isUndefined(b)) {
    return 1;
  }
  if (isNull(b)) {
    return 1;
  }

  return null;
}
