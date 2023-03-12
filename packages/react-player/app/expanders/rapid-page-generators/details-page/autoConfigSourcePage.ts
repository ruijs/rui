import type {
  SdRpdEntity,
  SdRpdDetailsPage,
  SdRpdMeta,
} from '~/proton';
import { find } from 'lodash';

/**
 * 自动配置数据详情。
 * @description
 * 配置过程中主要进行以下处理：
 * - 根据字段的类型选择合适的详情项类型
 * - 自动使用字段名称作为详情项的标签
 * - 自动根据详情项对应字段的类型配置引用实体或者数据字典的数据源设置
 * @param page 页面
 * @param entity 页面表单的主实体
 * @param meta 应用配置
 * @returns void
 */
function configDetails(page: SdRpdDetailsPage, entity: SdRpdEntity, meta: SdRpdMeta) {
  const details = page.details;
  if (!details) {
    return;
  }

  const { dataSources = [] } = page;

  // 自动配置`mode`为`edit`的表单的数据源设置
  if (!details.dataSourceCode) {
    const detailsDataSourceCode = `${details.entityCode}Detail`;
    const detailsDataSource = find(dataSources, { code: detailsDataSourceCode });
    if (!detailsDataSource) {
      dataSources.push({
        dataSourceType: 'entityDetail',
        code: detailsDataSourceCode,
        entityCode: details.entityCode,
      });
    }
  }

  for (const detailsItem of details.items) {
    if (detailsItem.type === 'auto') {
      const field = find(entity.fields, { code: detailsItem.code });
      if (!field) {
        continue;
      }

      // 使用字段名称作为表单项的标签
      if (!detailsItem.label) {
        detailsItem.label = field?.name;
      }
    }
  }

  if (!page.dataSources) {
    page.dataSources = dataSources;
  }
}

export function autoConfigSourcePage(page: SdRpdDetailsPage, meta: SdRpdMeta) {
  if (!page.details) {
    return page;
  }

  const entity = find(meta.entities, { code: page.details.entityCode });
  if (!entity) {
    return page;
  }

  configDetails(page, entity, meta);

  return page;
}
