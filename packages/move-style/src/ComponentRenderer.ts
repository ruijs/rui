import { omit } from 'lodash';
import { Rock, RockConfigSystemFields, RockInstance, RockInstanceFields } from './types/rock-types';
import { Framework } from './Framework';

export function wrapRenderer(framework: Framework, rock: Rock) {
  if ((rock as any)._rendererWrapped) {
    return;
  }

  // TODO: remove `as any`
  rock.Renderer = createComponentRenderer(framework, rock) as any;
  (rock as any)._rendererWrapped = true;
}

/**
 * Convert rock renderer to component renderer.
 * Rock renderer accepts props, state, and context parameters,
 * While component renderer accepts just props parameter.
 * @param rock
 * @returns
 */
function createComponentRenderer(framework: Framework, rock: Rock) {
  const rockRenderer = rock.Renderer;
  const Renderer = function (rockInstance: RockInstance) {
    if (rock.onResolveState) {
      if (!rockInstance._state) {
        rockInstance._state = {};
      }

      Object.assign(rockInstance._state, rock.onResolveState(rockInstance, rockInstance._state));
    }

    // DO NOT remove "$id" and "$exps" fields.
    const instanceFields: (RockInstanceFields | RockConfigSystemFields)[] = ['_initialized', '_state', '_hidden', '$type', '$version'];
    const rockProps = omit(rockInstance, instanceFields);

    const renderResult = rockRenderer(rockInstance._context, rockProps, rockInstance._state);
    return renderResult;
  };

  return Renderer;
}
