// deprecated
import { Framework, Page, ScopeState, StoreConfig } from "@ruiapp/move-style";
import { useEffect, useState } from "react";
import { renderRockChildren } from "./renderers";


export interface ScopeProps {
  $id?: string;
  framework: Framework;
  page: Page;
  stores?: StoreConfig[];
  initialVars: Record<string, any>;
  children: any;
}

function ScopeComponent(props: ScopeProps) {
  const { $id, framework, page, stores, initialVars } = props;
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

  const context = {framework, page, scope};
  return <>{renderRockChildren({context, rockChildrenConfig: props.children})}</>
}

export default ScopeComponent;