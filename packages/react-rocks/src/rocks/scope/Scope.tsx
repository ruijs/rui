import { Rock, RockInstance, ScopeState } from "@ruiapp/move-style";
import { renderRockChildren, genRockRenderer } from "@ruiapp/react-renderer";
import { useEffect, useState } from "react";
import ScopeMeta from "./ScopeMeta";
import { ScopeProps, ScopeRockConfig } from "./scope-types";

export function configScope(config: ScopeRockConfig): ScopeRockConfig {
  return config;
}

export function Scope(props: ScopeProps) {
  const { children } = props;
  const rockInstance = props as any as RockInstance;
  const { $id, $slot, _context: context } = rockInstance;
  const { framework, page, logger } = context;

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
  }, [page, scope]);

  const childrenContext = { framework, page, scope, logger };

  return (
    <>
      {renderRockChildren({
        context: childrenContext,
        fixedProps: {
          $slot: $slot,
        },
        rockChildrenConfig: children,
      })}
    </>
  );
}

export default {
  Renderer: (context, props) => {
    return Scope(props);
  },
  ...ScopeMeta,
} as Rock<ScopeRockConfig>;
