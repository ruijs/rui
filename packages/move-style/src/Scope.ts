import { find } from "lodash";
import { EventEmitter } from "./EventEmitter";
import { Framework } from "./Framework";
import { Page } from "./Page";
import { HttpRequestInput } from "./types/request-types";
import { IStore, StoreConfig, StoreConfigBase } from "./types/store-types";
import { IScope, RockPageEventSubscriptionConfig, RuiEvent, ScopeConfig, ScopeState } from "./types/rock-types";
import { handleComponentEvent } from "./ComponentEventHandler";


export class Scope implements IScope {
  #framework: Framework;
  #page: Page;
  #emitter: EventEmitter;
  #config: ScopeConfig;
  #stores: Record<string, IStore>;
  #vars: Record<string, any>;
  #eventSubscriptions?: RockPageEventSubscriptionConfig[];
  #version: number;

  constructor(framework: Framework, page: Page, config: ScopeConfig) {
    this.#framework = framework;
    this.#page = page;
    this.#emitter = new EventEmitter();
    this.#version = 0;
    this.setConfig(config);
  }

  setConfig(config: ScopeConfig) {
    console.debug(`[RUI][Scope][${config.$id}] Scope.setConfig()`, config)
    if (!config.$id) {
      config.$id = this.#page.generateComponentId("scope");
    }

    this.#vars = config.initialVars || {};
    this.#config = config;
    this.#eventSubscriptions = config.eventSubscriptions;
    this.#stores = {};

    if (config.stores) {
      config.stores.forEach((storeConfig: StoreConfig) => {
        this.addStore(storeConfig);
      });
    }
  }

  getConfig() {
    return this.#config;
  }

  get config() {
    return this.#config;
  }

  addStore(storeConfig: StoreConfig) {
    console.debug(`[RUI][Scope][${this.#config.$id}] Scope.addStore()`, storeConfig);
    let store = this.#stores[storeConfig.name];
    if (!store) {
      store = this.#framework.createStore(this.#page, this, storeConfig);
      store.observe(() => {
        this.#emitter.emit("change", {
          stores: this.#stores,
          vars: this.#vars,
          version: this.#version,
        });
      });
      this.#stores[storeConfig.name] = store;
    }
  }

  getStore<TStore = IStore<StoreConfigBase>>(storeName: string): TStore {
    return find(this.#stores, (item) => item.name === storeName) as TStore;
  }

  async loadData() {
    console.debug(`[RUI][Scope][${this.#config.$id}] Scope.loadData()`)
    for (const storeName in this.#stores) {
      const store = this.#stores[storeName];
      await store.loadData();
    }
  }

  async loadStoreData(storeName: string, input: HttpRequestInput) {
    const store = find(this.#stores, (item) => item.name === storeName);
    if (!store) {
      throw new Error(`Store '${storeName}' not found.`);
    }

    return await store.loadData(input);
  }

  observe(callback: (state: ScopeState) => void) {
    this.#emitter.on("change", callback);
  }

  setVars(vars: Record<string, any>, silent: boolean = false) {
    console.debug(`[RUI][Scope][${this.#config.$id}] Scope.setVars()`, vars);
    const newVars = Object.assign({}, this.#vars, vars);
    this.#vars = newVars;
    this.#version = this.#version + 1;
    if (!silent) {
      this.#emitter.emit("change", {
        stores: this.#stores,
        vars: this.#vars,
        version: this.#version,
      });
    }
  }

  get vars() {
    return this.#vars;
  }

  get stores() {
    return this.#stores;
  }


  async notifyEvent(event: RuiEvent) {
    if (!this.#eventSubscriptions) {
      return;
    }

    for (const eventSubscription of this.#eventSubscriptions) {
      if (event.name !== eventSubscription.eventName) {
        continue;
      }

      await handleComponentEvent(eventSubscription.eventName, event.framework, event.page as any, event.scope, event.sender, eventSubscription.handlers, event.args);
    }
  }
};
