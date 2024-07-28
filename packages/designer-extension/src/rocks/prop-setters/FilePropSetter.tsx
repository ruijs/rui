import { Rock, PropSetterRockConfigBase, RockSinglePropSetterBase } from "@ruiapp/move-style";
import { renderSingleControlPropSetter } from "../internal-prop-setters/SingleControlPropSetter";

export interface FilePropSetterProps extends RockSinglePropSetterBase<"filePropSetter", any>, PropSetterRockConfigBase {
  accept?: string;
  multiple?: boolean;
  title?: string;
}

export default {
  $type: "filePropSetter",

  Renderer(context, props: FilePropSetterProps) {
    const { accept, multiple, title } = props;
    return renderSingleControlPropSetter(context, {
      ...props,
      control: {
        $type: "fileUploader",
        accept,
        multiple,
        title,
      },
    });
  },
} as Rock;
