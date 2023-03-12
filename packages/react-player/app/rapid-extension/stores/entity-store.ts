import { EventEmitter, Framework, HttpRequestOptions, IStore, MoveStyleUtils, Page, Scope, StoreConfigBase, StoreMeta } from "@ruijs/move-style";
import { FindEntityOptions } from "@ruijs/react-rapid-rocks";
import { cloneDeep, find, set } from "lodash";
import { SdRpdEntity } from "~/proton";
import rapidAppDefinition from "~/rapidAppDefinition";

export interface EntityStoreConfig extends StoreConfigBase, FindEntityOptions {
  type: "entityStore",
  entityModel?: SdRpdEntity;
  entityCode?: string;
  frozon?: boolean;
  fixedFilters?: FindEntityOptions["filters"];
}

export class EntityStore implements IStore<EntityStoreConfig> {
  #framework: Framework;
  #page: Page;
  #scope: Scope;
  #name: string;
  #emitter: EventEmitter;
  #data?: any;
  #config: EntityStoreConfig;
  #isLoading: boolean;

  constructor(framework: Framework, page: Page, scope: Scope) {
    this.#emitter = new EventEmitter();
    this.#framework = framework;
    this.#page = page;
    this.#scope = scope;
    this.#name = "";
    this.#isLoading = false;
    this.#config = {} as any;
  }

  get name(): string {
    return this.#name;
  }

  setConfig(storeConfig: EntityStoreConfig) {
    this.#config = storeConfig;
    this.#name = storeConfig.name;
  }

  getConfig() {
    return this.#config;
  }

  setPropertyExpression(propName: string, propExpression: string) {
    if (!this.#config.$exps) {
      this.#config.$exps = {};
    }
    this.#config.$exps[propName] = propExpression;
  }

  setPagination(pagination: FindEntityOptions["pagination"]) {
    if (pagination) {
      Object.assign(this.#config, { pagination });
    } else {
      this.#config.pagination = null;
    }
  }

  setFrozon(frozon: boolean) {
    this.#config.frozon = frozon;
  }

  async loadData(input?: any): Promise<any> {
    console.debug(`[RapidExtension][EntityStore][${this.name}] EntityStore.loadData()`)
    if (this.#isLoading) {
      return;
    }

    this.#isLoading = true;

    let entityModel = this.#config.entityModel;
    if (!entityModel) {
      const { entities } = rapidAppDefinition;
      const entityCode = this.#config.entityCode;
      entityModel = find(entities, item => item.code === entityCode);
    }

    if (!entityModel) {
      console.error("Can not find entity model.")
      return;
    }

    const expressions = this.#config.$exps;
    const config: Partial<EntityStoreConfig> = {
      fixedFilters: cloneDeep(this.#config.fixedFilters),
      filters: cloneDeep(this.#config.filters),
      orderBy: cloneDeep(this.#config.orderBy),
      properties: cloneDeep(this.#config.properties),
      pagination: cloneDeep(this.#config.pagination),
    };

    if (expressions) {
      for(const propName in expressions) {
        if (propName.startsWith("$")) {
          console.error(`System field can not bind to an expression. ${propName}=${expressions[propName]}`);
          continue;
        }
        const interpretedValue = this.#page.interpreteExpression(expressions[propName], {
          $scope: this.#scope,
        });
        set(config, propName, interpretedValue);
      }
    }

    if (config.frozon) {
      this.#isLoading = false;
      return;
    }

    const requestOptions: HttpRequestOptions<FindEntityOptions> = {
      method: "POST",
      url: `/api/${entityModel.namespace}/${entityModel.pluralCode}/operations/find`,
      data: {
        filters: config.filters,
        orderBy: config.orderBy,
        properties: config.properties,
        pagination: config.pagination,
      },
    };

    if (input) {
      Object.assign(requestOptions.data!, input);
    }

    const { fixedFilters } = config;
    if (fixedFilters && fixedFilters.length) {
      requestOptions.data!.filters = [
        {
          operator: "and",
          filters: [
            ...fixedFilters,
            ...(requestOptions.data!.filters! || []),
          ]
        }
      ]
    }

    const response = await MoveStyleUtils.request(requestOptions);
    // TODO: should deal with response.statusCode
    // TODO: need something like ResponseDataTransformer.
    const data = response.data;

    this.#data = data;
    this.#isLoading = false;
    this.#emitter.emit("dataChange", data);

    return data;
  }

  observe(callback: (data: any) => void): void{
    this.#emitter.on("dataChange", callback);
  }

  get data() {
    return this.#data;
  }
}

export default {
  type: "entityStore",
  store: EntityStore,
} as StoreMeta<EntityStoreConfig>;