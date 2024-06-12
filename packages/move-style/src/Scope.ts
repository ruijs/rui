import { find, omit, uniqBy } from "lodash";
import { EventEmitter } from "./EventEmitter";
import { Framework } from "./Framework";
import { Page } from "./Page";
import { HttpRequestInput } from "./types/request-types";
import { IStore, StoreConfig, StoreConfigBase } from "./types/store-types";
import { IScope, RockPageEventSubscriptionConfig, RuiEvent, ScopeConfig, ScopeState } from "./types/rock-types";
import { handleComponentEvent } from "./ComponentEventHandler";
import { RuiModuleLogger } from "./Logger";

export class Scope implements IScope {
  #framework: Framework;
  #logger: RuiModuleLogger;
  #page: Page;
  #emitter: EventEmitter;
  #config: ScopeConfig;
  #stores: Record<string, IStore>;
  #vars: Record<string, any>;
  #eventSubscriptions?: RockPageEventSubscriptionConfig[];
  #version: number;

  constructor(framework: Framework, page: Page, config: ScopeConfig) {
    this.#framework = framework;
    this.#logger = framework.getLogger("scope");
    this.#page = page;
    this.#emitter = new EventEmitter();
    this.#version = 0;
    this.setConfig(config);
  }

  setConfig(config: ScopeConfig) {
    this.#logger.debug(`Setting scope config...`, { config });
    if (!config.$id) {
      config.$id = this.#page.generateComponentId("scope");
    }

    this.#vars = config.initialVars || {};
    this.#config = config;
    this.#eventSubscriptions = config.eventSubscriptions;
    this.#stores = {};

    this.addStores(config.stores);
  }

  getConfig() {
    return this.#config;
  }

  get config() {
    return this.#config;
  }

  addStores(storeConfigs: StoreConfig[]) {
    if (storeConfigs) {
      storeConfigs.forEach((storeConfig: StoreConfig) => {
        this.addStore(storeConfig);
      });
    }
  }

  addStore(storeConfig: StoreConfig) {
    this.#logger.debug(`Adding store...`, { storeConfig });
    let store = this.#stores[storeConfig.name];
    if (!store) {
      store = this.#framework.createStore(this.#page, this, storeConfig);

      this.#config.stores = uniqBy([...(this.#config.stores || []), storeConfig], "name");
      this.#stores[storeConfig.name] = store;

      store.observe(() => {
        this.#emitter.emit("change", {
          stores: this.#stores,
          vars: this.#vars,
          version: this.#version,
        });
      });
    }
  }

  updateStore(storeConfig: StoreConfig) {
    this.#logger.debug(`Updating store...`, { storeConfig });
    let store = this.#stores[storeConfig.name];
    if (store) {
      this.#config.stores = (this.#config.stores || []).map((s) => (s.name === storeConfig.name ? storeConfig : s));

      this.#stores[storeConfig.name].setConfig(storeConfig);

      store.observe(() => {
        this.#emitter.emit("change", {
          stores: this.#stores,
          vars: this.#vars,
          version: this.#version,
        });
      });
    }
  }

  removeStore(storeConfig: StoreConfig) {
    this.#logger.debug(`Removing store...`, { storeConfig });
    let store = this.#stores[storeConfig.name];
    if (store) {
      this.#config.stores = (this.#config.stores || []).filter((s) => s.name !== storeConfig.name);

      this.#stores = omit(this.#stores, [storeConfig.name]);

      this.#emitter.emit("change", {
        stores: this.#stores,
        vars: this.#vars,
        version: this.#version,
      });
    }
  }

  getStore<TStore = IStore<StoreConfigBase>>(storeName: string): TStore {
    return find(this.#stores, (item) => item.name === storeName) as TStore;
  }

  async loadData() {
    this.#logger.debug(`Loading scope data...`);
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
    this.#logger.debug(`Setting vars of scope '${this.#config.$id}'`, { vars });
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
}
