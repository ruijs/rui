import { Page, RockConfig, RockEventHandler, Rock } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";

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

  Renderer(context, props: ColorPropSetterProps) {
    const rockConfig: RockConfig = {
      $type: "antdInput",
      value: props.value,
      onChange: props.onChange,
    }

    return <div>
      <div>{ props.label }</div>
      <div>
        {
          renderRock({context, rockConfig})
        }
      </div>
    </div>
  },
} as Rock;