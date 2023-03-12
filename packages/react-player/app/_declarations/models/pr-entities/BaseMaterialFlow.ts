import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseMaterialFlow',
  name: '物料工艺流程',
  fields: [
    {
      code: 'material',
      name: '物料',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterial',
    },
    {
      code: 'version',
      name: '版本',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'state',
      name: '状态',
      fieldType: 'option',
      dictionaryCode: 'EnabledDisabledState',
      required: true,
      defaultValue: "'draft'",
    },
    {
      code: 'publishState',
      name: '发布状态',
      fieldType: 'option',
      dictionaryCode: 'PublishState',
      required: true,
      defaultValue: "'draft'",
    },
    {
      code: 'processes',
      name: '物料生产工序',
      fieldType: 'relation[]',
      referenceEntityCode: 'BaseMaterialFlowProcess',
    },
  ],
} as PrEntity;
