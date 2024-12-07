import { Rock, ContainerRockConfig, StoreConfig, Framework, Page, ScopeState } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { useEffect, useState } from "react";

export interface ScopeProps extends ContainerRockConfig {
  stores?: StoreConfig[];
  initialVars: Record<string, any>;
}

export default {
  $type: "scope",

  props: {},

  Renderer: (context, props: ScopeProps) => {
    const { $id, stores, initialVars } = props;
    const { framework, page, logger } = context;
    logger.debug(props, `[Scope Rock] rendering Scope '${$id}'`);

    const scope = page.getScope($id);
    const [scopeState, setScopeState] = useState<ScopeState>();

    useEffect(() => {
      logger.debug(props, `[Scope Rock] Mounting scope '${$id}'.`);
      scope.observe((state: ScopeState) => {
        logger.debug(props, `[Scope Rock] Scope ${props.$id} changed, current version: ${state.version}`);
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
            $slot: props.$slot,
          },
          rockChildrenConfig: props.children,
        })}
      </>
    );
  },
} as Rock;
