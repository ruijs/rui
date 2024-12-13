import { EventEmitter } from "./EventEmitter";
import { RockConfig, RockPropValue, PageConfig, RockMessage, RockInstance, RockMessageToComponent, ScopeConfig } from "./types/rock-types";
import { clone, cloneDeep, findIndex, isArray, isString, set } from "lodash";
import { ExpressionInterpreter } from "./ExpressionInterpreter";
import { Framework } from "./Framework";
import { Page } from "./Page";
import { Scope } from "./Scope";
import { RuiModuleLogger } from "./Logger";

type TravelProcessor = (scope: Scope, parentConfig: RockConfig, config: RockConfig) => void;

export class ComponentTreeManager {
  #framework: Framework;
  #logger: RuiModuleLogger;
  #page: Page;
  #interpreter: ExpressionInterpreter;
  #emitter: EventEmitter;
  #idSeed: number;
  #config: PageConfig;
  #componentMapById: Map<string, RockConfig>;
  #parentIdMapById: Map<string, string>;
  #scopeMapById: Map<string, Scope>;

  constructor(framework: Framework, page: Page, interpreter: ExpressionInterpreter) {
    this.#logger = framework.getLogger("componentTreeManager");

    this.#framework = framework;
    this.#page = page;
    this.#interpreter = interpreter;
    this.#emitter = new EventEmitter();
    this.#idSeed = 0;

    this.#componentMapById = new Map();
    this.#parentIdMapById = new Map();
    this.#scopeMapById = new Map();
  }

  generateComponentId(type: string) {
    return `${type}${++this.#idSeed}`;
  }

  observe(callback: (config: PageConfig) => void) {
    this.#emitter.on("change", callback);
  }

  loadConfig(config: PageConfig) {
    this.#logger.debug(`Loading config...`);
    // this.#componentMapById = new Map();
    // this.#parentIdMapById = new Map();
    // this.#scopeMapById = new Map();

    var processedConfig = clone(config);
    if (processedConfig.layout) {
      processedConfig.layout.view.forEach(this.travelRockConfig.bind(this, this.#processComponentOnLoadConfig.bind(this), this.#page.scope, null));
    }
    processedConfig.view.forEach(this.travelRockConfig.bind(this, this.#processComponentOnLoadConfig.bind(this), this.#page.scope, null));

    this.#config = processedConfig;
    this.#emitter.emit("change", processedConfig);
  }

  getConfig() {
    return this.#config;
  }

  getSerializableConfig() {
    const serializableConfig = cloneDeep(this.#config);
    serializableConfig.view.forEach((rockConfig) => {
      this.travelRockConfig(
        (scope: Scope, parentConfig: RockInstance, config: RockInstance) => {
          delete rockConfig._scope;
          delete rockConfig._state;
          delete rockConfig._initialized;
        },
        this.#page.scope,
        null,
        rockConfig,
      );
    });
    return serializableConfig;
  }

  reload() {
    this.loadConfig(this.#config);
  }

  #processComponentOnLoadConfig(scope: Scope, parentConfig: RockConfig, config: RockConfig) {
    // Set default id.
    if (!config.$id) {
      this.#logger.verbose(`Id of component '${config.$type}' was not set.`);
      config.$id = this.generateComponentId(config.$type);
    }

    if (config.$type === "scope" && !this.#scopeMapById.get(config.$id)) {
      this.#scopeMapById.set(config.$id, new Scope(this.#framework, this.#page, config as ScopeConfig));
    }

    // Interprete expressions.
    this.interpreteConfigExpressions(parentConfig, config, {
      $scope: scope,
    });
  }

  initComponents() {
    this.#logger.debug(`Initializing components...`);
    if (this.#config.layout) {
      this.#config.layout.view.forEach(this.attachComponent.bind(this, this.#page.scope, null));
    }
    this.#config.view.forEach(this.attachComponent.bind(this, this.#page.scope, null));
  }

  attachComponent(scope: Scope, parentConfig: RockConfig, config: RockConfig) {
    this.travelRockConfig(
      (scope: Scope, parentConfig: RockInstance, config: RockInstance) => {
        if (isString(config)) {
          return;
        }

        let rockType = config.$type;
        if (!rockType) {
          // Adapter slot
          rockType = "$slotAdapter";
        }

        if (!config.$id) {
          this.#logger.verbose(`Id of component '${config.$type}' was not set.`);
          config.$id = this.generateComponentId(rockType);
        }
        this.#logger.debug(`Attaching component '${config.$id}'...`);

        if (config.$type === "scope" && !this.#scopeMapById.get(config.$id)) {
          this.#scopeMapById.set(config.$id, new Scope(this.#framework, this.#page, config as ScopeConfig));
        }

        if (config.$type) {
          const rock = this.#framework.getComponent(config.$type);

          if (!rock) {
            this.#logger.error(`Unknown component '${config.$type}'`);
          } else if (rock.declarativeComponent !== true) {
            if (rock.onInit) {
              this.#logger.debug(`Initializing component '${config.$id}'...`);
              rock.onInit(
                {
                  framework: this.#framework,
                  page: this.#page,
                  scope: scope || this.#page.scope,
                },
                config,
              );
            }

            config._scope = scope;
          }
        }

        // TODO: should set as _initialized after all children initialized.
        config._initialized = true;

        this.#componentMapById.set(config.$id, config);
        this.#parentIdMapById.set(config.$id, parentConfig?.$id);
      },
      scope,
      parentConfig,
      config,
    );
  }

  interpreteConfigExpressions(parentConfig: RockConfig, config: RockConfig, vars: Record<string, any>) {
    const propExpressions = config.$exps;
    if (propExpressions) {
      const expVars = Object.assign(
        {},
        this.#framework.getExpressionVars(),
        {
          $framework: this.#framework,
          $page: this.#page,
          $functions: this.#framework.getFunctions(),
          $self: config,
          $parent: parentConfig,
        },
        vars,
      );

      for (const propName in propExpressions) {
        const propValue = this.#interpreter.interprete(propExpressions[propName], expVars);
        set(config, propName, propValue);
      }
    }
  }

  travelRockConfig(callback: TravelProcessor, scope: Scope, parentConfig: RockConfig, config: RockConfig) {
    callback(scope, parentConfig, config);
    if (config.$type === "scope") {
      scope = this.#scopeMapById.get(config.$id);
    }

    let childrenPropNames = ["children"];
    const meta = this.#framework.getComponent(config.$type);
    if (meta?.slots) {
      childrenPropNames = childrenPropNames.concat(Object.keys(meta.slots));
    }

    // TODO: deal with adapter slot.

    for (const childPropName of childrenPropNames) {
      const children = config[childPropName];
      if (children) {
        if (Array.isArray(children)) {
          children.forEach(this.travelRockConfig.bind(this, callback, scope, config));
        } else {
          this.travelRockConfig(callback, scope, config, children as RockConfig);
        }
      }
    }
  }

  addComponents(components: RockConfig[], parentComponentId?: string, slotPropName?: string, prevSiblingComponentId?: string) {
    let parentComponent: RockConfig = null;
    if (parentComponentId) {
      parentComponent = this.#componentMapById.get(parentComponentId);
      if (!parentComponent) {
        throw new Error(`Create component failed. Parent component with id '${parentComponentId}' was not found.`);
      }

      const parentComponentMeta = this.#framework.getComponent(parentComponent.$type);
      if (parentComponentMeta.voidComponent) {
        throw new Error(`Can not add component to a void-component.`);
      }
    }

    // TODO: Implement this: get the right scope.
    const scope = this.#page.scope;
    for (const component of components) {
      this.travelRockConfig(
        (scope, parentComponent, component) => {
          if (!component.$id || this.#componentMapById.has(component.$id)) {
            component.$id = this.generateComponentId(component.$type);
          }
        },
        scope,
        parentComponent,
        component,
      );
    }

    let componentHostPropName = "children";

    let childComponents: RockConfig[];
    let allowMultiComponents = true;
    if (parentComponent) {
      // TODO: Should support slot with adapter. Eg: table.columns[].render, tabs.items[].children.
      if (slotPropName) {
        const meta = this.#framework.getComponent(parentComponent.$type);
        if (meta?.slots) {
          const slotMeta = meta?.slots?.[slotPropName];
          if (!slotMeta) {
            throw new Error(`Create component failed. Unkown slot '${parentComponent.$type}#${slotPropName}'.`);
          }
          allowMultiComponents = slotMeta.allowMultiComponents;
        }
        componentHostPropName = slotPropName;
      }

      const componentHost = parentComponent[componentHostPropName];
      if (componentHost) {
        if (!allowMultiComponents) {
          throw new Error(`Create component failed. Multi-components in slot '${parentComponent.$type}#${slotPropName}' is not allowed.`);
        } else if (!isArray(componentHost)) {
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
      } else if (!isArray(pageView)) {
        pageView = [pageView];
      }
      childComponents = pageView;
    }

    const prevSiblingComponentIndex = findIndex(childComponents, (item) => item.$id === prevSiblingComponentId);
    if (prevSiblingComponentIndex === -1 || prevSiblingComponentIndex === childComponents.length - 1) {
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

    for (const component of components) {
      this.attachComponent(scope, parentComponent, component);
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
        childComponents = this.#config.view;
        if (!isArray(childComponents)) {
          childComponents = [childComponents];
        }
        const componentIndex = findIndex(childComponents, (item) => item.$id === componentId);
        if (componentIndex !== -1) {
          childComponents.splice(componentIndex, 1);

          this.#config.view = childComponents;
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

          if (!isArray(childComponents)) {
            childComponents = [childComponents];
          }

          const componentIndex = findIndex(childComponents, (item) => item.$id === componentId);
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
      this.#logger.error(`Component with id '${componentId}' not found.`);
      return;
    }

    componentConfig[propName] = propValue;
    // TODO: need a more efficient implementation
    this.loadConfig(this.#config);
  }

  setComponentProperties(componentId: string, props: Record<string, RockPropValue>) {
    const componentConfig = this.#componentMapById.get(componentId);
    if (!componentConfig) {
      this.#logger.error(`Component with id '${componentId}' not found.`);
      return;
    }

    for (const propName in props) {
      componentConfig[propName] = props[propName];
    }
    // TODO: need a more efficient implementation
    this.loadConfig(this.#config);
  }

  removeComponentProperty(componentId: string, propName: string) {
    const componentConfig = this.#componentMapById.get(componentId);
    if (!componentConfig) {
      this.#logger.error(`Component with id '${componentId}' not found.`);
      return;
    }

    delete componentConfig[propName];
    // TODO: need a more efficient implementation
    this.loadConfig(this.#config);
  }

  setComponentPropertyExpression(componentId: string, propName: string, propExpression: string) {
    const componentConfig = this.#componentMapById.get(componentId);
    if (!componentConfig) {
      this.#logger.error(`Component with id '${componentId}' not found.`);
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
      this.#logger.error(`Component with id '${componentId}' not found.`);
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
      this.#logger.error(`Component with id '${componentId}' not found.`);
      return;
    }

    return componentConfig[propName];
  }

  getComponent(componentId: string) {
    return this.#componentMapById.get(componentId);
  }

  sendComponentMessage<TRockMessage extends RockMessage<any> = RockMessage<any>>(componentId: string, message: TRockMessage) {
    const componentConfig = this.#componentMapById.get(componentId) as RockInstance;
    if (!componentConfig) {
      this.#logger.error(`Component with id '${componentId}' not found.`);
      return;
    }

    const rock = this.#framework.getComponent(componentConfig.$type);
    if (rock.declarativeComponent === true) {
      return;
    }

    const { onReceiveMessage } = rock;
    if (!onReceiveMessage) {
      this.#logger.error(`${componentConfig.$type} component can not receive message.`);
      return;
    }

    const messageToComponent: RockMessageToComponent<any> = {
      framework: this.#framework,
      page: this.#page,
      name: message.name,
      payload: message.payload,
    };
    onReceiveMessage(messageToComponent, componentConfig._state, componentConfig, componentConfig);
  }

  getScope(scopeId: string) {
    return this.#scopeMapById.get(scopeId);
  }
}
