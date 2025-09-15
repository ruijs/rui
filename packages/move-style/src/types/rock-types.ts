import { Scope } from "~/Scope";
import { HttpRequestOptions, HttpRequestInput } from "./request-types";
import { IStore, StoreConfig, StoreConfigBase } from "./store-types";
import { Framework } from "~/Framework";
import { Page } from "~/Page";
import { RuiRockLogger } from "~/Logger";
import { GetStringResourceConfig, Lingual } from "./locale-types";

export type FieldSettings = {
  valueType: FieldValueType;
  valueNotNull?: boolean;
  description?: string;
  defaultValue?: any;
  /**
   * 当属性值发生变化时，需要触发的事件名
   */
  onChangeEventName?: string;
};

export type FieldValueType = "string" | "number" | "boolean" | "object";

export type RockRenderer<TRockConfig = any, TRockState = any> = (
  context: RockInstanceContext,
  props: TRockConfig,
  state?: TRockState & { scope: Scope },
  instance?: RockInstance,
) => any;

export type ProCodeRock<TRockConfig = any, TRockState = any, TRockMessage extends RockMessage = RockMessage> = {
  Renderer: RockRenderer<TRockConfig, TRockState>;
  onInit?: (context: RockInitContext, props: TRockConfig) => void;
  onResolveState?: (props: TRockConfig, state: TRockState, instance: RockInstance) => any;
  onReceiveMessage?: (message: RockMessageToComponent<TRockMessage>, state: TRockState, props: TRockConfig, instance: RockInstance) => any;
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

export const PredefinedRockPanelTypes = ["positionPropPanel", "sizePropPanel", "appearancePropPanel", "textPropPanel", "borderPropPanel"] as const;

export type PredefinedRockPropPanel = {
  $type: (typeof PredefinedRockPanelTypes)[number];
  title?: string;
};

export type ComponentSpecifiedRockPropPanel = {
  $type: "componentPropPanel";
  title?: string;
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
  | SingleControlMultiPropsSetter
  | MultiControlsRockPropSetter
  | MultiControlsMultiPropsSetter;

export type RockPropSetterBase<TSetterType extends string, TPropValue = any> = {
  $type: TSetterType;
  label: string;
  labelTip?: string;
  defaultValue?: TPropValue;
  dynamicForbidden?: boolean;
  readOnly?: boolean;
};

export interface RockSinglePropSetterBase<TSetterType extends string, TPropValue = any> extends RockPropSetterBase<TSetterType, TPropValue> {
  multiProps?: false;
  propName: string;
}

export interface RockMultiPropsSetterBase<TSetterType extends string, TPropValue = any> extends RockPropSetterBase<TSetterType, TPropValue> {
  multiProps: true;
  propNames: string[];
}

export interface PropSetterRockConfigBase extends Omit<RockConfigBase, "$type"> {
  componentConfig: RockConfig;
  onPropValueChange?: RockEventHandlerConfig;
  onPropExpressionChange?: RockEventHandlerConfig;
  onPropExpressionRemove?: RockEventHandlerConfig;
  onSettingPropExpression?: RockEventHandlerConfig;
}

export interface ExpressionRockPropSetter extends RockSinglePropSetterBase<"expressionPropSetter", any> {}

export interface TextRockPropSetter extends RockSinglePropSetterBase<"textPropSetter", string> {}

export interface NumberRockPropSetter extends RockSinglePropSetterBase<"numberPropSetter", number> {
  min?: number;
  max?: number;
  step?: number;
}

export interface NumberWithSliderRockPropSetter extends RockSinglePropSetterBase<"numberWithSliderPropSetter", number> {
  min?: number;
  max?: number;
  step?: number;
}

export interface NumberWithUnitsRockPropSetter extends RockSinglePropSetterBase<"numberWithUnitsPropSetter", number> {
  defaultUnit?: string;
  min?: number;
  max?: number;
  step?: number;
  unitOptions: {
    label: string;
    value: string;
  }[];
}

export interface SelectRockPropSetter extends RockSinglePropSetterBase<"selectPropSetter", string> {
  options: {
    label: string;
    value: string;
  }[];
  showSearch?: boolean;
  allowClear?: boolean;
}

export interface SwitchRockPropSetter extends RockSinglePropSetterBase<"switchPropSetter", boolean> {
  checkedValue?: any;
  uncheckedValue?: any;
}

export interface SingleControlRockPropSetter<TPropValue = any> extends RockSinglePropSetterBase<"singleControlPropSetter", TPropValue> {
  control: RockConfig;
  extra?: RockConfig;
}

export interface SingleControlMultiPropsSetter<TPropValue = any> extends RockMultiPropsSetterBase<"singleControlMultiPropsSetter", TPropValue> {
  control: RockConfig;
  extra?: RockConfig;
}

export interface MultiControlsRockPropSetter<TPropValue = any> extends RockSinglePropSetterBase<"multiControlsPropSetter", TPropValue> {
  controls?: RockPropSetterControl[];
  extra?: RockConfig;
}

export interface MultiControlsMultiPropsSetter<TPropValue = any> extends RockMultiPropsSetterBase<"multiControlsMultiPropsSetter", TPropValue> {
  controls?: RockPropSetterControl[];
  extra?: RockConfig;
}

export type RockPropSetterControl<TValue = any> = {
  propName?: string;
  defaultValue?: TValue;
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

  /**
   * 描述
   */
  $description?: string;
  $exps?: RockExpsConfig;
  $i18n?: RockI18nConfig;
  $locales?: RockLocalesConfig;
  _hidden?: boolean;
};

export type RockConfigSystemFields = keyof RockConfigBase;

export type RuiEvent = RockEvent;

export type RockEvent = {
  framework: Framework;
  page: IPage;
  scope: IScope;
  name: string;
  senderCategory?: "component" | "store" | "actionHandler" | "other";
  sender: any;
  args: any[];
  parent?: RockEvent;
};

export type RockEventSender = RockInstance;

export interface HandleRockEventContext {
  framework: Framework;
  page: IPage;
  scope: IScope;
}

export interface HandleRockEventOptions {
  context?: HandleRockEventContext;
  parentEvent?: RockEvent;
  eventName?: string;
  sender?: RockEventSender;
  handlers: RockEventHandlerConfig;
  args?: any[];
}

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
  $exps?: RockExpsConfig;
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
  args?: any;
};

export type RockEventHandlerNotifyToPage = RockEventHandlerBase & {
  $action: "notifyToPage";
  eventName?: string;
};

export type RockEventHandlerSetComponentProperty = RockEventHandlerBase & {
  $action: "setComponentProperty";
  $exps?: RockExpsConfig;
  componentId: string;
  propName: string;
  propValue: RockPropValue;
};

export type RockEventHandlerSetComponentProperties = RockEventHandlerBase & {
  $action: "setComponentProperties";
  $exps?: RockExpsConfig;
  componentId: string;
  props: Record<string, RockPropValue>;
};

export type RockEventHandlerRemoveComponentProperty = RockEventHandlerBase & {
  $action: "removeComponentProperty";
  $exps?: RockExpsConfig;
  componentId: string;
  propName: string;
};

export type RockEventHandlerSendComponentMessage<TRockMessage extends RockMessage = RockMessage> = RockEventHandlerBase & {
  $action: "sendComponentMessage";
  $exps?: RockExpsConfig;
  componentId: string;
  message: TRockMessage;
};

export type RockEventHandlerSendHttpRequest = RockEventHandlerBase & {
  $action: "sendHttpRequest";
  $exps?: RockExpsConfig;

  /**
   * 如果设置为true，则请求出错时不抛出异常
   */
  silentOnError?: boolean;
} & Partial<HttpRequestOptions>;

export type RockEventHandlerLoadStoreData = RockEventHandlerBase & {
  $action: "loadStoreData";
  scopeId?: string;
  rootScope?: boolean;
  storeName: string;
  input?: any;
};

export type RockEventHandlerLoadScopeData = RockEventHandlerBase & {
  $action: "loadScopeData";
  scopeId?: string;
};

export type RockEventHandlerSetVars = RockEventHandlerBase & {
  $action: "setVars";
  $exps?: RockExpsConfig;
  scopeId?: string;
  rootScope?: boolean;
  name?: string;
  value?: any;
  vars?: Record<string, any>;
};

export type RockEventHandlerOther = RockEventHandlerBase & {
  $action: string;
  [k: string]: any;
};

/**
 * @deprecated
 * use RockExpsConfig
 */
// TODO: remove this. use RockExpsConfig
export type RockPropExpressions = Record<string, string>;

export type RockExpsConfig = RockPropExpressions;

export type RockI18nConfig = Record<string, GetStringResourceConfig>;

export type RockLocalesConfig = Record<string, Record<Lingual, string>>;

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
  | RockExpsConfig
  | RockI18nConfig
  | RockLocalesConfig
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

export type RockStateUpdater = (state: Record<string, any>) => Record<string, any>;

export type RockInstanceOriginal<TState = any> = {
  _context: RockInstanceContext;
  _scope: Scope;
  _initialized: boolean;
  _state: TState;
  setState: (stateChangesOrUpdater: Record<string, any> | RockStateUpdater) => void;
};
export type RockInstanceFields = keyof RockInstanceOriginal;

export type RockInstance<
  TRockConfig extends RockConfigBase = RockConfigBase,
  TState = Record<string, any>,
  TMethods extends Record<string, any> = {},
> = TRockConfig & RockInstanceOriginal<TState> & TMethods;

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
  functions?: FunctionConfig[];
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
  | PageCommandUpdateStore
  | PageCommandRemoveStore
  | PageCommandAddStep
  | PageCommandModifyStep
  | PageCommandRemoveStep
  | PageCommandSetScopeVars;

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

/**
 * @deprecated
 */
export type PageCommandModifyStore = {
  name: "modifyStore";
  payload: {
    store: StoreConfig;
  };
};

export type PageCommandUpdateStore = {
  name: "updateStore";
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

/**
 * @deprecated
 */
export type PageCommandAddStep = {
  name: "addStep";
  payload: {
    step: Record<string, any>;
  };
};

/**
 * @deprecated
 */
export type PageCommandModifyStep = {
  name: "modifyStep";
  payload: {
    step: Record<string, any>;
  };
};

/**
 * @deprecated
 */
export type PageCommandRemoveStep = {
  name: "removeStep";
  payload: {
    step: Record<string, any>;
  };
};

export type PageCommandSetScopeVars = {
  name: "setScopeVars";
  payload: {
    scopeId?: string;
    vars: Record<string, any>;
    silent?: boolean;
  };
};

export interface IPage {
  get scope(): IScope;

  generateComponentId(type: string);

  setConfig(pageConfig: PageConfig);

  getConfig(): PageConfig;

  interpreteExpression(expressionString: string, rootVars: Record<string, any>): any;

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

  loadStoreData(storeName: string, input?: HttpRequestInput): Promise<any>;

  notifyEvent(event: RuiEvent);

  sendComponentMessage<TRockMessage extends RockMessage<any> = RockMessage<any>>(componentId: string, message: TRockMessage);

  /**
   * 处理事件
   * @param options
   * @example
   * ```
   *  page.handleEvent({
   *    parentEvent: event,
   *    handlers: [
   *      {
   *        $action: "setComponentProperty",
   *        componentId: "text1",
   *        propName: "text",
   *        propValue: "hello"
   *      }
   *    ]
   *  })
   * ```
   */
  handleEvent(options: HandleRockEventOptions): Promise<void>;
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

  getStore<TStore = IStore<StoreConfigBase>>(storeName: string): TStore;

  removeStore(storeConfig: StoreConfig);

  updateStore(storeConfig: StoreConfig);

  loadData(): Promise<void>;

  loadStoreData(storeName: string, input?: HttpRequestInput): Promise<void>;

  notifyEvent(event: RuiEvent): Promise<void>;
}

export type RockInitContext = {
  framework: Framework;
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

export type FunctionConfig = {
  name: string;
  func: string | Function;
};
