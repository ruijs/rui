import { RockConfig } from "./rock-types"
import { StoreConfig } from "./store-types";

export type PageConfig = PageWithoutLayoutConfig | PageWithLayoutConfig;

export type PageWithoutLayoutConfig = {
  $id?: string;
  stores?: StoreConfig[];
  view: RockConfig[];
}

export type PageWithLayoutConfig = {
  $id?: string;
  stores?: StoreConfig[];
  layout: string;
  view: RockConfig[];
}

export type PageCommand =
  | PageCommandAddComponent
  | PageCommandRemoveComponents
  | PageCommandSetComponentProperty
  | PageCommandSetSelectedComponents
  | PageCommandCutComponents
  | PageCommandCopyComponents
  | PageCommandPasteComponents
  | PageCommandMoveComponents;


export type PageCommandAddComponent = {
  name: "addComponent";
  payload: {
    componentType: string;
    defaultProps?: any;
    parentComponentId?: string;
    prevSiblingComponentId?: string;
  };
}

export type PageCommandRemoveComponents = {
  name: "removeComponents";
  payload: {
    componentIds: string[];
  };
}

export type PageCommandSetComponentProperty = {
  name: "setComponentProperty";
  payload: {
    componentId: string;
    propName: string;
    propValue: any;
  };
}

export type PageCommandSetSelectedComponents = {
  name: "cutComponents";
  payload: {
    componentIds: string[];
  };
}

export type PageCommandCutComponents = {
  name: "cutComponents";
  payload: {
    componentIds: string[];
  };
}

export type PageCommandCopyComponents = {
  name: "copyComponents";
  payload: {
    componentIds: string[];
  };
}

export type PageCommandPasteComponents = {
  name: "pasteComponents";
  payload: {
    parentComponentId?: string;
    prevSiblingComponentId?: string;
  };
}

export type PageCommandMoveComponents = {
  name: "moveComponents";
  payload: {
    componentIds: string[];
    parentComponentId?: string;
    prevSiblingComponentId?: string;
  };
}