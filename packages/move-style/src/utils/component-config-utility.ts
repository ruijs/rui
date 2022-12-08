import { RockConfig } from "../types/rock-types";

export function isComponentPropertyDynamic(componentConfig: RockConfig, propName: string) {
  if (!propName) {
    return false;
  }
  return componentConfig.$exps && componentConfig.$exps.hasOwnProperty(propName);
}

const regEventPropName = /^on[A-Z]/;

export function isEventPropName(propName: string) {
  return regEventPropName.test(propName);
}
