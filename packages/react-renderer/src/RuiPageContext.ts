import { Page } from "@ruijs/move-style";
import { createContext, useContext } from "react";

export const RuiPageContext = createContext<Page>(null);

export function useRuiPage() {
  return useContext(RuiPageContext);
}