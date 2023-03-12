import * as _ from "lodash";
import { forEach, get, isArray, isObject, isString } from "lodash";

export interface VariableProvider {
  getVariable: (name: string) => string | undefined;
}

export function genVariableStore(obj: Record<string, any>) {
  return {
    getVariable: (name: string) => {
      return get(obj, name);
    }
  }
}

export function fulfillVariables(input: Record<string, any> | Array<any> | string, variables: Record<string, any>) {
  const variableProvider = genVariableStore(variables);
  if (!input) {
    return input;
  } else if (isString(input)) {
    return fulfillVariablesInString(input as string, variableProvider);
  } else if (isArray(input)) {
    const result: any[] = [];
    forEach(input, (item, index) => {
      result.push(fulfillVariables(item, variableProvider));
    });
    return result;
  } else if (isObject(input)) {
    const result: any = {};
    for (const key in input as Record<string, any>) {
      result[key] = fulfillVariables(input[key], variableProvider);
    }
    return result;
  }

  return input;
}

const reg = /\{\{(\S+?)\}\}/g;

export function fulfillVariablesInString(input: string, variables: Record<string, any>) {
  const variableProvider = genVariableStore(variables);
  return input.replaceAll(reg, (match, name) => {
    const fields = name.split(".");
    if (fields.length === 1) {
      return variableProvider.getVariable(name);
    }

    let result;
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (i == 0) {
        result = variableProvider.getVariable(field);
      } else {
        result = result[field];
      }

      if (!_.isObject(result)) {
        break;
      }
    }

    return result;
  });
}
