import { Scope } from "~/Scope";
import { HttpRequestOptions, HttpRequestInput } from "./request-types";
import { IStore, StoreConfig, StoreConfigBase } from "./store-types";
import { Framework } from "~/Framework";
import { Page } from "~/Page";
import { RuiRockLogger } from "~/Logger";

export type FieldSettings = {
  valueType: FieldValueType;
  valueNotNull?: boolean;
  description?: string;
  defaultValue?: any;
};

export type FieldValueType = "string" | "number" | "boolean" | "object";

export type RockRenderer<TRockConfig = any, TRockState = any> = (
  context: RockInstanceContext,
  props: TRockConfig,
  state?: TRockState & { scope: Scope },
) => any;

export type ProCodeRock<TRockConfig = any, TRockState = any, TRockMessage extends RockMessage = RockMessage> = {
  Renderer: RockRenderer<TRockConfig, TRockState & { scope: Scope }>;
  onInit?: (context: RockInitContext, props: TRockConfig) => void;
  onResolveState?: (props: TRockConfig, state: TRockState & { scope: Scope }) => any;
  onReceiveMessage?: (message: RockMessageToComponent<TRockMessage>, state: TRockState & { scope: Scope }, props: TRockConfig) => any;
} & ProCodeRockMeta;

export type DeclarativeRock<TRockConfig = any, TRockState = any, TRockMessage extends RockMessage = RockMessage> = {
  view: RockChildrenConfig;
} & DeclarativeRockMeta;

export type Rock<TRockConfig = any, TRockState = any, TRockMessage extends RockMessage = RockMessage> =
  | ProCodeRock<TRockConfig, TRockState, TRockMessage>
  | DeclarativeRock<TRockConfig, TRockState, TRockMessage>;

export type RockMessage<TName = string, TPayload = any> = {
  name: TName;
  payload?: TPayload;
};

export type RockMessageToComponent<TRockMessage extends RockMessage> = TRockMessage & {
  framework: Framework;
  page: IPage;
};

export type RockMetaBase = {
  $type: string;
  $version?: string;
  name?: string;
  description?: string;
  icon?: string;
  thumbnail?: string;
  document?: string;
  Presenter?: (props: any) => any; // TODO: rock type is perhaps better.
  componentRenderer?: any;

  /**
   * Void component has no children
   */
  voidComponent?: boolean;
  props?: RockMetaProps;
  slots?: RockMetaSlots;
  events?: RockMetaEvents;
  commands?: RockMetaCommands;
  dataLoader?: RockDataLoader;
  propertyPanels?: RockPropPanels;
};

export type ProCodeRockMeta = { declarativeComponent?: false } & RockMetaBase;

export type DeclarativeRockMeta = {
  declarativeComponent: true;
  view: RockChildrenConfig;
} & RockMetaBase;

export type RockMeta = ProCodeRockMeta | DeclarativeRockMeta;

export type RockMetaProps<TName extends string = string> = Record<TName, FieldSettings>;

export type RockMetaSlots = Record<string, RockMetaSlot>;

export type RockMetaSlot = {
  name?: string;
  description?: string;
  required?: boolean;
  allowMultiComponents: boolean; // TODO: rename to `onlyChild`
  argumentsToProps?: boolean;
  argumentNames?: string[];
  /**
   * 表示该插槽内接受的是组件适配器
   */
  withAdapter?: boolean;

  /**
   * 适配器的插槽。默认为children。
   */
  adapterSlots?: string[];

  /**
   * 表示需要将插槽内组件包装成 render prop
   */
  toRenderProp?: boolean;

  /**
   * 表示是否延迟创建插槽内组件。默认为`false`。
   *
   */
  lazyCreate?: boolean;

  /**
   * 表示是否在调用Rock.Renderer之前提前创建插槽内组件。默认为`false`。
   */
  earlyCreate?: boolean;
};

export type RockMetaEvents = RockMetaEvent[];

export type RockMetaEvent = {
  name: string;
  label?: string;
  description?: string;
  args?: RockMetaEventArgs;
};

export type RockMetaEventArgs = Record<string, FieldSettings>;

export type RockMetaCommands = RockMetaCommand[];

export type RockMetaCommand = {
  name: string;
  label?: string;
  description?: string;
  args?: RockMetaCommandArgs;
};

export type RockMetaCommandArgs = Record<string, FieldSettings>;

export type RockDataLoader = {};

export type RockPropPanels = RockPropPanel[];

export type RockPropPanel = PredefinedRockPropPanel | ComponentSpecifiedRockPropPanel;

export const PredefinedRockPanelTypes = ["positionPropPanel", "sizePropPanel", "appearancePropPanel", "textPropPanel"] as const;

export type PredefinedRockPropPanel = {
  $type: (typeof PredefinedRockPanelTypes)[number];
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
    label: string;
    value: string;
  }[];
} & RockConfigBase;

export type SelectRockPropSetter = {
  $type: "selectPropSetter";
  label: string;
  labelTip?: string;
  propName: string;
  defaultValue?: string;
  options: {
    label: string;
    value: string;
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
};

export type RockChildrenConfig = RockConfig | RockConfig[] | null;

export type RockConfig = SimpleRockConfig | RockWithSlotsConfig | ContainerRockConfig | RouterRockConfig;

export type RockCategory = "simple" | "withSlots" | "container" | "composite" | "router";

export type RockConfigBase = {
  $id?: string;
  $type: string;
  $version?: string;
  $name?: string;
  $notes?: string;
  $exps?: RockPropExpressions;
  _hidden?: boolean;
};

export type RockConfigSystemFields = keyof RockConfigBase;

export type RuiEvent = RockEvent;

export type RockEvent = {
  framework: Framework;
  page: IPage;
  scope: Scope;
  name: string;
  senderCategory: "component";
  sender: any;
  args?: any[];
};

export type RockPageEventSubscriptionConfig = {
  eventName: string;
  handlers: RockEventHandlerConfig;
};

export type RockEventHandlerConfig = RockEventHandler | RockEventHandler[] | null;

export type RockEventHandler =
  | RockEventHandlerScript
  | RockEventHandlerPrintToConsole
  | RockEventHandlerThrowError
  | RockEventHandlerWait
  | RockEventHandlerHandleEvent
  | RockEventHandlerNotifyEvent
  | RockEventHandlerNotifyToPage
  | RockEventHandlerSetComponentProperty
  | RockEventHandlerSetComponentProperties
  | RockEventHandlerRemoveComponentProperty
  | RockEventHandlerSendHttpRequest
  | RockEventHandlerLoadStoreData
  | RockEventHandlerLoadScopeData
  | RockEventHandlerSetVars
  | RockEventHandlerOther;

export type RockEventHandlerBase = {
  _disabled?: boolean;
};

export type RockEventHandlerScript = RockEventHandlerBase & {
  $action: "script";
  script: string | ((event: RockEvent) => void);
  generator: "editor" | "blockly";
  blockly?: any;
};

export type RockEventHandlerPrintToConsole = RockEventHandlerBase & {
  $action: "printToConsole";
};

export type RockEventHandlerThrowError = RockEventHandlerBase & {
  $action: "throwError";
  name?: string;
  message: string;
  cause?: any;
};

export type RockEventHandlerWait = RockEventHandlerBase & {
  $action: "wait";
  time: number;
};

export type RockEventHandlerHandleEvent = RockEventHandlerBase & {
  $action: "handleEvent";
  eventName?: string;
  scope?: Scope;
  handlers?: RockEventHandlerConfig;
  args?: any;
};

export type RockEventHandlerNotifyEvent = RockEventHandlerBase & {
  $action: "notifyEvent";
  eventName?: string;
  scopeId?: string;
};

export type RockEventHandlerNotifyToPage = RockEventHandlerBase & {
  $action: "notifyToPage";
  eventName?: string;
};

export type RockEventHandlerSetComponentProperty = RockEventHandlerBase & {
  $action: "setComponentProperty";
  $exps?: RockPropExpressions;
  componentId: string;
  propName: string;
  propValue: RockPropValue;
};

export type RockEventHandlerSetComponentProperties = RockEventHandlerBase & {
  $action: "setComponentProperties";
  $exps?: RockPropExpressions;
  componentId: string;
  props: Record<string, RockPropValue>;
};

export type RockEventHandlerRemoveComponentProperty = RockEventHandlerBase & {
  $action: "removeComponentProperty";
  $exps?: RockPropExpressions;
  componentId: string;
  propName: string;
};

export type RockEventHandlerSendComponentMessage<TRockMessage extends RockMessage = RockMessage> = RockEventHandlerBase & {
  $action: "sendComponentMessage";
  $exps?: RockPropExpressions;
  componentId: string;
  message: TRockMessage;
};

export type RockEventHandlerSendHttpRequest = RockEventHandlerBase & {
  $action: "sendHttpRequest";
  $exps?: RockPropExpressions;

  /**
   * 如果设置为true，则请求出错时不抛出异常
   */
  silentOnError?: boolean;
} & Partial<HttpRequestOptions>;

export type RockEventHandlerLoadStoreData = RockEventHandlerBase & {
  $action: "loadStoreData";
  scopeId?: string;
  storeName: string;
  input?: any;
};

export type RockEventHandlerLoadScopeData = RockEventHandlerBase & {
  $action: "loadScopeData";
  scopeId?: string;
};

export type RockEventHandlerSetVars = RockEventHandlerBase & {
  $action: "setVars";
  $exps?: RockPropExpressions;
  scopeId?: string;
  name?: string;
  value?: any;
  vars?: Record<string, any>;
};

export type RockEventHandlerOther = RockEventHandlerBase & {
  $action: string;
  [k: string]: any;
};

export type RockPropExpressions = Record<string, string>;

export type SimpleRockConfig = RockConfigBase & {
  [k: string]: RockPropValue;
};

export type RockPropValueProducer = () => RockPropValue;

export type RockPropValue =
  | string
  | number
  | boolean
  | RockConfig
  | RockConfig[]
  | RockEventHandlerConfig
  | RockPropExpressions
  | Record<string, string | number | boolean | RockConfig | RockConfig[]>
  | RockPropValueProducer
  | any;

export type RockWithSlotsConfig = RockConfigBase & {
  slots: Record<string, RockConfig | RockConfig[]>;
} & {
  [k: string]: RockPropValue;
};

export type ContainerRockConfig = RockConfigBase & {
  children?: RockChildrenConfig;
} & {
  [k: string]: RockPropValue;
};

export type RouterRockConfig = RockConfigBase & {
  routes: RouteConfig[];
} & {
  [k: string]: RockPropValue;
};

export type RouteConfig = {
  path: string;
  element: RockConfig;
  errorElement?: RockConfig;
};

export type RockInstanceContext = {
  framework: Framework;
  page: Page;
  /**
   * Host component of the rock instance.
   */
  component?: RockInstance;
  scope: Scope;
  logger: RuiRockLogger;
};

export type RockInstanceOriginal<TState = any> = {
  _initialized: boolean;
  _state: TState;
};
export type RockInstanceFields = keyof RockInstanceOriginal;

export type RockInstance<TState = any> = RockConfig & RockInstanceOriginal;

//////////////
// Page config
//////////////

export type PageConfig = {
  $id?: string;
  initialVars?: Record<string, any>;
  stores?: StoreConfig[];
  layout?: PageConfig;
  view: RockConfig[];
  eventSubscriptions?: RockPageEventSubscriptionConfig[];
};

export type PageCommand =
  | PageCommandSetPageConfig
  | PageCommandAddComponent
  | PageCommandRemoveComponents
  | PageCommandSetComponentProperty
  | PageCommandSetComponentProperties
  | PageCommandRemoveComponentProperty
  | PageCommandSetComponentPropertyExpression
  | PageCommandRemoveComponentPropertyExpression
  | PageCommandSetSelectedComponents
  | PageCommandCutComponents
  | PageCommandCopyComponents
  | PageCommandPasteComponents
  | PageCommandMoveComponents
  | PageCommandAddStores
  | PageCommandAddStore
  | PageCommandModifyStore
  | PageCommandRemoveStore
  | PageCommandAddStep
  | PageCommandModifyStep
  | PageCommandRemoveStep;

export type PageCommandSetPageConfig = {
  name: "setPageConfig";
  payload: {
    pageConfig: PageConfig;
  };
};

export type PageCommandAddComponent = {
  name: "addComponent";
  payload: {
    componentType: string;
    defaultProps?: any;
    parentComponentId?: string;
    slotPropName?: string;
    prevSiblingComponentId?: string;
  };
};

export type PageCommandRemoveComponents = {
  name: "removeComponents";
  payload: {
    componentIds: string[];
  };
};

export type PageCommandSetComponentProperty = {
  name: "setComponentProperty";
  payload: {
    componentId: string;
    propName: string;
    propValue: any;
  };
};

export type PageCommandSetComponentProperties = {
  name: "setComponentProperties";
  payload: {
    componentId: string;
    props: Record<string, any>;
  };
};

export type PageCommandRemoveComponentProperty = {
  name: "removeComponentProperty";
  payload: {
    componentId: string;
    propName: string;
  };
};

export type PageCommandSetComponentPropertyExpression = {
  name: "setComponentPropertyExpression";
  payload: {
    componentId: string;
    propName: string;
    propExpression: string;
  };
};

export type PageCommandRemoveComponentPropertyExpression = {
  name: "removeComponentPropertyExpression";
  payload: {
    componentId: string;
    propName: string;
  };
};

export type PageCommandSetSelectedComponents = {
  name: "setSelectedComponents";
  payload: {
    componentIds: string[];
  };
};

export type PageCommandCutComponents = {
  name: "cutComponents";
  payload: {
    componentIds: string[];
  };
};

export type PageCommandCopyComponents = {
  name: "copyComponents";
  payload: {
    componentIds: string[];
  };
};

export type PageCommandPasteComponents = {
  name: "pasteComponents";
  payload: {
    parentComponentId?: string;
    slotPropName?: string;
    prevSiblingComponentId?: string;
  };
};

export type PageCommandMoveComponents = {
  name: "moveComponents";
  payload: {
    componentIds: string[];
    parentComponentId?: string;
    slotPropName?: string;
    prevSiblingComponentId?: string;
  };
};

export type PageCommandAddStores = {
  name: "addStores";
  payload: {
    stores: StoreConfig[];
  };
};

export type PageCommandAddStore = {
  name: "addStore";
  payload: {
    store: StoreConfig;
  };
};

export type PageCommandModifyStore = {
  name: "modifyStore";
  payload: {
    store: StoreConfig;
  };
};

export type PageCommandRemoveStore = {
  name: "removeStore";
  payload: {
    store: StoreConfig;
  };
};

export type PageCommandAddStep = {
  name: "addStep";
  payload: {
    step: Record<string, any>;
  };
};

export type PageCommandModifyStep = {
  name: "modifyStep";
  payload: {
    step: Record<string, any>;
  };
};

export type PageCommandRemoveStep = {
  name: "removeStep";
  payload: {
    step: Record<string, any>;
  };
};

export interface IPage {
  generateComponentId(type: string);

  setConfig(pageConfig: PageConfig);

  getConfig(): PageConfig;

  addComponents(components: RockConfig[], parentComponentId?: string, slotPropName?: string, prevSiblingComponentId?: string);

  removeComponents(componentIds: string[]);

  setComponentProperty(componentId: string, propName: string, propValue: RockPropValue);

  setComponentProperties(componentId: string, props: Record<string, RockPropValue>);

  removeComponentProperty(componentId: string, propName: string);

  getComponentProperty(componentId: string, propName: string);

  setComponentPropertyExpression(componentId: string, propName: string, propExpression: string);

  removeComponentPropertyExpression(componentId: string, propName: string);

  interpreteComponentProperties(parentConfig: RockConfig, config: RockConfig, vars: Record<string, any>);

  getComponent(componentId: string): RockConfig;

  getStore<TStore = IStore<StoreConfigBase>>(storeName: string): TStore;

  addStore(storeConfig: StoreConfig);

  loadStoreData(storeName: string, input: HttpRequestInput): Promise<any>;

  notifyEvent(event: RuiEvent);

  sendComponentMessage<TRockMessage extends RockMessage<any> = RockMessage<any>>(componentId: string, message: TRockMessage);
}

//////////////
// Scope config
//////////////

export interface ScopeConfig {
  $id: string;
  stores?: StoreConfig[];
  initialVars?: Record<string, any>;
  eventSubscriptions?: RockPageEventSubscriptionConfig[];
}

export interface ScopeState {
  stores: Record<string, IStore>;
  vars: Record<string, any>;
  version: number;
}

export interface IScope {
  setConfig(config: ScopeConfig);

  getConfig(): ScopeConfig;

  setVars(vars: Record<string, any>);

  get vars(): Record<string, any>;

  get stores(): Record<string, IStore>;

  addStore(storeConfig: StoreConfig);
}

export type RockInitContext = {
  page: IPage;

  scope: IScope;
};

export type FunctionMeta = {
  name: string;
  func: Function;
};

export type EventActionHandler<TEventActionConfig> = (
  eventName: string,
  framework: Framework,
  page: IPage,
  scope: IScope,
  sender: any,
  eventHandler: TEventActionConfig,
  eventArgs: any,
) => any;

export type EventAction<TEventActionConfig extends { $action: string }> = {
  name: TEventActionConfig["$action"];
  handler: EventActionHandler<TEventActionConfig>;
};
