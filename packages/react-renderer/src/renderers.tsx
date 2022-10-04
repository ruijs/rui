import { Framework, Page, RockConfig, utils } from "@ruijs/move-style";
import React from "react";

export function renderRock(framework: Framework, page: Page, config: RockConfig) {
  const componentType = config.$type;
  const component = framework.getComponent(componentType);
  if (!component) {
    console.debug(config);
    throw new Error(`Unknown component '${componentType}'`);
  }

  const Renderer: any = component.renderer;
  if (!Renderer.displayName) {
    Renderer.displayName = component.$type;
  }

  const props = config;

  if (!config.$id) {
    console.warn(`Id of component '${config.$type}' was not set.`)
    config.$id = utils.generateComponentId(config.$type);
  }

  console.debug("renderRock", JSON.stringify({$type: config.$type, $id: config.$id}));

  return React.createElement(
    Renderer,
    {
      key: config.$id,
      ...props
    }
  );
}

export function renderRockChildren(framework: Framework, page: Page, children: RockConfig["children"]) {
  if (children == null) {
    return null;
  }

  if (Array.isArray(children)) {
    const rocks = children as RockConfig[];
    return rocks.map((rock) => renderRock(framework, page, rock));
  } else {
    const rock = children as RockConfig;
    return renderRock(framework, page, rock);
  }
}