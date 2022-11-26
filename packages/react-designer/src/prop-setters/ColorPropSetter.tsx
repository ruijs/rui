import { Page, RockConfig, RockEventHandler, RockEventHandlerScript, Rock } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { useCallback } from "react";
import DesignerStore from "../DesignerStore";

export interface ColorPropSetterProps {
  designingPage: Page;
  label: string;
  labelTip?: string;
  propName: string;
  value?: string;
  onChange: RockEventHandler;
}

export default {
  $type: "colorPropSetter",

  renderer(props: ColorPropSetterProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const rockConfig: RockConfig = {
      $type: "antdInput",
      value: props.value,
      onChange: props.onChange,
    }

    return <div>
      <div>{ props.label }</div>
      <div>
        {
          renderRock(framework, page, rockConfig)
        }
      </div>
    </div>
  },
} as Rock;