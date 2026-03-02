import { ComponentTreeManager } from "./ComponentTreeManager";
import { ExpressionInterpreter } from "./ExpressionInterpreter";
import { RockConfig, RockPropValue, RuiEvent, PageConfig, IPage, RockMessage, HandleRockEventOptions } from "./types/rock-types";
import { StoreConfig, IStore, StoreConfigBase } from "./types/store-types";
import { HttpRequestInput } from "./types/request-types";
import { Framework } from "./Framework";
import { Scope } from "./Scope";
import { RuiModuleLogger } from "./Logger";
import { fireEvent } from "./ComponentEventHandler";
import { EventEmitter } from "./EventEmitter";
import { isString } from "lodash";

export class Page implements IPage {
  #framework: Framework;
  #logger: RuiModuleLogger;
  #readyToRender: boolean;
  #interpreter: ExpressionInterpreter;
  #emitter: EventEmitter;
  #componentTreeManager: ComponentTreeManager;
  #pageScope: Scope;
  #functions: Record<string, Function>;

  constructor(framework: Framework, pageConfig?: PageConfig) {
    this.#logger = framework.getLogger("page");

    if (!pageConfig) {
      pageConfig = {
        $id: "default",
        view: [],
      };
    }

    this.#logger.debug(`Consturcting Page object, page.$id='${pageConfig.$id}'`);
    this.#framework = framework;
    this.#interpreter = new ExpressionInterpreter(framework.getLogger("expressionInterpreter"));
    this.#emitter = new EventEmitter();
    this.#componentTreeManager = new ComponentTreeManager(framework, this, this.#interpreter);
    this.#componentTreeManager.observe(() => {
      this.#emitter.emit("change", this.#componentTreeManager.getConfig());
    });

    if (pageConfig) {
      this.setConfig(pageConfig);
    }

    globalThis.$page = this;
  }

  get readyToRender(): boolean {
    return this.#readyToRender;
  }

  generateComponentId(type: string) {
    return this.#componentTreeManager.generateComponentId(type);
  }

  setConfig(pageConfig: PageConfig) {
    this.#logger.debug(`Setting page config...`);
    if (!pageConfig.$id) {
      // TODO: should generate an unique id.
      pageConfig.$id = "default";
    }

    this.#framework.setPage(pageConfig.$id, this);

    this.#functions = {};
    const functions = pageConfig.functions;
    if (functions) {
      for (const functionConfig of functions) {
        let func: Function;
        if (isString(functionConfig.func)) {
          func = this.#interpreter.interprete(functionConfig.func, {});
        } else {
          func = functionConfig.func;
        }

        this.#functions[functionConfig.name] = func;
      }
    }

    this.#pageScope = new Scope(this.#framework, this, {
      $id: `${pageConfig.$id}-scope`,
      stores: pageConfig.stores,
      initialVars: pageConfig.initialVars || {},
    });
    this.#pageScope.observe(() => {
      this.#emitter.emit("change", this.#componentTreeManager.getConfig());
    });

    this.#interpreter.setStores(this.#pageScope.stores);
    this.#componentTreeManager.loadConfig(pageConfig);
    this.#componentTreeManager.initComponents();

    // this.loadData();
    // Ready to render, even the data of stores may still not loaded.
    this.#readyToRender = true;
  }

  getConfig() {
    return this.#componentTreeManager.getConfig();
  }

  getSerializableConfig() {
    return this.#componentTreeManager.getSerializableConfig();
  }

  get scope() {
    return this.#pageScope;
  }

  addStore(storeConfig: StoreConfig) {
    this.#pageScope.addStore(storeConfig);
  }

  updateStore(storeConfig: StoreConfig) {
    this.#pageScope.updateStore(storeConfig);
  }

  removeStore(storeConfig: StoreConfig) {
    this.#pageScope.removeStore(storeConfig);
  }

  loadData() {
    this.#logger.debug(`Loading page data...`);
    return this.#pageScope.loadData();
  }

  setScopeVars(scopeId: string | null, vars: Record<string, any>, silent: boolean = false) {
    let scope = this.#pageScope;
    if (scopeId) {
      scope = this.getScope(scopeId);
    }

    if (!scope) {
      throw new Error(`Scope with id "${scopeId}" was not found.`);
    }

    scope.setVars(vars, silent);
  }

  observe(callback: (config: PageConfig) => void) {
    this.#emitter.on("change", callback);
  }

  unsubscribe() {
    // TODO: implement this.
  }

  getFunctions(): Record<string, Function> {
    return this.#functions;
  }

  interpreteExpression(expressionString: string, rootVars: Record<string, any>) {
    rootVars.$page = this;
    rootVars.$functions = {
      ...this.#framework.getFunctions(),
      ...this.#functions,
    };

    const vars = Object.assign({}, this.#framework.getExpressionVars(), rootVars);
    return this.#interpreter.interprete(expressionString, vars);
  }

  addComponents(components: RockConfig[], parentComponentId?: string, slotPropName?: string, prevSiblingComponentId?: string) {
    this.#componentTreeManager.addComponents(components, parentComponentId, slotPropName, prevSiblingComponentId);
  }

  removeComponents(componentIds: string[]) {
    this.#componentTreeManager.removeComponents(componentIds);
  }

  setComponentProperty(componentId: string, propName: string, propValue: RockPropValue) {
    this.#componentTreeManager.setComponentProperty(componentId, propName, propValue);
  }

  setComponentProperties(componentId: string, props: Record<string, RockPropValue>) {
    this.#componentTreeManager.setComponentProperties(componentId, props);
  }

  removeComponentProperty(componentId: string, propName: string) {
    this.#componentTreeManager.removeComponentProperty(componentId, propName);
  }

  getComponentProperty(componentId: string, propName: string) {
    return this.#componentTreeManager.getComponentProperty(componentId, propName);
  }

  setComponentPropertyExpression(componentId: string, propName: string, propExpression: string) {
    this.#componentTreeManager.setComponentPropertyExpression(componentId, propName, propExpression);
  }

  removeComponentPropertyExpression(componentId: string, propName: string) {
    this.#componentTreeManager.removeComponentPropertyExpression(componentId, propName);
  }

  interpreteComponentProperties(parentConfig: RockConfig, config: RockConfig, vars: Record<string, any>) {
    this.#componentTreeManager.interpreteConfigExpressions(parentConfig, config, vars);
  }

  getComponent(componentId: string) {
    return this.#componentTreeManager.getComponent(componentId);
  }

  attachComponent(scope: Scope, parentConfig: RockConfig, config: RockConfig) {
    return this.#componentTreeManager.attachComponent(scope, parentConfig, config);
  }

  sendComponentMessage<TRockMessage extends RockMessage<any> = RockMessage<any>>(componentId: string, message: TRockMessage) {
    this.#componentTreeManager.sendComponentMessage(componentId, message);
  }

  getScope(scopeId: string) {
    return this.#componentTreeManager.getScope(scopeId);
  }

  getStore<TStore = IStore<StoreConfigBase>>(storeName: string): TStore {
    return this.#pageScope.getStore(storeName);
  }

  setStorePropertyExpression(storeName: string, propName: string, propExpression: string) {
    const store = this.getStore(storeName);
    if (store) {
      store.setPropertyExpression(propName, propExpression);
    }
  }

  loadStoreData(storeName: string, input?: HttpRequestInput) {
    return this.#pageScope.loadStoreData(storeName, input);
  }

  async notifyEvent(event: RuiEvent) {
    this.scope.notifyEvent(event);
  }

  async handleEvent(options: HandleRockEventOptions) {
    const { eventName, context, parentEvent, sender, handlers, args } = options;
    if (!context && !parentEvent) {
      throw new Error(`"context" or "parentEvent" must be provided.`);
    }

    let { framework, page, scope } = context || parentEvent;
    await fireEvent({
      eventName,
      framework,
      page,
      scope,
      sender: sender || {},
      eventHandlers: handlers,
      eventArgs: args || [],
    });
  }
}
