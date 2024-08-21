import { omit } from "lodash";
import { DeclarativeRock, ProCodeRock, Rock, RockConfigSystemFields, RockInstance, RockInstanceFields } from "./types/rock-types";
import { Framework } from "./Framework";

export function wrapRenderer(framework: Framework, rock: Rock) {
  if ((rock as any)._rendererWrapped) {
    return;
  }

  if (rock.declarativeComponent !== true) {
    rock.componentRenderer = createComponentRenderer(framework, rock) as any;
  }
  // TODO: remove `as any`
  (rock as any)._rendererWrapped = true;
}

/**
 * Convert rock renderer to component renderer.
 * Rock renderer accepts props, state, and context parameters,
 * While component renderer accepts just props parameter.
 * @param rock
 * @param rockRenderer
 * @returns
 */
function genComponentRenderer(rock: Rock, rockRenderer: any) {
  return function (rockInstance: RockInstance) {
    // DO NOT remove "$id" and "$exps" fields.
    const instanceFields: (RockInstanceFields | RockConfigSystemFields)[] = ["_initialized", "_state", "_hidden", "$type", "$version"];
    const rockProps = omit(rockInstance, instanceFields);

    const renderResult = rockRenderer(rockInstance._context, rockProps, rockInstance._state, rockInstance);
    return renderResult;
  };
}

export function createComponentRenderer(framework: Framework, rock: ProCodeRock) {
  return genComponentRenderer(rock, rock.Renderer);
}

export function createDeclarativeComponentRenderer(framework: Framework, rock: DeclarativeRock, rockRenderer: any) {
  return genComponentRenderer(rock, rockRenderer);
}
