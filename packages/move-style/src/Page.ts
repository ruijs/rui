import _ from "lodash";
import { ConfigProcessor } from "./ConfigProcessor";
import { ExpressionInterpreter } from "./ExpressionInterpreter";
import { RockConfig, RockPropValue, RuiEvent, PageCommand, PageConfig, IPage } from "./types/rock-types";
import { StoreConfig, IStore, StoreConfigBase } from "./types/store-types";
import { HttpRequestInput } from "./types/request-types";
import { Framework } from "./Framework";

export class Page implements IPage {
  #framework: Framework;
  #readyToRender: boolean;
  #stores: Record<string, IStore>;
  #interpreter: ExpressionInterpreter;
  #configProcessor: ConfigProcessor;

  constructor(framework: Framework, pageConfig?: PageConfig) {
    this.#framework = framework;
    this.#interpreter = new ExpressionInterpreter();
    this.#configProcessor = new ConfigProcessor(framework, this, this.#interpreter);

    if (pageConfig) {
      this.setConfig(pageConfig);
    }

    globalThis.$page = this;
  }

  
  get readyToRender() : boolean {
    return this.#readyToRender;
  }

  generateComponentId(type: string) {
    return this.#configProcessor.generateComponentId(type);
  }

  setConfig(pageConfig: PageConfig) {
    console.debug(`[RUI][Page][${pageConfig.$id}] Page.setConfig()`)
    console.debug("Page.setConfig", pageConfig);
    if (!pageConfig.$id) {
      // TODO: should generate an unique id.
      pageConfig.$id = "default";
    }

    this.#framework.setPage(pageConfig.$id, this);

    this.#stores = {};
    if (pageConfig.stores) {
      pageConfig.stores.forEach((storeConfig: StoreConfig) => {
        let store = this.#stores[storeConfig.name];
        if (!store) {
          store = this.#framework.createStore(storeConfig);
          store.observe(() => {
            this.#configProcessor.reload();
          });
          this.#stores[storeConfig.name] = store;
        }
      });
    }

    this.#interpreter.setStores(this.#stores);
    this.#configProcessor.loadConfig(pageConfig);
    console.debug(`[RUI][Page][${pageConfig.$id}] pageConfig loaded.`)

    // this.loadData();
    // Ready to render, even the data of stores may still not loaded.
    this.#readyToRender = true;
  }

  getConfig() {
    return this.#configProcessor.getConfig();
  }

  async loadData() {
    console.debug(`[RUI][Page][${this.getConfig().$id}] Page.loadData()`)
    for (const storeName in this.#stores) {
      const store = this.#stores[storeName];
      store.loadData();
    }
  }

  observe(callback: (config: PageConfig) => void) {
    this.#configProcessor.observe(callback);
  }

  unsubscribe() {
    // TODO: implement this.
  }

  interpreteExpression(expressionString: string, rootVars: Record<string, any>) {
    return this.#interpreter.interprete(expressionString, rootVars);
  }

  addComponents(components: RockConfig[], parentComponentId?: string, slotName?: string, prevSiblingComponentId?: string) {
    this.#configProcessor.addComponents(components, parentComponentId, slotName, prevSiblingComponentId);
  }

  removeComponents(componentIds: string[]) {
    this.#configProcessor.removeComponents(componentIds);
  }

  setComponentProperty(componentId: string, propName: string, propValue: RockPropValue) {
    console.debug("Page.setComponentProperty", {
      pageId: this.getConfig().$id,
      componentId,
      propName,
      propValue,
    });
    this.#configProcessor.setComponentProperty(componentId, propName, propValue);
  }

  getComponentProperty(componentId: string, propName: string) {
    return this.#configProcessor.getComponentProperty(componentId, propName);
  }

  setComponentPropertyExpression(componentId: string, propName: string, propExpression: string) {
    console.debug("Page.setComponentPropertyExpression", {
      pageId: this.getConfig().$id,
      componentId,
      propName,
      propExpression,
    });
    this.#configProcessor.setComponentPropertyExpression(componentId, propName, propExpression);
  }

  removeComponentPropertyExpression(componentId: string, propName: string) {
    this.#configProcessor.removeComponentPropertyExpression(componentId, propName);
  }

  interpreteComponentProperties(parentConfig: RockConfig, config: RockConfig, vars: Record<string, any>) {
    this.#configProcessor.interpreteConfigExpressions(parentConfig, config, vars);
  }

  getComponent(componentId: string) {
    return this.#configProcessor.getComponent(componentId);
  }

  getStore<TStore = IStore<StoreConfigBase>>(storeName: string): TStore {
    return _.find(this.#stores, (item) => item.name === storeName) as TStore;
  }

  loadStoreData(storeName: string, input: HttpRequestInput) {
    const store = _.find(this.#stores, (item) => item.name === storeName);
    if (!store) {
      throw new Error(`Store '${storeName}' not found.`);
    }

    return store.loadData(input);
  }

  notifyEvent(event: RuiEvent) {
  }
}