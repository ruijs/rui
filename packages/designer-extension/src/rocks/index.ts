import ComponentEventHandlersPanel from "./component-event-handlers-panel";
import ComponentPropertiesPanel from "./component-properties-panel";
import ComponentTree from "./component-tree";
import JsonValueDisplay from "./setter-display-controls/json-value-display";
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
import SingleControlMultiPropsSetter from "./internal-prop-setters/SingleControlMultiPropsSetter";

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

// setter displays
import ExpressionSetterDisplay from "./setter-display-controls/ExpressionSetterDisplay";

// setter inputs
import ExpressionSetterInput from "./setter-input-controls/ExpressionSetterInput";
import JsonSetterInput from "./setter-input-controls/JsonSetterInput";
import NumberSetterInput from "./setter-input-controls/NumberSetterInput";
import ScriptSetterInput from "./setter-input-controls/ScriptSetterInput";
import SelectSetterInput from "./setter-input-controls/SelectSetterInput";
import SliderSetterInput from "./setter-input-controls/SliderSetterInput";
import SwitchSetterInput from "./setter-input-controls/SwitchSetterInput";
import TextSetterInput from "./setter-input-controls/TextSetterInput";

// prop renderers
import TextPropRenderer from "./prop-renderers/TextPropRenderer";

// controls
import ColorPicker from "./controls/color-picker";
import FileUploader from "./controls/file-uploader";
import CommonPropPanel from "./prop-panels/CommonPropPanel";
import SelectIconPropSetter from "./prop-setters/SelectIconPropSetter";
import selectIcon from "./controls/select-icon";

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
  CommonPropPanel,
  SizePropPanel,
  TextPropPanel,
  BorderPropPanel,

  // internal prop setters
  ExpressionPropSetter,
  MultiControlsPropSetter,
  SingleControlPropSetter,
  SingleControlMultiPropsSetter,

  // prop setters
  JsonPropSetter,
  NumberPropSetter,
  NumberWithSliderPropSetter,
  NumberWithUnitsPropSetter,
  SelectPropSetter,
  SelectIconPropSetter,
  SwitchPropSetter,
  TextPropSetter,
  ColorPropSetter,
  FilePropSetter,

  // event setters
  ScriptEventHandlerSetter,

  // event settter groups
  ComponentEventHandlerSetterGroup,

  // setter displays
  ExpressionSetterDisplay,

  // setter inputs
  ExpressionSetterInput,
  JsonSetterInput,
  NumberSetterInput,
  ScriptSetterInput,
  SelectSetterInput,
  SliderSetterInput,
  SwitchSetterInput,
  TextSetterInput,

  // prop renderers
  TextPropRenderer,

  // controls
  ColorPicker,
  FileUploader,
  selectIcon,
];

export * from "./internal-prop-setters/ExpressionPropSetter";
export * from "./internal-prop-setters/MultiControlsPropSetter";
export * from "./internal-prop-setters/SingleControlPropSetter";
export * from "./internal-prop-setters/SingleControlMultiPropsSetter";

export * from "./prop-setters/ColorPropSetter";
export * from "./prop-setters/FilePropSetter";
export * from "./prop-setters/JsonPropSetter";
export * from "./prop-setters/NumberPropSetter";
export * from "./prop-setters/NumberWithSliderPropSetter";
export * from "./prop-setters/NumberWithUnitsPropSetter";
export * from "./prop-setters/SelectPropSetter";
export * from "./prop-setters/SwitchPropSetter";
export * from "./prop-setters/TextPropSetter";

export * from "./prop-renderers/TextPropRenderer";
