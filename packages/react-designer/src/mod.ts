export { default as DesignerStore} from "./DesignerStore";

import ComponentPropertiesPanel from "./rocks/component-properties-panel";
import ComponentTree from "./rocks/component-tree";
import PropSetter from "./rocks/PropSetter";
import Toolbox from "./rocks/toolbox";

// prop panels
import AppearancePropPanel from "./prop-panels/AppearancePropPanel";
import ComponentPropPanel from "./prop-panels/ComponentPropPanel";
import PositionPropPanel from "./prop-panels/PositionPropPanel";
import SizePropPanel from "./prop-panels/SizePropPanel";
import TextPropPanel from "./prop-panels/TextPropPanel";

// prop setters
import MultiControlsPropSetter from "./prop-setters/MultiControlsPropSetter";
import NumberPropSetter from "./prop-setters/NumberPropSetter";
import NumberWithUnitsPropSetter from "./prop-setters/NumberWithUnitsPropSetter";
import SelectPropSetter from "./prop-setters/SelectPropSetter";
import SingleControlPropSetter from "./prop-setters/SingleControlPropSetter";
import SwitchPropSetter from "./prop-setters/SwitchPropSetter";
import TextPropSetter from "./prop-setters/TextPropSetter";

// setter inputs
import NumberSetterInput from "./setter-input-controls/NumberSetterInput";
import SelectSetterInput from "./setter-input-controls/SelectSetterInput";
import SliderSetterInput from "./setter-input-controls/SliderSetterInput";
import SwitchSetterInput from "./setter-input-controls/SwitchSetterInput";
import TextSetterInput from "./setter-input-controls/TextSetterInput";

export const Rocks = {
  ComponentPropertiesPanel,
  ComponentTree,
  PropSetter,
  Toolbox,

  // prop panels
  AppearancePropPanel,
  ComponentPropPanel,
  PositionPropPanel,
  SizePropPanel,
  TextPropPanel,

  // prop setters
  MultiControlsPropSetter,
  NumberPropSetter,
  NumberWithUnitsPropSetter,
  SelectPropSetter,
  SingleControlPropSetter,
  SwitchPropSetter,
  TextPropSetter,

  // setter inputs
  NumberSetterInput,
  SelectSetterInput,
  SliderSetterInput,
  SwitchSetterInput,
  TextSetterInput,
};