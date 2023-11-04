import { Rock, ContainerRockConfig, StoreConfig, Framework, Page, ScopeState } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { useEffect, useState } from "react";

export interface ScopeProps extends ContainerRockConfig {
  stores?: StoreConfig[];
  initialVars: Record<string, any>;
}

export default {
  $type: "scope",

  props: {
  },

  Renderer: (context, props: ScopeProps) => {
    const { $id, stores, initialVars} = props;
    const { framework, page } = context;
    console.log(`[RUI][ReactRenderer][Scope] rendering Scope '${$id}'`);

    const scope = page.getScope($id);
    const [scopeState, setScopeState] = useState<ScopeState>();
  
    useEffect(() => {
      console.log(`[RUI][ReactRenderer][Scope] Mounting scope '${$id}'.`);
      scope.observe((state: ScopeState) => {
        console.log(`[RUI][ReactRenderer][Scope] Scope ${props.$id} changed, current version: ${state.version}`)
        setScopeState(state);
      });
      scope.loadData();
    }, [page, scope]);
    const childrenContext = {framework, page, scope};
    return <>{renderRockChildren({context: childrenContext, rockChildrenConfig: props.children})}</>
  }
} as Rock;