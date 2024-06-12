import { HttpRequestStoreConfig, IStore } from "../types/store-types";
import { request } from "../utils/HttpRequest";
import { EventEmitter } from "../EventEmitter";
import { HttpRequestOptions, HttpRequestInput } from "../types/request-types";
import { Framework } from "../Framework";
import { Page } from "../Page";
import { Scope } from "../Scope";
import { cloneDeep, set } from "lodash";
import { RuiModuleLogger } from "~/Logger";

export class HttpRequestStore implements IStore<HttpRequestStoreConfig> {
  #framework: Framework;
  #logger: RuiModuleLogger;
  #page: Page;
  #scope: Scope;
  #name: string;
  #emitter: EventEmitter;
  #data?: any;
  #config: HttpRequestStoreConfig;
  #request?: HttpRequestOptions;
  #isLoading: boolean;

  constructor(framework: Framework, page: Page, scope: Scope) {
    this.#emitter = new EventEmitter();
    this.#framework = framework;
    this.#logger = framework.getLogger("store");
    this.#page = page;
    this.#scope = scope;
  }

  get data() {
    return this.#data;
  }

  get name(): string {
    return this.#name;
  }

  setConfig(storeConfig: HttpRequestStoreConfig) {
    this.#config = storeConfig;
    this.#name = storeConfig.name;
    this.#request = storeConfig.request;
    this.#data = storeConfig.data;
  }

  setPropertyExpression(propName: string, propExpression: string) {
    if (!this.#config.$exps) {
      this.#config.$exps = {};
    }
    this.#config.$exps[propName] = propExpression;
  }

  async loadData(input: HttpRequestInput) {
    this.#logger.debug(`Loading http request store data, name='${this.name}'`);
    if (this.#isLoading) {
      // return;
    }

    this.#isLoading = true;

    const expressions = this.#config.$exps;
    const config = {
      request: cloneDeep(this.#config.request),
    };
    if (expressions) {
      for (const propName in expressions) {
        if (propName.startsWith("$")) {
          this.#logger.error(`System field can not bind to an expression. ${propName}=${expressions[propName]}`);
          continue;
        }
        const interpretedValue = this.#page.interpreteExpression(expressions[propName], {
          $scope: this.#scope,
        });
        set(config, propName, interpretedValue);
      }
    }

    const requestOptions = input ? Object.assign({}, config.request, input) : config.request;
    const response = await request(requestOptions);
    // TODO: should deal with response.statusCode
    // TODO: need something like ResponseDataTransformer.
    const data = response.data;

    this.#data = data;
    this.#isLoading = false;
    this.#emitter.emit("dataChange", data);

    return data;
  }

  observe(callback: (data: any) => void) {
    this.#emitter.on("dataChange", callback);
  }
}
