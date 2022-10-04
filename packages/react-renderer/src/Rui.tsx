import { Framework, PageConfig } from "@ruijs/move-style";
import { RuiFrameworkContext } from "./RuiFrameworkContext";
import RuiPage from "./RuiPage";

export interface RuiProps {
  framework: Framework;
  page: PageConfig;
}

function Rui(props: RuiProps) {
  const { framework, page } = props;


  return <RuiFrameworkContext.Provider value={framework}>
    <RuiPage page={page} />
  </RuiFrameworkContext.Provider>
}

export default Rui;