import ComponentEventHandlersPanel from "./component-event-handlers-panel";
import ComponentPropertiesPanel from "./component-properties-panel";
import ComponentTree from "./component-tree";
import JsonValueDisplay from "./json-value-display";
import PreviewWrapper from "./preview-wrapper";
import PropSetter from "./PropSetter";
import EventHandlerSetter from "./EventHandlerSetter";
import Toolbox from "./toolbox";

// prop panels
import AppearancePropPanel from "./prop-panels/AppearancePropPanel";
import ComponentPropPanel from "./prop-panels/ComponentPropPanel";
import PositionPropPanel from "./prop-panels/PositionPropPanel";
import SizePropPanel from "./prop-panels/SizePropPanel";
import TextPropPanel from "./prop-panels/TextPropPanel";
import BorderPropPanel from "./prop-panels/BorderPropPanel";

// internal prop setters
import ExpressionPropSetter from "./internal-prop-setters/ExpressionPropSetter";
import MultiControlsPropSetter from "./internal-prop-setters/MultiControlsPropSetter";
import SingleControlPropSetter from "./internal-prop-setters/SingleControlPropSetter";
import SingleControlPropsSetter from "./internal-prop-setters/SingleControlPropsSetter";

// prop setters
import JsonPropSetter from "./prop-setters/JsonPropSetter";
import NumberPropSetter from "./prop-setters/NumberPropSetter";
import NumberWithSliderPropSetter from "./prop-setters/NumberWithSliderPropSetter";
import NumberWithUnitsPropSetter from "./prop-setters/NumberWithUnitsPropSetter";
import SelectPropSetter from "./prop-setters/SelectPropSetter";
import SwitchPropSetter from "./prop-setters/SwitchPropSetter";
import TextPropSetter from "./prop-setters/TextPropSetter";
import ColorPropSetter from "./prop-setters/ColorPropSetter";
import FilePropSetter from "./prop-setters/FilePropSetter";

// event setters
import ScriptEventHandlerSetter from "./event-handler-setters/ScriptEventHandlerSetter";

// event setter groups
import ComponentEventHandlerSetterGroup from "./event-handler-setter-groups/ComponentEventHandlerSetterGroup";

// setter inputs
import ExpressionSetterInput from "./setter-input-controls/ExpressionSetterInput";
import JsonSetterInput from "./setter-input-controls/JsonSetterInput";
import NumberSetterInput from "./setter-input-controls/NumberSetterInput";
import ScriptSetterInput from "./setter-input-controls/ScriptSetterInput";
import SelectSetterInput from "./setter-input-controls/SelectSetterInput";
import SliderSetterInput from "./setter-input-controls/SliderSetterInput";
import SwitchSetterInput from "./setter-input-controls/SwitchSetterInput";
import TextSetterInput from "./setter-input-controls/TextSetterInput";

// controls
import ColorPicker from "./controls/color-picker";
import FileUploader from "./controls/file-uploader";

export default [
  ComponentEventHandlersPanel,
  ComponentPropertiesPanel,
  ComponentTree,
  JsonValueDisplay,
  PreviewWrapper,
  EventHandlerSetter,
  PropSetter,
  Toolbox,

  // prop panels
  AppearancePropPanel,
  ComponentPropPanel,
  PositionPropPanel,
  SizePropPanel,
  TextPropPanel,
  BorderPropPanel,

  // internal prop setters
  ExpressionPropSetter,
  MultiControlsPropSetter,
  SingleControlPropSetter,
  SingleControlPropsSetter,

  // prop setters
  JsonPropSetter,
  NumberPropSetter,
  NumberWithSliderPropSetter,
  NumberWithUnitsPropSetter,
  SelectPropSetter,
  SwitchPropSetter,
  TextPropSetter,
  ColorPropSetter,
  FilePropSetter,

  // event setters
  ScriptEventHandlerSetter,

  // event settter groups
  ComponentEventHandlerSetterGroup,

  // setter inputs
  ExpressionSetterInput,
  JsonSetterInput,
  NumberSetterInput,
  ScriptSetterInput,
  SelectSetterInput,
  SliderSetterInput,
  SwitchSetterInput,
  TextSetterInput,

  // controls
  ColorPicker,
  FileUploader,
];
