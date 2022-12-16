import { EventEmitter } from "./EventEmitter";
import { RockConfig, RockPropValue, PageConfig, PageWithLayoutConfig, PageWithoutLayoutConfig } from "./types/rock-types";
import _ from "lodash";
import { ExpressionInterpreter } from "./ExpressionInterpreter";
import { Framework } from "./Framework";
import { Page } from "./Page";

type TravelProcessor = (parentConfig: RockConfig, config: RockConfig) => void;

export class ConfigProcessor {
  #framework: Framework;
  #page: Page;
  #interpreter: ExpressionInterpreter;
  #emitter: EventEmitter;
  #idSeed: number;
  #config: PageConfig;
  #componentMapById: Map<string, RockConfig>;
  #parentIdMapById: Map<string, string>;

  constructor(framework: Framework, page: Page, interpreter: ExpressionInterpreter) {
    this.#framework = framework;
    this.#page = page;
    this.#interpreter = interpreter;
    this.#emitter = new EventEmitter();
    this.#idSeed = 0;
  }

  generateComponentId(type: string) {
    return `${type}-${++this.#idSeed}`;
  }

  observe(callback: (config: PageConfig) => void) {
    this.#emitter.on("change", callback);
  }

  loadConfig(config: PageConfig) {
    console.debug(`[RUI][ConfigProcessor][${config.$id}] ConfigProcessor.loadConfig().`)
    this.#componentMapById = new Map();
    this.#parentIdMapById = new Map();

    var processedConfig = _.cloneDeep(config);
    if ((processedConfig as PageWithLayoutConfig).layout) {
      // TODO: finish process config of page with layout.
    } else {
      const configWithoutLayout = processedConfig as PageWithoutLayoutConfig;
      configWithoutLayout.view.forEach(this.travelRockConfig.bind(this, this.#processComponentOnLoadConfig.bind(this), null));
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

  #processComponentOnLoadConfig(parentConfig: RockConfig, config: RockConfig) {
    // Set default id.
    if (!config.$id) {
      config.$id = this.generateComponentId(config.$type);
    }

    // Interprete expressions.
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
    this.#parentIdMapById.set(config.$id, parentConfig?.$id);
  }

  interpreteConfigExpressions(parentConfig: RockConfig, config: RockConfig, vars: Record<string, any>) {
    const propExpressions = config.$exps;
    if (propExpressions) {
      for(const propName in propExpressions) {
        config[propName] = this.#interpreter.interprete(propExpressions[propName], Object.assign({
          $framework: this.#framework,
          $page: this.#page,
          $self: config,
        }, vars));
      }
    }
  }

  travelRockConfig(callback: TravelProcessor, parentConfig: RockConfig, config: RockConfig) {
    callback(parentConfig, config);

    let childrenPropNames = ["children"];
    const meta = this.#framework.getComponent(config.$type);
    if (meta?.slots) {
      childrenPropNames = childrenPropNames.concat(Object.keys(meta.slots));
    }

    for (const childPropName of childrenPropNames) {
      const children = config[childPropName];
      if (children) {
        if (Array.isArray(children)) {
          children.forEach(this.travelRockConfig.bind(this, callback, config));
        } else {
          this.travelRockConfig(callback, config, children as RockConfig);
        }
      }
    }
  }

  addComponents(components: RockConfig[], parentComponentId?: string, slotName?: string, prevSiblingComponentId?: string) {
    let parentComponent: RockConfig = null;
    if (parentComponentId) {
      parentComponent = this.#componentMapById.get(parentComponentId);
      if (!parentComponent) {
        throw new Error(`Create component failed. Parent component with id '${parentComponentId}' was not found.`)
      }
    }
 
    for (const component of components) {
      this.travelRockConfig((parentComponent, component) => {
        if (!component.$id ||
          this.#componentMapById.has(component.$id)) {
          component.$id = this.generateComponentId(component.$type);
        }
      }, parentComponent, component);
    }

    let componentHostPropName = "children";

    let childComponents: RockConfig[];
    let allowMultiComponents = true;
    if (parentComponent) {
      // TODO: How to support deep slot? Eg: table.columns[].renderer.
      if (slotName) {
        const meta = this.#framework.getComponent(parentComponent.$type);
        if (meta?.slots) {
          const slotMeta = meta?.slots?.[slotName];
          if (!slotMeta) {
            throw new Error(`Create component failed. Unkown slot '${parentComponent.$type}#${slotName}'.`);
          }
          allowMultiComponents = slotMeta.allowMultiComponents;
        }
        componentHostPropName = slotName;
      }

      const componentHost = parentComponent[componentHostPropName];
      if (componentHost) {
        if (!allowMultiComponents) {
          throw new Error(`Create component failed. Multi-components in slot '${parentComponent.$type}#${slotName}' is not allowed.`);
        } else if (!_.isArray(componentHost)) {
          parentComponent[componentHostPropName] = [componentHost];
        }
      } else {
        parentComponent[componentHostPropName] = [];
      }
      childComponents = parentComponent[componentHostPropName];
    } else {
      let pageView = this.#config.view;
      if (!pageView) {
        pageView = [];
      } else if (!_.isArray(pageView)) {
        pageView = [pageView];
      }
      childComponents = pageView;
    }

    const prevSiblingComponentIndex = _.findIndex(childComponents, (item) => item.$id === prevSiblingComponentId);
    if (prevSiblingComponentIndex === -1 ||
        prevSiblingComponentIndex === childComponents.length - 1) {
      // append to end.
      childComponents = childComponents.concat(components);
    } else {
      childComponents = childComponents.splice(prevSiblingComponentIndex + 1, 0, ...components);
    }

    if (parentComponent) {
      if (allowMultiComponents) {
        parentComponent[componentHostPropName] = childComponents;
      } else {
        parentComponent[componentHostPropName] = childComponents[0];
      }
    } else {
      this.#config.view = childComponents;
    }

    this.loadConfig(this.#config);
  }

  removeComponents(componentIds: string[]) {
    if (!componentIds || !componentIds.length) {
      return;
    }

    for (const componentId of componentIds) {
      let childComponents: RockConfig[];
      const parentComponentId = this.#parentIdMapById.get(componentId);
      let parentComponent: RockConfig;
      if (!parentComponentId) {
        // this means the parent component is page view.
        childComponents = (this.#config as PageWithoutLayoutConfig).view;
        if (!_.isArray(childComponents)) {
          childComponents = [childComponents];
        }
        const componentIndex = _.findIndex(childComponents, (item) => item.$id === componentId);
        if (componentIndex !== -1) {
          childComponents.splice(componentIndex, 1);

          (this.#config as PageWithoutLayoutConfig).view = childComponents;
        }
      } else {
        parentComponent = this.#componentMapById.get(parentComponentId);

        let childrenPropNames = ["children"];
        const meta = this.#framework.getComponent(parentComponent.$type);
        if (meta?.slots) {
          childrenPropNames = childrenPropNames.concat(Object.keys(meta.slots));
        }

        for (const childrenPropName of childrenPropNames) {
          childComponents = parentComponent[childrenPropName];
          if (!childComponents) {
            continue;
          }

          const slotMeta = meta?.slots?.[childrenPropName];

          if (!_.isArray(childComponents)) {
            childComponents = [childComponents];
          }
    
          const componentIndex = _.findIndex(childComponents, (item) => item.$id === componentId);
          if (componentIndex !== -1) {
            childComponents.splice(componentIndex, 1);
            if (slotMeta && !slotMeta.allowMultiComponents) {
              parentComponent[childrenPropName] = childComponents.length ? childComponents[0] : null;
            } else {
              parentComponent[childrenPropName] = childComponents;
            }
            break;
          }
        }
      }
    }
 
    this.loadConfig(this.#config);
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


  setComponentPropertyExpression(componentId: string, propName: string, propExpression: string) {
    const componentConfig = this.#componentMapById.get(componentId);
    if (!componentConfig) {
      console.error(`Component with id '${componentId}' not found.`)
      return;
    }

    if (!componentConfig.$exps) {
      componentConfig.$exps = {};
    }
    componentConfig.$exps[propName] = propExpression;
    // TODO: need a more efficient implementation
    this.loadConfig(this.#config);
  }

  removeComponentPropertyExpression(componentId: string, propName: string) {
    const componentConfig = this.#componentMapById.get(componentId);
    if (!componentConfig) {
      console.error(`Component with id '${componentId}' not found.`)
      return;
    }

    if (!componentConfig.$exps) {
      return;
    }

    delete componentConfig.$exps[propName];
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