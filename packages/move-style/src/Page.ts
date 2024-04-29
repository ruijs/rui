import _, { each } from 'lodash';
import { ComponentTreeManager } from './ComponentTreeManager';
import { ExpressionInterpreter } from './ExpressionInterpreter';
import { RockConfig, RockPropValue, RuiEvent, PageCommand, PageConfig, IPage, RockPageEventSubscriptionConfig, RockMessage } from './types/rock-types';
import { StoreConfig, IStore, StoreConfigBase } from './types/store-types';
import { HttpRequestInput } from './types/request-types';
import { Framework } from './Framework';
import { Scope } from './Scope';
import { RuiModuleLogger } from './Logger';

export class Page implements IPage {
  #framework: Framework;
  #logger: RuiModuleLogger;
  #readyToRender: boolean;
  #interpreter: ExpressionInterpreter;
  #componentTreeManager: ComponentTreeManager;
  #pageScope: Scope;

  constructor(framework: Framework, pageConfig?: PageConfig) {
    this.#logger = framework.getLogger('page');

    if (!pageConfig) {
      pageConfig = {
        $id: 'default',
        view: [],
      };
    }

    this.#logger.debug(`Consturcting Page object, page.$id='${pageConfig.$id}'`);
    this.#framework = framework;
    this.#interpreter = new ExpressionInterpreter();
    this.#componentTreeManager = new ComponentTreeManager(framework, this, this.#interpreter);

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
      pageConfig.$id = 'default';
    }

    this.#framework.setPage(pageConfig.$id, this);

    this.#pageScope = new Scope(this.#framework, this, {
      $id: `${pageConfig.$id}-scope`,
      stores: pageConfig.stores,
      initialVars: pageConfig.initialVars || {},
    });
    this.#pageScope.observe(() => {
      this.#componentTreeManager.reload();
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

  get storeConfigs() {
    return this.#pageScope.config?.stores || [];
  }

  loadData() {
    this.#logger.debug(`Loading page data...`);
    return this.#pageScope.loadData();
  }

  observe(callback: (config: PageConfig) => void) {
    this.#componentTreeManager.observe(callback);
  }

  unsubscribe() {
    // TODO: implement this.
  }

  interpreteExpression(expressionString: string, rootVars: Record<string, any>) {
    rootVars.$page = this;
    rootVars.$functions = this.#framework.getFunctions();

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

  loadStoreData(storeName: string, input: HttpRequestInput) {
    return this.#pageScope.loadStoreData(storeName, input);
  }

  async notifyEvent(event: RuiEvent) {
    this.scope.notifyEvent(event);
  }
}
