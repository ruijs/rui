import { each } from "lodash";
import { Page } from "./Page";
import { Scope } from "./Scope";
import { ConstantStore } from "./stores/ConstantStore";
import { HttpRequestStore } from "./stores/HttpRequestStore";
import StoreFactory from "./stores/StoreFactory";
import { RuiExtension } from "./types/extension-types";
import { Rock } from "./types/rock-types";
import { IStore, StoreConfig } from "./types/store-types";
import ruiExp from "./utils/rui-exp";
import { wrapRenderer } from "./ComponentRenderer";

export class Framework {
  #storeFactory: StoreFactory;
  #components: Map<string, Rock>;
  #functions: Record<string, Function>;
  #eventActionHandlers: Map<string, Function>;
  #expVars: Record<string, any>;
  #pages: Map<string, Page>;
  constructor() {
    this.#storeFactory = new StoreFactory();
    this.#storeFactory.registerStoreConstructor("constant", ConstantStore);
    this.#storeFactory.registerStoreConstructor("httpRequest", HttpRequestStore);

    this.#components = new Map();
    this.#eventActionHandlers = new Map();
    this.#functions = {};
    this.#expVars = {};
    this.#pages = new Map();

    this.registerExpressionVar("$rui", ruiExp);

    globalThis.$framework = this;
  }

  registerComponent(component: Rock) {
    // TODO: should respect component.version
    const key = `${component.$type}`;
    wrapRenderer(component);
    this.#components.set(key, component);
  }

  public getComponent(type: string) {
    const component = this.#components.get(type);
    return component;
  }

  getComponents() : Map<string, Rock> {
    return this.#components;
  }

  registerStore(type: string, constructor: any) {
    this.#storeFactory.registerStoreConstructor(type, constructor);
  }

  createStore(page: Page, scope: Scope, storeConfig: StoreConfig): IStore {
    return this.#storeFactory.createStore(this, page, scope, storeConfig);
  }

  registerEventActionHandler(actionName: string, handler: Function) {
    this.#eventActionHandlers.set(actionName, handler);
  }

  getEventActionHandler(actionName: string): Function {
    return this.#eventActionHandlers.get(actionName);
  }

  registerFunction(name: string, func: Function) {
    this.#functions[name] = func;
  }

  getFunctions() : Record<string, Function> {
    return this.#functions;
  }

  registerExpressionVar(name: string, value: any) {
    this.#expVars[name] = value;
  }

  getExpressionVars() : Record<string, any> {
    return this.#expVars;
  }

  loadExtension(extension: RuiExtension) {
    each(extension.rocks, (rock) => {
      this.registerComponent(rock);
    });

    each(extension.functions, (func) => {
      this.registerFunction(func.name, func.func);
    });

    each(extension.eventActions, (eventAction) => {
      this.registerEventActionHandler(eventAction.name, eventAction.handler);
    });

    each(extension.stores, (store) => {
      this.registerStore(store.type, store.store);
    });
  }

  setPage(id: string, page: Page) {
    this.#pages.set(id, page);
  }

  getPage(id: string): Page | undefined {
    return this.#pages.get(id);
  }
}