import type { SdAtmDictionary, SdAtmDictionaryItem, SdAtmEntity, SdAtmField } from '~/types/sd-autumn-types';

export type IAutumnModelUpdater<TEntity, TInput, TMainEntity = any> =
  | IAutumnModelUpdaterBatchGetMode<TEntity, TInput, TMainEntity>
  | IAutumnModelUpdaterSingleGetMode<TEntity, TInput, TMainEntity>;

export interface IAutumnModelUpdaterCommon<TEntity, TInput, TMainEntity> {
  modelType: string;
  inputTitlePrinter: (input: TInput) => string;
  entityExistensePredicate: (input: TInput, entity: TEntity) => boolean;
  isEntityChanged: (inputEntity: TInput, remoteEntity: TEntity) => boolean;
  createEntity: (input: TInput, mainEntity: TMainEntity, inputIndex: number) => Promise<TEntity>;
  updateEntity: (input: TInput, remoteEntity: TEntity, mainEntity: TMainEntity, inputIndex: number) => Promise<TEntity>;
  relationFields?: {
    fieldName: keyof TInput;
    relation: 'one' | 'many';
    modelType: string;
  }[];
}

export interface IAutumnModelUpdaterBatchGetMode<TEntity, TInput, TMainEntity>
  extends IAutumnModelUpdaterCommon<TEntity, TInput, TMainEntity> {
  entityBatchMode: true;
  entityBatchFinder: (mainEntity: TMainEntity) => Promise<TEntity[]>;
}

export interface IAutumnModelUpdaterSingleGetMode<TEntity, TInput, TMainEntity>
  extends IAutumnModelUpdaterCommon<TEntity, TInput, TMainEntity> {
  entityBatchMode: false;
  entitySingleFinder: (entityKey: string) => Promise<TEntity | null>;
  entityKeyGetter: (input: TInput) => string;
}

export type ObjWithIdProp = {
  id: string;
};

export type CreateDataDictionaryInput = Omit<SdAtmDictionary, 'items'>;

export type UpdateDataDictionaryInput = CreateDataDictionaryInput;

export type AutumnDataDictionary = ObjWithIdProp & CreateDataDictionaryInput;

export type CreateDataDictionaryEntryInput = SdAtmDictionaryItem & {
  enabled: boolean;
  position: string;
  dataDictionaryId: string;
};

export type UpdateDataDictionaryEntryInput = CreateDataDictionaryEntryInput;

export type AutumnDataDictionaryEntry = ObjWithIdProp & CreateDataDictionaryEntryInput;

export type CreateAutumnModelInput = Omit<SdAtmEntity, 'code' | 'fields' | 'dbSchema'>;

export type UpdateAutumnModelInput = CreateAutumnModelInput;

export type AutumnModel = ObjWithIdProp & CreateAutumnModelInput;

export type CreateAutumnPropertyInput = SdAtmField & {
  modelId: string;
};

export type UpdateAutumnPropertyInput = CreateAutumnPropertyInput;

export type AutumnProperty = ObjWithIdProp & SdAtmField;
