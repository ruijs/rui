import { HttpRequest, HttpRequestInput } from "./request-types";
import { IStore, StoreConfig, StoreConfigBase } from "./store-types";

export type FieldSettings = {
  valueType: FieldValueType;
  valueNotNull?: boolean;
  description?: string;
  defaultValue?: any;
}

export type FieldValueType = "string" | "number" | "boolean" | "object";

export type Rock = {
  renderer: (props: any) => any;
} & RockMeta;

export type RockMeta = {
  $type: string;
  $version?: string;
  name?: string;
  description?: string;
  icon?: string;
  thumbnail?: string;
  document?: string;
  presenter?: (props: any) => any;
  props?: RockMetaProps;
  slots?: RockMetaSlots;
  events?: RockMetaEvents;
  commands?: RockMetaCommands;
  dataLoader?: RockDataLoader;
  propertyPanels?: RockPropPanels;
};

export type RockMetaProps<TName extends string = string> = Record<TName, FieldSettings>;

export type RockMetaSlots = Record<string, RockMetaSlot>;

export type RockMetaSlot = {
  required: boolean;
  allowMultiComponents: boolean;
  argumentsToProps?: boolean;
  argumentNames?: string[];
}

export type RockMetaEvents = Record<string, RockMetaEvent>;

export type RockMetaEvent = {
  name: string;
  description?: string;
  args: RockMetaEventArgs;
}

export type RockMetaEventArgs = Record<string, FieldSettings>;

export type RockMetaCommands = Record<string, RockMetaCommand>;

export type RockMetaCommand = {
  name: string;
  description?: string;
  args: RockMetaCommandArgs;
}

export type RockMetaCommandArgs = Record<string, FieldSettings>;

export type RockDataLoader = {};

export type RockPropPanels = RockPropPanel[];

export type RockPropPanel = PredefinedRockPropPanel | ComponentSpecifiedRockPropPanel;

export const PredefinedRockPanelTypes = [
  "positionPropPanel",
  "sizePropPanel",
  "appearancePropPanel",
  "textPropPanel",
] as const;

export type PredefinedRockPropPanel = {
  $type: typeof PredefinedRockPanelTypes[number];
};

export type ComponentSpecifiedRockPropPanel = {
  $type: "componentPropPanel";
  setters: RockPropSetter[];
};

export type RockPropSetter =
  | ExpressionRockPropSetter
  | TextRockPropSetter
  | NumberRockPropSetter
  | NumberWithSliderRockPropSetter
  | NumberWithUnitsRockPropSetter
  | SelectRockPropSetter
  | SwitchRockPropSetter
  | SingleControlRockPropSetter
  | MultiControlsRockPropSetter;


export type ExpressionRockPropSetter = {
    $type: "expressionPropSetter";
    label: string;
    labelTip?: string;
    propName: string;
  } & RockConfigBase;

export type TextRockPropSetter = {
  $type: "textPropSetter";
  label: string;
  labelTip?: string;
  propName: string;
  defaultValue?: string;
} & RockConfigBase;

export type NumberRockPropSetter = {
  $type: "numberPropSetter";
  label: string;
  labelTip?: string;
  propName: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
} & RockConfigBase;

export type NumberWithSliderRockPropSetter = {
  $type: "numberWithSliderPropSetter";
  label: string;
  labelTip?: string;
  propName: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
} & RockConfigBase;

export type NumberWithUnitsRockPropSetter = {
  $type: "numberWithUnitsPropSetter";
  label: string;
  labelTip?: string;
  propName: string;
  defaultValue?: number;
  defaultUnit?: string;
  min?: number;
  max?: number;
  step?: number;
  unitOptions: {
    label: string,
    value: string,
  }[];
} & RockConfigBase;

export type SelectRockPropSetter = {
  $type: "selectPropSetter";
  label: string;
  labelTip?: string;
  propName: string;
  defaultValue?: string;
  options: {
    label: string,
    value: string,
  }[];
  showSearch?: boolean;
} & RockConfigBase;

export type SwitchRockPropSetter = {
  $type: "switchPropSetter";
  label: string;
  labelTip?: string;
  propName: string;
  defaultValue?: boolean;
  checkedValue?: any;
  uncheckedValue?: any;
} & RockConfigBase;

export type SingleControlRockPropSetter = {
  $type: "singleControlPropSetter";
  label: string;
  labelTip?: string;
  propName: string;
  defaultValue?: any;
  control: RockConfig;
  extra?: RockConfig;
} & RockConfigBase;

export type MultiControlsRockPropSetter = {
  $type: "multiControlsPropSetter";
  label: string;
  labelTip?: string;
  expressionPropName?: string;
  controls?: RockPropSetterControl[];
  extra?: RockConfig;
} & RockConfigBase;

export type RockPropSetterControl = {
  propName?: string;
  defaultValue?: any;
  control: RockConfig;
  /**
   * max=2, default=2
   */
  span?: number;
}

export type RockConfig =
 | SimpleRockConfig
 | RockWithSlotsConfig
 | ContainerRockConfig
 | RouterRockConfig;

export type RockCategory =
  | "simple"
  | "withSlots"
  | "container"
  | "composite"
  | "router";

export type RockConfigBase = {
  $id?: string;
  $type: string;
  $version?: string;
  $exps?: RockPropExpressions;
}


export type RuiEvent =
  | RockEvent;

export type RockEvent = {
  page: IPage;
  name: string;
  senderCategory: "component";
  senderId: string;
  args?: any;
}


export type RockEventHandler =
  | RockEventHandlerScript
  | RockEventHandlerPrintToConsole
  | RockEventHandlerNotifyToPage
  | RockEventHandlerSetComponentProperty
  | RockEventHandlerSendHttpRequest;


export type RockEventHandlerScript = {
  $action: "script";
  script: (event?: RockEvent) => void;
}

export type RockEventHandlerPrintToConsole = {
  $action: "printToConsole";
}

export type RockEventHandlerNotifyToPage = {
  $action: "notifyToPage";
  eventName?: string;
}

export type RockEventHandlerSetComponentProperty = {
  $action: "setComponentProperty";
  $exps?: RockPropExpressions;
  componentId: string;
  propName: string;
  propValue: RockPropValue
}

export type RockEventHandlerSendHttpRequest = {
  $action: "sendHttpRequest";
  $exps?: RockPropExpressions;
} & HttpRequest;

export type RockPropExpressions = Record<string, string>;

export type SimpleRockConfig = RockConfigBase & {
  [k: string]:  RockPropValue;
};

export type RockPropValueProducer = () => RockPropValue;

export type RockPropValue =
  | string
  | number
  | boolean
  | RockConfig
  | RockConfig[]
  | RockEventHandler
  | RockEventHandler[]
  | RockPropExpressions
  | Record<string, string | number | boolean | RockConfig | RockConfig[]>
  | RockPropValueProducer
  | any;

export type RockWithSlotsConfig = RockConfigBase & {
  slots: Record<string, RockConfig | RockConfig[]>;
}
& {
  [k: string]: RockPropValue;
}

export type ContainerRockConfig = RockConfigBase
& {
  children: RockConfig | RockConfig[];
}
& {
  [k: string]: RockPropValue;
};

export type RouterRockConfig = RockConfigBase
& {
  routes: RouteConfig[];
}
& {
  [k: string]: RockPropValue;
}

export type RouteConfig = {
  path: string;
  element: RockConfig;
  errorElement?: RockConfig;
}

//////////////
// Page config
//////////////

export type PageConfig = PageWithoutLayoutConfig | PageWithLayoutConfig;

export type PageWithoutLayoutConfig = {
  $id?: string;
  stores?: StoreConfig[];
  view: RockConfig[];
}

export type PageWithLayoutConfig = {
  $id?: string;
  stores?: StoreConfig[];
  layout: string;
  view: RockConfig[];
}

export type PageCommand =
  | PageCommandSetPageConfig
  | PageCommandAddComponent
  | PageCommandRemoveComponents
  | PageCommandSetComponentProperty
  | PageCommandSetComponentPropertyExpression
  | PageCommandRemoveComponentPropertyExpression
  | PageCommandSetSelectedComponents
  | PageCommandCutComponents
  | PageCommandCopyComponents
  | PageCommandPasteComponents
  | PageCommandMoveComponents;


export type PageCommandSetPageConfig = {
  name: "setPageConfig";
  payload: {
    pageConfig: PageConfig;
  };
}

export type PageCommandAddComponent = {
  name: "addComponent";
  payload: {
    componentType: string;
    defaultProps?: any;
    parentComponentId?: string;
    slotName?: string;
    prevSiblingComponentId?: string;
  };
}

export type PageCommandRemoveComponents = {
  name: "removeComponents";
  payload: {
    componentIds: string[];
  };
}

export type PageCommandSetComponentProperty = {
  name: "setComponentProperty";
  payload: {
    componentId: string;
    propName: string;
    propValue: any;
  };
}

export type PageCommandSetComponentPropertyExpression = {
  name: "setComponentPropertyExpression";
  payload: {
    componentId: string;
    propName: string;
    propExpression: string;
  };
}

export type PageCommandRemoveComponentPropertyExpression = {
  name: "removeComponentPropertyExpression";
  payload: {
    componentId: string;
    propName: string;
  };
}

export type PageCommandSetSelectedComponents = {
  name: "setSelectedComponents";
  payload: {
    componentIds: string[];
  };
}

export type PageCommandCutComponents = {
  name: "cutComponents";
  payload: {
    componentIds: string[];
  };
}

export type PageCommandCopyComponents = {
  name: "copyComponents";
  payload: {
    componentIds: string[];
  };
}

export type PageCommandPasteComponents = {
  name: "pasteComponents";
  payload: {
    parentComponentId?: string;
    slotName?: string;
    prevSiblingComponentId?: string;
  };
}

export type PageCommandMoveComponents = {
  name: "moveComponents";
  payload: {
    componentIds: string[];
    parentComponentId?: string;
    slotName?: string;
    prevSiblingComponentId?: string;
  };
}

export interface IPage {
  generateComponentId(type: string);

  setConfig(pageConfig: PageConfig);

  getConfig(): PageConfig;

  addComponents(components: RockConfig[], parentComponentId?: string, slotName?: string, prevSiblingComponentId?: string);

  removeComponents(componentIds: string[]);

  setComponentProperty(componentId: string, propName: string, propValue: RockPropValue);

  getComponentProperty(componentId: string, propName: string);

  setComponentPropertyExpression(componentId: string, propName: string, propExpression: string);

  removeComponentPropertyExpression(componentId: string, propName: string);

  interpreteComponentProperties(parentConfig: RockConfig, config: RockConfig, vars: Record<string, any>);

  getComponent(componentId: string): RockConfig;

  getStore<TStore = IStore<StoreConfigBase>>(storeName: string): TStore;

  loadStoreData(storeName: string, input: HttpRequestInput): Promise<any>;

  notifyEvent(event: RuiEvent);
}