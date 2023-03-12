import { pick, map, defaultTo, find, snakeCase } from 'lodash';
import pluralize from 'pluralize';
import type { PrEntity, PrField, PrFieldType } from '~/types/pr-types';
import type {
  SdRpdEntity,
  SdRpdEntityOriginal,
  SdRpdField,
  SdRpdFieldOriginal,
  SdRpdFieldType,
} from '~/types/sd-rapid-types';

export function convertPrFieldTypeToSdRpdFieldType(sourceType: PrFieldType): SdRpdFieldType {
  if (sourceType === 'string') {
    return 'text';
  } else if (sourceType === 'bool') {
    return 'boolean';
  } else if (sourceType === 'object') {
    return 'json';
  } else if (sourceType === 'relation' || sourceType === 'relation[]') {
    return 'relation';
  }

  return sourceType as SdRpdFieldType;
}

export function getSdRpdFieldRelation(fieldType: PrFieldType): SdRpdField['relation'] {
  if (fieldType === 'relation') {
    return 'one';
  } else if (fieldType === 'relation[]') {
    return 'many';
  }
}

/**
 * 将产品需求字段配置转换成系统设计字段配置。
 * @param sourceField 产品需求字段
 * @param sdRpdFieldOriginal 系统设计特有的配置
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
export function convertToSdRpdField(
  sourceField: PrField,
  sdRpdFieldOriginal?: SdRpdFieldOriginal<any, any, any, any>,
): SdRpdField {
  const columnName =
    sourceField.fieldType === 'relation' || sourceField.fieldType === 'relation[]'
      ? null // 关系属性不应该设置`columnName`
      : sdRpdFieldOriginal?.columnName || snakeCase(sourceField.code);
  const targetSingularCode = sdRpdFieldOriginal?.targetSingularCode;

  let field: SdRpdField = {
    code: sourceField.code,
    name: sourceField.name,
    description: sourceField.description,
    type: convertPrFieldTypeToSdRpdFieldType(sourceField.fieldType),
    required: defaultTo(sourceField.required, false),
    dataDictionary: sourceField.dictionaryCode,

    columnName,
    defaultValue: defaultTo(sdRpdFieldOriginal?.defaultValue, sourceField.defaultValue),
    config: sdRpdFieldOriginal?.config,
    relation: getSdRpdFieldRelation(sourceField.fieldType),
    targetSingularCode,
    linkTableName: sdRpdFieldOriginal?.linkTableName,
    linkDbSchema: sdRpdFieldOriginal?.linkDbSchema,
    targetIdColumnName: sdRpdFieldOriginal?.targetIdColumnName,
    selfIdColumnName: sdRpdFieldOriginal?.selfIdColumnName,

    minLength: sdRpdFieldOriginal?.minLength,
    maxLength: sdRpdFieldOriginal?.maxLength,
  };
  return field;
}

/**
 * 将产品需求实体配置转换成系统设计实体配置。
 * @param sourceEntity 产品需求实体
 * @param sdRpdEntityOriginal 系统设计特有的配置
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
export function convertToSdRpdEntity(
  sourceEntity: PrEntity,
  sdRpdEntityOriginal: SdRpdEntityOriginal<any, any, any, any>,
): SdRpdEntity {
  const singularCode = sdRpdEntityOriginal.singularCode || snakeCase(sourceEntity.code);
  const pluralCode = sdRpdEntityOriginal.pluralCode || pluralize(singularCode);
  const tableName = sdRpdEntityOriginal.tableName || pluralCode;
  let entity: SdRpdEntity = {
    ...(pick(sourceEntity, ['code', 'name', 'description']) as any),

    namespace: sdRpdEntityOriginal.namespace,
    singularCode,
    pluralCode,
    dbSchema: sdRpdEntityOriginal.dbSchema,
    tableName,

    fields: mapPrFieldsToSdRpdFields(sourceEntity, sdRpdEntityOriginal),
  };

  return entity;
}

function mapPrFieldsToSdRpdFields(sourceEntity: PrEntity, sdRpdEntityOriginal: SdRpdEntityOriginal<any, any, any, any>) {
  let idFields: SdRpdField[] = [
    {
      name: 'id',
      code: 'id',
      type: 'integer',
      required: true,
      autoIncrement: true,
    },
  ];

  let auditFields: SdRpdField[] = [
    {
      name: '创建时间',
      code: 'createdAt',
      columnName: 'created_at',
      type: 'datetime',
      required: false,
      defaultValue: "now()",
    },
    {
      name: '创建人',
      code: 'createdBy',
      type: 'relation',
      relation: 'one',
      targetSingularCode: 'oc_user',
      targetIdColumnName: 'creator_id',
      required: false,
    },
    {
      name: '更新时间',
      code: 'updatedAt',
      columnName: 'updated_at',
      type: 'datetime',
      required: false,
    },
    {
      name: '更新人',
      code: 'updatedBy',
      type: 'relation',
      relation: 'one',
      targetSingularCode: 'oc_user',
      targetIdColumnName: 'updater_id',
      required: false,
    },
    {
      name: '删除时间',
      code: 'deletedAt',
      columnName: 'deteted_at',
      type: 'datetime',
      required: false,
    },
    {
      name: '删除人',
      code: 'detetedBy',
      type: 'relation',
      relation: 'one',
      targetSingularCode: 'oc_user',
      targetIdColumnName: 'deleter_id',
      required: false,
    },
  ];

  const userDefinedFields = map(sourceEntity.fields, sourceField => {
    return convertToSdRpdField(
      sourceField,
      find(sdRpdEntityOriginal.fields, item => item.code === sourceField.code),
    );
  });

  return [
    ...idFields,
    ...userDefinedFields,
    ...auditFields,
  ];
}
