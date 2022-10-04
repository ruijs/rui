import { EventEmitter } from "./EventEmitter";
import { PageConfig, PageWithLayoutConfig, PageWithoutLayoutConfig } from "./types/page-types";
import { RockConfig, RockPropValue } from "./types/rock-types";
import _ from "lodash";
import { ExpressionInterpreter } from "./ExpressionInterpreter";
import { Framework } from "./Framework";
import { Page } from "./Page";
import { generateComponentId } from "./utils";

export class ConfigProcessor {
  #framework: Framework;
  #page: Page;
  #interpreter: ExpressionInterpreter;
  #emitter: EventEmitter;
  #config: PageConfig;
  #componentMapById: Map<string, RockConfig>;

  constructor(framework: Framework, page: Page, interpreter: ExpressionInterpreter) {
    this.#framework = framework;
    this.#page = page;
    this.#interpreter = interpreter;
    this.#emitter = new EventEmitter();
  }

  observe(callback: (config: PageConfig) => void) {
    this.#emitter.on("change", callback);
  }

  loadConfig(config: PageConfig) {
    this.#componentMapById = new Map();

    var processedConfig = _.cloneDeep(config);
    if ((processedConfig as PageWithLayoutConfig).layout) {
      // TODO: finish process config of page with layout.
    } else {
      const configWithoutLayout = processedConfig as PageWithoutLayoutConfig;
      configWithoutLayout.view.forEach(this.travelRockConfig.bind(this, null));
    }
    
    this.#config = processedConfig;
    this.#emitter.emit("change", processedConfig);
  }

  getConfig() {
    return this.#config;
  }

  reload() {
    this.loadConfig(this.#config);
  }

  travelRockConfig(parentConfig: RockConfig, config: RockConfig) {
    // Set default id.
    if (!config.$id) {
      config.$id = generateComponentId(config.$type);
    }

    const propExpressions = config.$exps;
    if (propExpressions) {
      for(const propName in propExpressions) {
        config[propName] = this.#interpreter.interprete(propExpressions[propName], {
          $framework: this.#framework,
          $page: this.#page,
          $self: config,
          $parent: parentConfig,
        });
      }
    }
  
    this.#componentMapById.set(config.$id, config);

    let childrenPropNames = ["children"];
    const meta = this.#framework.getComponent(config.$type);
    if (meta?.slots) {
      childrenPropNames = childrenPropNames.concat(Object.keys(meta.slots));
    }

    for (const childPropName of childrenPropNames) {
      const children = config[childPropName];
      if (children) {
        if (Array.isArray(children)) {
          children.forEach(this.travelRockConfig.bind(this, config));
        } else {
          this.travelRockConfig(config, children as RockConfig);
        }
      }
    }
  }

  setComponentProperty(componentId: string, propName: string, propValue: RockPropValue) {
    const componentConfig = this.#componentMapById.get(componentId);
    if (!componentConfig) {
      console.error(`Component with id '${componentId}' not found.`)
      return;
    }

    componentConfig[propName] = propValue;
    // TODO: need a more efficient implementation
    this.loadConfig(this.#config);
  }

  getComponentProperty(componentId: string, propName: string) {
    const componentConfig = this.#componentMapById.get(componentId);
    if (!componentConfig) {
      console.error(`Component with id '${componentId}' not found.`)
      return;
    }

    return componentConfig[propName];
  }

  getComponent(componentId: string) {
    return this.#componentMapById.get(componentId);
  }
}