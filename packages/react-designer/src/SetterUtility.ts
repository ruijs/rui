import _ from "lodash";

export function getComponentPropValue(props: any, propName: string, defaultValue: any) {
  if (props.hasOwnProperty(propName)) {
    return props[propName];
  } else if (!_.isUndefined(defaultValue)) {
    return defaultValue;
  }
  
}