import type {
  SdRpdDataDictionary,
  SdRpdEntity,
  SdRpdFieldType,
} from '~/types/sd-rapid-types';
import type {
  SdRpdFormItemType,
  SdRpdFormPage,
  SdRpdPage,
  SdRpdTablePage,
} from '~/types/sd-rapid-page-types';
import { cloneDeep, find } from 'lodash';

const fieldTypeToFormItemTypeMap: Record<SdRpdFieldType, SdRpdFormItemType | null> = {
  text: 'text',
  boolean: 'switch',
  integer: 'number',
  long: 'number',
  float: 'number',
  double: 'number',
  date: 'dateRange',
  time: 'time',
  datetime: 'dateTimeRange',
  datetimetz: 'dateTimeRange',
  option: 'select',
  relation: 'select',
  json: null,
};

export type SdRpdMeta = {
  entities: SdRpdEntity[];
  dictionaries: SdRpdDataDictionary[];
};

function configSearchForm(page: SdRpdTablePage, entity: SdRpdEntity, meta: SdRpdMeta) {
  const form = page.searchForm;

  if (!form) {
    return;
  }

  const { dataSources = [] } = page;

  for (const formItem of form.items) {
    if (formItem.type === 'auto') {
      const field = find(entity.fields, { code: formItem.code });
      if (!field) {
        continue;
      }

      // 使用字段名称作为表单项的标签
      if (!formItem.label) {
        formItem.label = field?.name;
      }

      // 根据字段的类型选择合适的表单项类型
      const type = fieldTypeToFormItemTypeMap[field.type];
      if (type !== null) {
        formItem.type = type;
      }

      // 自动根据表单项对应字段的类型配置引用实体或者数据字典的数据源设置
      if (field.type === 'relation') {
        if (!formItem.dataSource) {
          const referenceEntity = find(meta.entities, {
            singularCode: field.targetSingularCode,
          });
          if (!referenceEntity) {
            throw new Error(
              `Reference entity with code '${field.targetSingularCode}' not found.`,
            );
          }
          const dataSourceCode = `${referenceEntity.code}List`;
          const dataSource = find(dataSources, {
            entityCode: field.targetSingularCode,
            code: dataSourceCode,
          });
          if (!dataSource) {
            dataSources.push({
              dataSourceType: 'entityList',
              code: dataSourceCode,
              entityCode: field.targetSingularCode!,
            });
          }
          formItem.dataSource = dataSourceCode;
        }
      } else if (field.type === 'option') {
        if (!formItem.dataSource) {
          const dictionary = find(meta.dictionaries, {
            code: field.dataDictionary,
          });
          if (!dictionary) {
            throw new Error(
              `Dictionary with code '${field.dataDictionary}' not found.`,
            );
          }
          const dataSourceCode = `${dictionary.code}Dictionary`;
          const dataSource = find(dataSources, {
            entityCode: field.targetSingularCode,
            code: dataSourceCode,
          });
          if (!dataSource) {
            dataSources.push({
              dataSourceType: 'dictionaryDetail',
              code: dataSourceCode,
              dictionaryCode: field.dataDictionary!,
            });
          }
          formItem.dataSource = dataSourceCode;
        }
      }
    }
  }

  if (!page.dataSources) {
    page.dataSources = dataSources;
  }
}

/**
 * 自动配置数据表单。
 * @description
 * 配置过程中主要进行以下处理：
 * - 根据字段的类型选择合适的表单项类型
 * - 自动使用字段名称作为表单项的标签
 * - 使用字段的必填设置作为表单项的必填设置
 * - 自动配置`mode`为`edit`的表单的数据源设置
 * - 自动根据表单项对应字段的类型配置引用实体或者数据字典的数据源设置
 * @param page 页面
 * @param entity 页面表单的主实体
 * @param meta 应用配置
 * @returns void
 */
function configDataForm(page: SdRpdFormPage, entity: SdRpdEntity, meta: SdRpdMeta) {
  const form = page.form;
  if (!form) {
    return;
  }

  const { dataSources = [] } = page;

  // 自动配置`mode`为`edit`的表单的数据源设置
  if (!form.dataSourceCode) {
    const formDataSourceCode = `${form.entityCode}Detail`;
    const formDataSource = find(dataSources, { code: formDataSourceCode });
    if (!formDataSource) {
      dataSources.push({
        dataSourceType: 'entityDetail',
        code: formDataSourceCode,
        entityCode: form.entityCode,
      });
    }
  }

  for (const formItem of form.items) {
    if (formItem.type === 'auto') {
      const field = find(entity.fields, { code: formItem.code });
      if (!field) {
        continue;
      }

      // 使用字段名称作为表单项的标签
      if (!formItem.label) {
        formItem.label = field?.name;
      }

      // 使用字段的必填设置作为表单项的必填设置
      formItem.required = field.required;

      // 根据字段的类型选择合适的表单项类型
      const type = fieldTypeToFormItemTypeMap[field.type];
      if (type !== null) {
        formItem.type = type;
      }

      // 自动根据表单项对应字段的类型配置引用实体或者数据字典的数据源设置
      if (field.type === 'relation') {
        if (!formItem.dataSourceCode) {
          const referenceEntity = find(meta.entities, {
            code: field.targetSingularCode,
          });
          if (!referenceEntity) {
            throw new Error(
              `Reference entity with code '${field.targetSingularCode}' not found.`,
            );
          }
          const dataSourceCode = `${referenceEntity.code}List`;
          const dataSource = find(dataSources, {
            entityCode: field.targetSingularCode,
            code: dataSourceCode,
          });
          if (!dataSource) {
            dataSources.push({
              dataSourceType: 'entityList',
              code: dataSourceCode,
              entityCode: field.targetSingularCode!,
            });
          }
          formItem.dataSourceCode = dataSourceCode;
        }
      } else if (field.type === 'option') {
        if (!formItem.dataSourceCode) {
          const dictionary = find(meta.dictionaries, {
            code: field.dataDictionary,
          });
          if (!dictionary) {
            throw new Error(
              `Dictionary with code '${field.dataDictionary}' not found.`,
            );
          }
          const dataSourceCode = `${dictionary.code}Dictionary`;
          const dataSource = find(dataSources, {
            entityCode: field.targetSingularCode,
            code: dataSourceCode,
          });
          if (!dataSource) {
            dataSources.push({
              dataSourceType: 'dictionaryDetail',
              code: dataSourceCode,
              dictionaryCode: field.dataDictionary!,
            });
          }
          formItem.dataSourceCode = dataSourceCode;
        }
      }
    }
  }

  if (!page.dataSources) {
    page.dataSources = dataSources;
  }
}

function configTable(page: SdRpdTablePage, entity: SdRpdEntity, meta: SdRpdMeta) {
  const { table } = page;

  const { dataSources = [] } = page;

  if (!table.dataSource) {
    const tableDataSourceCode = `${table.entityCode}List`;
    const tableDataSource = find(dataSources, { code: tableDataSourceCode });
    if (!tableDataSource) {
      dataSources.push({
        dataSourceType: 'entityList',
        code: tableDataSourceCode,
        entityCode: table.entityCode,
      });
    }
  }

  const columns = table.columns;
  for (const column of columns) {
    if (column.columnType === 'auto') {
      const field = find(entity.fields, { code: column.code });
      if (!field) {
        throw new Error(`Unknown field code '${column.code}'`);
      }

      column.title = field.name;
      column.rendererType = field.type;

      if (field.type === 'relation') {
        column.renderWithReference = true;
        column.referenceEntityCode = field.targetSingularCode;
        if (!column.referenceDataSource) {
          const dataSourceCode = `${column.referenceEntityCode}List`;
          const dataSource = find(dataSources, { code: dataSourceCode });
          if (!dataSource) {
            dataSources.push({
              dataSourceType: 'entityList',
              code: dataSourceCode,
              entityCode: column.referenceEntityCode!,
            });
          }
          column.referenceDataSource = dataSourceCode;
        }
      } else if (field.type === 'option') {
        column.renderWithReference = true;
        if (!column.referenceDataSource) {
          const dictionary = find(meta.dictionaries, {
            code: field.dataDictionary,
          });
          if (!dictionary) {
            throw new Error(
              `Dictionary with code '${field.dataDictionary}' not found.`,
            );
          }
          const dataSourceCode = `${dictionary.code}Dictionary`;
          const dataSource = find(dataSources, { code: dataSourceCode });
          if (!dataSource) {
            dataSources.push({
              dataSourceType: 'dictionaryDetail',
              code: dataSourceCode,
              dictionaryCode: field.dataDictionary!,
            });
          }
          column.referenceDataSource = dataSourceCode;
        }
      }
    }
  }

  if (!page.dataSources) {
    page.dataSources = dataSources;
  }
}

export function autoConfigSdRpdPage(sourcePage: SdRpdPage, meta: SdRpdMeta) {
  if (!sourcePage) {
    throw new Error("Parameter 'sourcePage' can not be null.");
  }

  const page = cloneDeep(sourcePage);

  if (page.templateType === 'tablePage') {
    const entity = find(meta.entities, { code: page.table.entityCode });
    if (!entity) {
      return page;
    }

    configTable(page, entity, meta);
    if (page.searchForm) {
      configSearchForm(page, entity, meta);
    }
  } else if (page.templateType === 'formPage') {
    const entity = find(meta.entities, { code: page.form.entityCode });
    if (!entity) {
      return page;
    }

    if (page.form) {
      configDataForm(page, entity, meta);
    }
  }

  return page;
}
