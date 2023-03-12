import { EventEmitter, Framework, IStore, Page, PageCommand, PageConfig, RockConfig, StoreConfigBase } from "@ruijs/move-style";
import _ from "lodash";

export interface DesignerStoreConfig extends StoreConfigBase {
  pageConfig?: PageConfig;
}

export default class DesignerStore implements IStore<DesignerStoreConfig> {
  #emitter: EventEmitter;
  #name: string;
  #page: Page;
  #selectedComponentTreeNodeId: string;
  #selectedComponentId: string;
  #selectedSlotName: string;
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
    console.debug(`[RUI][DesignerStore][${storeConfig.name}] DesignerStore.setConfig()`)
    this.#name = storeConfig.name;
    if (storeConfig.pageConfig) {
      this.setPageConfig(storeConfig.pageConfig);
    }
  }

  setPageConfig(value: PageConfig) {
    this.#page.setConfig(value);
    this.#emitter.emit("dataChange", null);
  }

  setPropertyExpression(propName: string, propExpression: string) {
  }

  async loadData(input?: any): Promise<any> {
    return this.#page.loadData();
  }

  observe(callback: (data: any) => void) {
    this.#emitter.on("dataChange", callback);
  }

  get data() {
    return this.pageConfig;
  }

  get pageConfig(): PageConfig {
    return this.#page?.getConfig();
  }

  get page(): Page {
    return this.#page;
  }

  get selectedComponentTreeNodeId(): string {
    return this.#selectedComponentTreeNodeId;
  }

  get selectedComponentId(): string {
    return this.#selectedComponentId;
  }
  
  get selectedSlotName(): string {
    return this.#selectedSlotName;
  }

  setSelectedComponentTreeNode(nodeId: string, componentId: string, slotName: string) {
    this.#selectedComponentTreeNodeId = nodeId;
    this.#selectedComponentId = componentId;
    this.#selectedSlotName = slotName;
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
      const { componentType, parentComponentId, slotName, prevSiblingComponentId, defaultProps} = payload;
      const componentConfig: RockConfig = {
        $type: componentType,
        ...defaultProps,
      };

      // TODO: implement this: Generate id before add to page, so that we can support collaboration design.
      // if (!componentConfig.$id) {
      //   throw new Error("Component id MUST be set before added to page.");
      // }
      this.#page.addComponents([componentConfig], parentComponentId, slotName, prevSiblingComponentId);

    } else if (command.name === "removeComponents") {
      this.#page.removeComponents(command.payload.componentIds);
      this.setSelectedComponentTreeNode(null, null, null);

    } else if (command.name === "cutComponents") {
      const componentIds = command.payload.componentIds;
      if (!componentIds || !componentIds.length) {
        return;
      }
      this.#snippets = _.map(componentIds, componentId => this.#page.getComponent(componentId));
      this.#page.removeComponents(componentIds);
      this.setSelectedComponentTreeNode(null, null, null);

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
      const { parentComponentId, slotName, prevSiblingComponentId } = payload;

      this.#page.addComponents(this.#snippets, parentComponentId, slotName, prevSiblingComponentId);
    }
  }
}