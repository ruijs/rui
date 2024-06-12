import * as Antd from "antd";
import { Rock } from "@ruiapp/move-style";
import { isComponentName } from "./utils";
import { convertAntdComponentToRock } from "./antd-component-convert";

const rocks: Rock[] = [];

function wrapToRocks(prefixName, groupName, componentGroup) {
  for (const componentName in componentGroup) {
    if (!isComponentName(componentName)) {
      continue;
    }

    if (componentName.startsWith("Icon")) {
      continue;
    }

    const rockType = `${prefixName}${componentName}`;
    const component = componentGroup[componentName];
    rocks.push(convertAntdComponentToRock(component, rockType));

    wrapToRocks(rockType, `${groupName}.${componentName}`, component);
  }
}

console.info("Converting Antd components to rocks.");
wrapToRocks("antd", "Antd", Antd);

export default rocks;
