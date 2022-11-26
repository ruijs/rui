import Antd from "antd";
import { Rock } from "@ruijs/move-style";
import _ from "lodash";
import { isComponentName } from "./utils";
import { convertAntdComponentToRock } from "./component-convert";

const rocks: Record<string, Rock> = {};

function wrapToRocks(prefixName, groupName, componentGroup) {
  for(const componentName in componentGroup) {
    if (!isComponentName(componentName)) {
      continue;
    }

    if (componentName.startsWith("Icon")) {
      continue;
    }

    const rockType = `${prefixName}${componentName}`;
    const component = componentGroup[componentName];
    rocks[rockType] = convertAntdComponentToRock(component, rockType);

    wrapToRocks(rockType, `${groupName}.${componentName}`, component);
  }
}


console.info("Converting Antd components to rocks.")
wrapToRocks("antd", "Antd", Antd);

export default rocks;