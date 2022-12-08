import { EventEmitter } from "./EventEmitter";
import { PageConfig, PageWithLayoutConfig, PageWithoutLayoutConfig } from "./types/page-types";
import { RockConfig, RockPropValue } from "./types/rock-types";
import _ from "lodash";
import { ExpressionInterpreter } from "./ExpressionInterpreter";
import { Framework } from "./Framework";
import { Page } from "./Page";
import { generateComponentId } from "./utils";

type TravelProcessor = (parentConfig: RockConfig, config: RockConfig) => void;

export class ConfigProcessor {
  #framework: Framework;
  #page: Page;
  #interpreter: ExpressionInterpreter;
  #emitter: EventEmitter;
  #config: PageConfig;
  #componentMapById: Map<string, RockConfig>;
  #parentIdMapById: Map<string, string>;

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
    this.#parentIdMapById.set(config.$id, parentConfig?.$id);
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

  addComponents(components: RockConfig[], parentComponentId?: string, prevSiblingComponentId?: string) {
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
          component.$id = generateComponentId(component.$type);
        }
      }, parentComponent, component);
    }

    let childComponents: RockConfig[];
    if (parentComponent) {
      if (!parentComponent.children) {
        parentComponent.children = [];
      } else if (!_.isArray(parentComponent.children)) {
        parentComponent.children = [parentComponent.children];
      }
      childComponents = parentComponent.children;
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
      parentComponent.children = childComponents;
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
        // this means the parent of component is page.
        childComponents = (this.#config as PageWithoutLayoutConfig).view;
      } else {
        parentComponent = this.#componentMapById.get(parentComponentId);
        childComponents = parentComponent.children;
      }

      if (!_.isArray(childComponents)) {
        childComponents = [childComponents];
      }

      const componentIndex = _.findIndex(childComponents, (item) => item.$id === componentId);
      if (componentIndex !== -1) {
        childComponents.splice(componentIndex, 1);

        if (parentComponent) {
          parentComponent.children = childComponents;
        } else {
          (this.#config as PageWithoutLayoutConfig).view = childComponents;
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