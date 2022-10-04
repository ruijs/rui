import { Framework } from "@ruijs/move-style";
import { createContext, useContext } from "react";

export const RuiFrameworkContext = createContext<Framework>(null);

export function useRuiFramework() {
  return useContext(RuiFrameworkContext);
}