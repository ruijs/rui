import { each, get, isObject, isString, merge } from "lodash";
import { Page } from "./Page";
import { Scope } from "./Scope";
import { ConstantStore } from "./stores/ConstantStore";
import { HttpRequestStore } from "./stores/HttpRequestStore";
import StoreFactory from "./stores/StoreFactory";
import { RuiExtension } from "./types/extension-types";
import { Rock } from "./types/rock-types";
import { IStore, StoreConfig } from "./types/store-types";
import { ConfigProcessor } from "./ConfigProcessor";
import { LoggerFactory, LoggerProvider, RuiModulesNames } from "./Logger";
import * as MoveStyleUtils from "./utils";
import { GetStringResourceConfig, Lingual, LocaleNamespace, LocaleResource } from "./types/locale-types";
import locales from "./locales";

export class Framework {
  #loggerFactory: LoggerFactory;
  #storeFactory: StoreFactory;
  #components: Map<string, Rock>;
  #functions: Record<string, Function>;
  #eventActionHandlers: Map<string, Function>;
  #expVars: Record<string, any>;
  #configProcessors: ConfigProcessor[];
  #pages: Map<string, Page>;

  #lingual: string;
  #fallbackLingual: string;
  #locales: Map<LocaleNamespace, Map<Lingual, LocaleResource>>;

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
    this.#locales = new Map();

    this.registerExpressionVar("$rui", MoveStyleUtils);
    this.registerExpressionVar("$sr", this.getLocaleStringResource.bind(this));

    this.loadLocaleResources("move-style", locales);
    this.setLingual("zh-CN");
    this.setFallbackLingual("zh-CN");

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

  get utils() {
    return MoveStyleUtils;
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

    if (extension.locales) {
      this.loadLocaleResources(extension.name, extension.locales);
    }
  }

  setPage(id: string, page: Page) {
    this.#pages.set(id, page);
  }

  getPage(id: string): Page | undefined {
    return this.#pages.get(id);
  }

  setLingual(lingual: string) {
    this.#lingual = lingual;
  }

  setFallbackLingual(lingual: string) {
    this.#fallbackLingual = lingual;
  }

  getLocaleResources() {
    return this.#locales;
  }

  loadLocaleResources(ns: string, localeResources: Record<string, LocaleResource>) {
    for (const lingual in localeResources) {
      const localeResourceToLoad = localeResources[lingual];

      let localeResourcesOfNs = this.#locales.get(ns);
      if (!localeResourcesOfNs) {
        localeResourcesOfNs = new Map();
        this.#locales.set(ns, localeResourcesOfNs);
      }

      let localeResource = localeResourcesOfNs.get(lingual);
      if (!localeResource) {
        localeResource = {
          translation: {},
        };
        localeResourcesOfNs.set(lingual, localeResource);
      }

      merge(localeResource.translation, localeResourceToLoad.translation);
    }
  }

  getLocaleStringResource(ns: string | GetStringResourceConfig, name?: string, params?: Record<string, any>): string {
    if (arguments.length === 1) {
      if (isObject(ns)) {
        params = ns.params;
        name = ns.name;
        ns = ns.ns;
      } else {
        name = ns;
        ns = "default";
      }
    } else if (arguments.length === 2) {
      if (isString(ns) && isObject(name)) {
        params = name;
        name = ns;
        ns = "default";
      }
    }

    if (!ns) {
      ns = "default";
    }

    let localeResourceOfNs = this.#locales.get(ns as string);
    if (!localeResourceOfNs) {
      return `${ns}:${name}`;
    }

    let localeResourcesOfLingual = localeResourceOfNs.get(this.#lingual);
    if (!localeResourcesOfLingual) {
      localeResourcesOfLingual = localeResourceOfNs.get(this.#fallbackLingual);
    }

    if (!localeResourcesOfLingual) {
      return `${ns}:${name}`;
    }

    const sr = get(localeResourcesOfLingual.translation, name);
    if (!sr) {
      return `${ns}:${name}`;
    }
    if (isObject(sr)) {
      throw new Error("String resource should be a text string. Check the 'name' parameter.");
    }

    if (!params) {
      return sr;
    }

    return MoveStyleUtils.fulfillVariablesInString(sr, params);
  }
}
