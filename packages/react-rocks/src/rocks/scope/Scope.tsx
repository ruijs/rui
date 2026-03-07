import { Rock, ScopeState } from "@ruiapp/move-style";
import { renderRockChildren, ScopeContext, useRockInstance, useRockInstanceContext } from "@ruiapp/react-renderer";
import { useEffect, useState } from "react";
import ScopeMeta from "./ScopeMeta";
import { ScopeRockConfig } from "./scope-types";

export function configScope(config: ScopeRockConfig): ScopeRockConfig {
  return config;
}

export function Scope(props: ScopeRockConfig) {
  const { children } = props;
  const { $slot } = props as any;

  const { $id } = useRockInstance(props);
  const { framework, page } = useRockInstanceContext();
  const logger = framework.getRockLogger();

  logger.debug(props, `[Scope Rock] rendering Scope '${$id}'`);

  const scope = page.getScope($id);
  const [scopeState, setScopeState] = useState<ScopeState>();

  useEffect(() => {
    logger.debug(props, `[Scope Rock] Mounting scope '${$id}'.`);
    scope.observe((state: ScopeState) => {
      logger.debug(props, `[Scope Rock] Scope ${$id} changed, current version: ${state.version}`);
      setScopeState(state);
    });
    scope.loadData();
  }, [scope]);

  const childrenContext = { framework, page, scope, logger };

  return (
    <ScopeContext.Provider value={scope}>
      {renderRockChildren({
        context: childrenContext,
        fixedProps: {
          $slot,
        },
        rockChildrenConfig: children,
      })}
    </ScopeContext.Provider>
  );
}

export default {
  Renderer: Scope,
  ...ScopeMeta,
} as Rock<ScopeRockConfig>;
