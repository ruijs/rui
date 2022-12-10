import { RockMeta } from "../types/rock-types";

export function getRockDefaultProps(rockMeta: RockMeta) {
  const defaultProps = {};
  if (!rockMeta.props) {
    return defaultProps;
  }

  for (const propName in rockMeta.props) {
    const propMeta = rockMeta.props[propName];
    if (propMeta.hasOwnProperty("defaultValue")) {
      defaultProps[propName] = propMeta.defaultValue;
    }
  }

  return defaultProps;
}
