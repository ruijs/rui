import { isEqual, isNull, isUndefined } from "lodash"

function isChanged(obj1: any, obj2: any) {
  if (isUndefined(obj1) || isNull(obj1)) {
    if (isUndefined(obj2) || isNull(obj2)) {
      return false;
    }
  } else {
    return !isEqual(obj1, obj2);
  }
}

export function detectChangedFields<T extends object, U extends keyof T>(obj1: T, obj2: any, fieldNames: Array<U>) {
  const changedFieldNames = [];
  for (const fieldName of fieldNames) {
    if (isChanged(obj1[fieldName], obj2[fieldName])) {
      changedFieldNames.push(fieldName);
    }
  }

  return changedFieldNames;
}
