import { pick, map, defaultTo, find, snakeCase } from 'lodash';
import pluralize from 'pluralize';
import type { PrEntity, PrField, PrFieldType } from '~/types/pr-types';
import type {
  SdAtmEntity,
  SdAtmEntityOriginal,
  SdAtmField,
  SdAtmFieldOriginal,
  SdAtmFieldType,
} from '~/types/sd-autumn-types';

export function convertPrFieldTypeToSdAtmFieldType(sourceType: PrFieldType): SdAtmFieldType {
  if (sourceType === 'string') {
    return 'text';
  } else if (sourceType === 'bool') {
    return 'bool';
  } else if (sourceType === 'integer' || sourceType === 'long') {
    return 'integer';
  } else if (sourceType === 'object') {
    return 'json';
  } else if (sourceType === 'relation' || sourceType === 'relation[]') {
    return 'relation';
  }

  return sourceType as SdAtmFieldType;
}

export function getSdAtmFieldRelation(fieldType: PrFieldType): SdAtmField['relation'] {
  if (fieldType === 'relation') {
    return 'one';
  } else if (fieldType === 'relation[]') {
    return 'many';
  }
}

/**
 * 将产品需求字段配置转换成系统设计字段配置。
 * @param sourceField 产品需求字段
 * @param sdAtmFieldOriginal 系统设计特有的配置
 * @returns 系统设计字段
 * @description
 * 转换过程中会应用以下自动配置规则：
 * - 默认读取产品需求配置中的`code`，`name`，`description`，`fieldType`，`required`，`dictionaryCode`信息作为系统设计实体中对应的配置信息。
 * - 当没有为非关系型字段指定`columnName`时，将系统设计实体的`columnName`自动配置为产品需求实体的`code`的snake_case形式。
 * - 自动设置`relation`为`one`或`many`。
 * - 将`required`默认设置为`false`。
 * - 将`hiddenInAuditLog`默认设置为`false`。
 * - 将`hiddenInEventData`默认设置为`false`。
 *
 */
export function convertToSdAtmField(
  sourceField: PrField,
  sdAtmFieldOriginal?: SdAtmFieldOriginal<any, any, any, any>,
): SdAtmField {
  const columnName =
    sourceField.fieldType === 'relation' || sourceField.fieldType === 'relation[]'
      ? null // 关系属性不应该设置`columnName`
      : sdAtmFieldOriginal?.columnName || snakeCase(sourceField.code);
  const targetSingularCode = sdAtmFieldOriginal?.targetSingularCode;

  let field: SdAtmField = {
    code: sourceField.code,
    name: sourceField.name,
    description: sourceField.description,
    type: convertPrFieldTypeToSdAtmFieldType(sourceField.fieldType),
    required: defaultTo(sourceField.required, false),
    dataDictionaryCode: sourceField.dictionaryCode,

    columnName,
    defaultValue: sdAtmFieldOriginal?.defaultValue,
    relation: getSdAtmFieldRelation(sourceField.fieldType),
    targetSingularCode,
    linkTableName: sdAtmFieldOriginal?.linkTableName,
    targetIdColumnName: sdAtmFieldOriginal?.targetIdColumnName,
    selfIdColumnName: sdAtmFieldOriginal?.selfIdColumnName,

    minLength: sdAtmFieldOriginal?.minLength,
    maxLength: sdAtmFieldOriginal?.maxLength,

    hiddenInAuditLog: defaultTo(sdAtmFieldOriginal?.hiddenInAuditLog, false),
    hiddenInEventData: defaultTo(sdAtmFieldOriginal?.hiddenInEventData, false),
  };
  return field;
}

/**
 * 将产品需求实体配置转换成系统设计实体配置。
 * @param sourceEntity 产品需求实体
 * @param sdAtmEntityOriginal 系统设计特有的配置
 * @returns 系统设计实体配置
 * @description
 * 通过读取产品需求实体中的配置，整合系统设计特有的配置信息，生成最终的系统设计实体配置。
 * 转换过程中会应用以下自动配置规则：
 * - 默认读取产品需求配置中的`code`，`name`和`description`信息作为系统设计实体中对应的配置信息
 * - 当没有指定`singularCode`时，将系统设计实体的`singularCode`自动配置为产品需求实体的`code`的snake_case形式。
 * - 当没有指定`pluralCode`时，将系统设计实体的`pluralCode`自动配置为产品需求实体的`singularCode`的复数形式。
 * - 当没有指定`tableName`时，将系统设计实体的`tableName`自动配置为产品需求实体的`pluralCode`。
 * - 当没有指定`multiTenant`时，将系统设计实体的`multiTenant`自动配置为`true`。
 * - 当没有指定`auditLogEnabled`时，将系统设计实体的`auditLogEnabled`自动配置为`false`。
 * - 当没有指定`entityEventEnabled`时，将系统设计实体的`entityEventEnabled`自动配置为`false`。
 */
export function convertToSdAtmEntity(
  sourceEntity: PrEntity,
  sdAtmEntityOriginal: SdAtmEntityOriginal<any, any, any, any>,
): SdAtmEntity {
  const singularCode = sdAtmEntityOriginal.singularCode || snakeCase(sourceEntity.code);
  const pluralCode = sdAtmEntityOriginal.pluralCode || pluralize(singularCode);
  const tableName = sdAtmEntityOriginal.tableName || pluralCode;
  let entity: SdAtmEntity = {
    ...(pick(sourceEntity, ['code', 'name', 'description']) as any),

    namespace: sdAtmEntityOriginal.namespace,
    singularCode,
    pluralCode,
    dbSchema: sdAtmEntityOriginal.dbSchema,
    tableName,
    multiTenant: defaultTo(sdAtmEntityOriginal.multiTenant, true),
    auditLogEnabled: defaultTo(sdAtmEntityOriginal.auditLogEnabled, false),
    entityEventEnabled: defaultTo(sdAtmEntityOriginal.entityEventEnabled, false),

    fields: map(sourceEntity.fields, sourceField => {
      return convertToSdAtmField(
        sourceField,
        find(sdAtmEntityOriginal.fields, item => item.code === sourceField.code),
      );
    }),
  };

  return entity;
}
