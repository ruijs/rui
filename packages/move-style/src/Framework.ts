import { Page } from "./Page";
import { ConstantStore } from "./stores/ConstantStore";
import { HttpRequestStore } from "./stores/HttpRequestStore";
import StoreFactory from "./stores/StoreFactory";
import { RockMeta } from "./types/rock-types";
import { IStore, StoreConfig } from "./types/store-types";

export class Framework {
  #storeFactory: StoreFactory;
  #components: Map<string, RockMeta>;
  #pages: Map<string, Page>;
  constructor() {
    this.#storeFactory = new StoreFactory();
    this.#storeFactory.registerStoreConstructor("constant", ConstantStore);
    this.#storeFactory.registerStoreConstructor("httpRequest", HttpRequestStore);

    this.#components = new Map();
    this.#pages = new Map();

    globalThis.$framework = this;
  }

  registerComponent(component: RockMeta) {
    // TODO: should respect component.version
    const key = `${component.$type}`;
    this.#components.set(key, component);
  }

  public getComponent(type: string) {
    const component = this.#components.get(type);
    return component;
  }

  getComponents() : Map<string, RockMeta> {
    return this.#components;
  }

  registerStore(type: string, constructor: any) {
    this.#storeFactory.registerStoreConstructor(type, constructor);
  }

  createStore(storeConfig: StoreConfig): IStore {
    return this.#storeFactory.createStore(this, storeConfig);
  }

  setPage(id: string, page: Page) {
    this.#pages.set(id, page);
  }

  getPage(id: string): Page | undefined {
    return this.#pages.get(id);
  }
}