import { RuiPageContextType } from "@ruiapp/move-style";
import { createContext, useContext } from "react";

export const RuiPageContext = createContext<RuiPageContextType>(null);

export function useRuiPageContext() {
  return useContext(RuiPageContext);
}
