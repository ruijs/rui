import { get, isUndefined } from "lodash";

export function getComponentPropValue(props: any, propName: string, defaultValue: any) {
  if (props.hasOwnProperty(propName)) {
    return props[propName];
  } else if (!isUndefined(defaultValue)) {
    return defaultValue;
  }
}

export function getComponentPropsValue(props: any, propNames: string[], defaultValue: any) {
  return (propNames || []).reduce((values, name) => {
    if (props.hasOwnProperty(name)) {
      values[name] = props[name];
    } else if (!isUndefined(defaultValue) && !isUndefined(defaultValue?.[name])) {
      values[name] = defaultValue[name];
    }
    return values;
  }, {});
}

export function getComponentPropExpression(props: any, propName: string) {
  return get(props.$exps, propName);
}
