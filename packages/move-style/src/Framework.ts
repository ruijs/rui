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
import { ConfigProcessor } from "./ConfigProcessor";
import { RuiLogger, LoggerFactory, LoggerProvider, RuiModulesNames } from "./Logger";

export class Framework {
  #loggerFactory: LoggerFactory;
  #storeFactory: StoreFactory;
  #components: Map<string, Rock>;
  #functions: Record<string, Function>;
  #eventActionHandlers: Map<string, Function>;
  #expVars: Record<string, any>;
  #configProcessors: ConfigProcessor[];
  #pages: Map<string, Page>;
  constructor() {
    this.#loggerFactory = new LoggerFactory();

    this.#storeFactory = new StoreFactory();
    this.#storeFactory.registerStoreConstructor("constant", ConstantStore);
    this.#storeFactory.registerStoreConstructor("httpRequest", HttpRequestStore);

    this.#components = new Map();
    this.#eventActionHandlers = new Map();
    this.#functions = {};
    this.#expVars = {};
    this.#configProcessors = [];
    this.#pages = new Map();

    this.registerExpressionVar("$rui", ruiExp);

    globalThis.$framework = this;
  }

  setLoggerProvider(provider: LoggerProvider) {
    this.#loggerFactory.setLoggerProvider(provider);
  }

  getLogger(moduleName: RuiModulesNames = "other") {
    return this.#loggerFactory.getLogger(moduleName);
  }

  getRockLogger() {
    return this.#loggerFactory.getRockLogger();
  }

  registerComponent(component: Rock) {
    // TODO: should respect component.version
    const key = `${component.$type}`;
    wrapRenderer(this, component);
    this.#components.set(key, component);
  }

  getComponent(type: string) {
    const component = this.#components.get(type);
    return component;
  }

  getComponents(): Map<string, Rock> {
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

  getFunctions(): Record<string, Function> {
    return this.#functions;
  }

  registerExpressionVar(name: string, value: any) {
    this.#expVars[name] = value;
  }

  getExpressionVars(): Record<string, any> {
    return this.#expVars;
  }

  registerConfigProcessor(processor: ConfigProcessor) {
    this.#configProcessors.push(processor);
  }

  getConfigProcessors() {
    return this.#configProcessors;
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

    each(extension.configProcessors, (configProcessor) => {
      this.registerConfigProcessor(configProcessor);
    });
  }

  setPage(id: string, page: Page) {
    this.#pages.set(id, page);
  }

  getPage(id: string): Page | undefined {
    return this.#pages.get(id);
  }
}
