import { EventEmitter, Framework, IStore, Page, PageCommand, PageConfig, RockConfig, StoreConfigBase } from "@ruijs/move-style";
import _ from "lodash";

export interface DesignerStoreConfig extends StoreConfigBase {
  pageConfig?: PageConfig;
}

export default class DesignerStore implements IStore<DesignerStoreConfig> {
  #emitter: EventEmitter;
  #name: string;
  #page: Page;
  #selectedComponentId: string;
  #snippets: RockConfig[];

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
    return this.#page?.getConfig();
  }

  set pageConfig(value: PageConfig) {
    this.#page.setConfig(value);
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

  processCommand(command: PageCommand) {
    if (command.name === "setPageConfig") {
      const { payload } = command;
      this.#page.setConfig(payload.pageConfig);

    } else if (command.name === "setComponentProperty") {
      const { payload } = command;
      this.#page.setComponentProperty(payload.componentId, payload.propName, payload.propValue);

    } else if (command.name === "setComponentPropertyExpression") {
      const { payload } = command;
      this.#page.setComponentPropertyExpression(payload.componentId, payload.propName, payload.propExpression);

    } else if (command.name === "removeComponentPropertyExpression") {
      const { payload } = command;
      this.#page.removeComponentPropertyExpression(payload.componentId, payload.propName);

    } else if (command.name === "addComponent") {
      const { payload } = command;
      const { componentType, parentComponentId, prevSiblingComponentId, defaultProps} = payload;
      const componentConfig: RockConfig = {
        $type: componentType,
        ...defaultProps,
      };
      this.#page.addComponents([componentConfig], parentComponentId, prevSiblingComponentId);

    } else if (command.name === "removeComponents") {
      this.#page.removeComponents(command.payload.componentIds);
      this.selectedComponentId = null;

    } else if (command.name === "cutComponents") {
      const componentIds = command.payload.componentIds;
      if (!componentIds || !componentIds.length) {
        return;
      }
      this.#snippets = _.map(componentIds, componentId => this.#page.getComponent(componentId));
      this.#page.removeComponents(componentIds);
      this.selectedComponentId = null;

    } else if (command.name === "copyComponents") {
      const componentIds = command.payload.componentIds;
      if (!componentIds || !componentIds.length) {
        return;
      }
      this.#snippets = _.map(componentIds, componentId => _.cloneDeep(this.#page.getComponent(componentId)));

    } else if (command.name === "pasteComponents") {
      if (!this.#snippets || !this.#snippets.length) {
        return;
      }

      const { payload } = command;
      const { parentComponentId, prevSiblingComponentId } = payload;

      this.#page.addComponents(this.#snippets, parentComponentId, prevSiblingComponentId);
    }

  }
}