import { Rock, ContainerRockConfig, StoreConfig, Framework, Page } from "@ruijs/move-style";
import { Scope } from "@ruijs/react-renderer";
import _ from "lodash";

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
    return <Scope $id={$id} framework={framework} page={page} stores={stores} initialVars={initialVars}>
      {
        props.children
      }
    </Scope>
  }
} as Rock;