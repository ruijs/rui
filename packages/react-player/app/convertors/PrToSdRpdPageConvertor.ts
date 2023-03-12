import { find, pick } from "lodash";
import type { BlockDataListAction, BlockDataListTableColumn, BlockDataRecordAction } from "~/types/block-entity-list-types";
import type { BlockSearchForm, BlockSearchFormItem } from "~/types/block-search-form-types";
import type { BlockPageToolbar } from "~/types/block-toolbar-types";
import type { PrDetails, PrDetailsPage, PrForm, BlockDataFormItem, PrFormPage, PrTable, PrTablePage } from "~/types/pr-types";
import type { SdRpdDataForm, SdRpdDataFormItem, SdRpdDataFormItemOriginal, SdRpdDataFormOriginal, SdRpdDetails, SdRpdDetailsItem, SdRpdDetailsItemOriginal, SdRpdDetailsOriginal, SdRpdDetailsPage, SdRpdDetailsPageOriginal, SdRpdFormPage, SdRpdFormPageOriginal, SdRpdPageSearchFormItemOriginal, SdRpdPageSearchFormOriginal, SdRpdPageTableActionOriginal, SdRpdPageTableColumnOriginal, SdRpdPageTableOriginal, SdRpdPageToolbarItemOriginal, SdRpdPageToolbarOriginal, SdRpdSearchForm, SdRpdSearchFormItem, SdRpdTable, SdRpdTablePage, SdRpdTablePageOriginal } from "~/types/sd-rapid-page-types";


function convertToSdRpdSearchFormItems(sourceItems: BlockSearchFormItem[], sdRpdOriginalItems: SdRpdPageSearchFormItemOriginal[]) : BlockSearchFormItem[] | null {
  if (!sourceItems) {
    return null;
  }

  if (!sdRpdOriginalItems) {
    return sourceItems as SdRpdSearchFormItem[];
  }

  const resultItems: SdRpdSearchFormItem[] = sourceItems.map(sourceItem => {
    const originalItem = find(sdRpdOriginalItems, {code: sourceItem.code});
    if (!originalItem) {
      return sourceItem as SdRpdSearchFormItem;
    }
    return Object.assign({}, sourceItem, originalItem) as SdRpdSearchFormItem;
  });

  return resultItems;
}

function convertToSdRpdSearchForm(source: BlockSearchForm  | undefined, original: SdRpdPageSearchFormOriginal | undefined) : BlockSearchForm  | null {
  if (!source) {
    return null;
  }

  if (!original) {
    return source as BlockSearchForm ;
  }

  return {
    entityCode: source.entityCode,
    items: convertToSdRpdSearchFormItems(source.items, original.items) || [],
  }
}

function convertToSdRpdToolbarItems(sourceItems: BlockDataListAction<any>[], sdRpdOriginalItems: SdRpdPageToolbarItemOriginal[]) : BlockDataListAction<any>[] | null {
  if (!sourceItems) {
    return null;
  }

  if (!sdRpdOriginalItems) {
    return sourceItems as BlockDataListAction<any>[];
  }

  const resultItems: BlockDataListAction<any>[] = sourceItems.map(sourceItem => {
    const originalItem = find(sdRpdOriginalItems, {code: sourceItem.code});
    if (!originalItem) {
      return sourceItem as BlockDataListAction<any>;
    }
    return Object.assign({}, sourceItem, originalItem) as BlockDataListAction<any>;
  });

  return resultItems;
}

function convertToSdRpdToolbar(source: BlockPageToolbar<any> | undefined, original: SdRpdPageToolbarOriginal | undefined) : BlockPageToolbar<any> | null {
  if (!source) {
    return null;
  }

  if (!original) {
    return source as BlockPageToolbar<any>;
  }

  return {
    items: convertToSdRpdToolbarItems(source.items, original.items) || [],
  }
}

function convertToSdRpdTableColumns(sourceItems: BlockDataListTableColumn[], sdRpdOriginalItems: SdRpdPageTableColumnOriginal[] | undefined) : BlockDataListTableColumn[] | null {
  if (!sourceItems) {
    return null;
  }

  if (!sdRpdOriginalItems) {
    return sourceItems as BlockDataListTableColumn[];
  }

  const resultItems: BlockDataListTableColumn[] = sourceItems.map(sourceItem => {
    const originalItem = find(sdRpdOriginalItems, {code: sourceItem.code});
    if (!originalItem) {
      return sourceItem as BlockDataListTableColumn;
    }
    return Object.assign({}, sourceItem, originalItem) as BlockDataListTableColumn;
  });

  return resultItems;
}

function convertToSdRpdTableActions(sourceItems: BlockDataRecordAction<any>[] | undefined, sdRpdOriginalItems: SdRpdPageTableActionOriginal[] | undefined) : BlockDataRecordAction<any>[] | undefined {
  if (!sourceItems) {
    return undefined;
  }

  if (!sdRpdOriginalItems) {
    return sourceItems as BlockDataRecordAction<any>[];
  }

  const resultItems: BlockDataRecordAction<any>[] = sourceItems.map(sourceItem => {
    const originalItem = find(sdRpdOriginalItems, {code: sourceItem.code});
    if (!originalItem) {
      return sourceItem as BlockDataRecordAction<any>;
    }
    return Object.assign({}, sourceItem, originalItem) as BlockDataRecordAction<any>;
  });

  return resultItems;
}

function convertToSdRpdTable(source: PrTable, original: SdRpdPageTableOriginal | undefined) : SdRpdTable | null {
  if (!source) {
    return null;
  }

  if (!original) {
    return source as SdRpdTable;
  }

  return {
    entityCode: source.entityCode,
    listActions: source.listActions,
    columns: convertToSdRpdTableColumns(source.columns, original.columns) || [],
    actions: convertToSdRpdTableActions(source.actions, original.actions),
  }
}

function convertToSdRpdDataFormItems(sourceItems: BlockDataFormItem[], sdRpdOriginalItems: SdRpdDataFormItemOriginal[] | undefined) : SdRpdDataFormItem[] | null {
  if (!sourceItems) {
    return null;
  }

  if (!sdRpdOriginalItems) {
    return sourceItems as SdRpdDataFormItem[];
  }

  const resultItems: SdRpdDataFormItem[] = sourceItems.map(sourceItem => {
    const originalItem = find(sdRpdOriginalItems, {code: sourceItem.code});
    if (!originalItem) {
      return sourceItem as SdRpdDataFormItem;
    }
    return Object.assign({}, sourceItem, originalItem) as SdRpdDataFormItem;
  });

  return resultItems;
}

function convertToSdRpdDataForm(source: PrForm, original: SdRpdDataFormOriginal | undefined) : SdRpdDataForm | null {
  if (!source) {
    return null;
  }

  if (!original) {
    return source as SdRpdDataForm;
  }

  return {
    ...source,
    items: convertToSdRpdDataFormItems(source.items, original.items) || [],
  }
}

export function convertToSdRpdTablePage(sourcePage: PrTablePage, sdRpdOriginal: SdRpdTablePageOriginal): SdRpdTablePage {
  const sdPage: SdRpdTablePage = {
    ...pick(sourcePage, ['code', 'name', 'title', 'templateType', 'blocks', 'view', 'eventSubscriptions']),
    searchForm: convertToSdRpdSearchForm(sourcePage.searchForm, sdRpdOriginal.searchForm),
    toolbar: convertToSdRpdToolbar(sourcePage.toolbar, sdRpdOriginal.toolbar),
    table: convertToSdRpdTable(sourcePage.table, sdRpdOriginal.table)!,
  }
  return sdPage;
}


export function convertToSdRpdFormPage(sourcePage: PrFormPage, sdRpdOriginal: SdRpdFormPageOriginal): SdRpdFormPage {
  const sdPage: SdRpdFormPage = {
    ...pick(sourcePage, ['code', 'name', 'title', 'templateType', 'blocks', 'view', 'eventSubscriptions']),
    form: convertToSdRpdDataForm(sourcePage.form, sdRpdOriginal.form)!,
  }
  return sdPage;
}

function convertToSdRpdDetailsItems(sourceItems: BlockDataFormItem[], sdRpdOriginalItems: SdRpdDetailsItemOriginal[] | undefined) : SdRpdDetailsItem[] | null {
  if (!sourceItems) {
    return null;
  }

  if (!sdRpdOriginalItems) {
    return sourceItems as SdRpdDetailsItem[];
  }

  const resultItems: SdRpdDetailsItem[] = sourceItems.map(sourceItem => {
    const originalItem = find(sdRpdOriginalItems, {code: sourceItem.code});
    if (!originalItem) {
      return sourceItem as SdRpdDetailsItem;
    }
    return Object.assign({}, sourceItem, originalItem) as SdRpdDetailsItem;
  });

  return resultItems;
}

function convertToSdRpdDetails(source: PrDetails, original: SdRpdDetailsOriginal | undefined) : SdRpdDetails | null {
  if (!source) {
    return null;
  }

  if (!original) {
    return source as SdRpdDetails;
  }

  return {
    ...source,
    items: convertToSdRpdDetailsItems(source.items, original.items) || [],
  }
}

export function convertToSdRpdDetailsPage(sourcePage: PrDetailsPage, sdRpdOriginal: SdRpdDetailsPageOriginal): SdRpdDetailsPage {
  const sdPage: SdRpdDetailsPage = {
    ...pick(sourcePage, ['code', 'name', 'title', 'templateType', 'blocks', 'view', 'eventSubscriptions']),
    details: convertToSdRpdDetails(sourcePage.details, sdRpdOriginal.details)!,
  }
  return sdPage;
}