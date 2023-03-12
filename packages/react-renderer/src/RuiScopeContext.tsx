import { Scope } from "@ruijs/move-style";
import { createContext, useContext } from "react";

export const ScopeContext = createContext<Scope>(null);

export function useRuiScope() {
  return useContext(ScopeContext);
}
