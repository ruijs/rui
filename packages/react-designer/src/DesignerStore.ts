import { EventEmitter, Framework, IStore, Page, PageConfig, StoreConfigBase } from "@ruijs/move-style";

export interface DesignerStoreConfig extends StoreConfigBase {
  pageConfig?: PageConfig;
}

export default class DesignerStore implements IStore<DesignerStoreConfig> {
  #emitter: EventEmitter;
  #name: string;
  #page: Page;
  #selectedComponentId: string;

  constructor(framework: Framework) {
    this.#emitter = new EventEmitter();
    this.#page = new Page(framework);
    this.#page.observe(() => {
      this.#emitter.emit("dataChange", null);
    });
  }
  get name(): string {
    return this.#name;
  }

  setConfig(storeConfig: DesignerStoreConfig) {
    this.#name = storeConfig.name;
    if (storeConfig.pageConfig) {
      this.#page.setConfig(storeConfig.pageConfig);
    }
  }

  async loadData(input?: any): Promise<any> {
    this.#emitter.emit("dataChange", null);
  }

  observe(callback: (data: any) => void) {
    this.#emitter.on("dataChange", callback);
  }

  get pageConfig(): PageConfig {
    return this.#page.getConfig();
  }

  set pageConfig(value: PageConfig) {
    this.#page.setConfig(value);
    this.#emitter.emit("dataChange", null);
  }

  get page(): Page {
    return this.#page;
  }

  get selectedComponentId(): string {
    return this.#selectedComponentId;
  }

  set selectedComponentId(value: string) {
    this.#selectedComponentId = value;
    this.#emitter.emit("dataChange", null);
  }
}