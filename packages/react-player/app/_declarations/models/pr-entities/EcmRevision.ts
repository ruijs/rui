import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'EcmRevision',
  name: '文档版本',
  fields: [
    {
      code: 'document',
      name: '文档',
      fieldType: 'relation',
      referenceEntityCode: 'EcmDocument',
      required: true,
    },
    {
      code: 'size',
      name: '大小',
      fieldType: 'integer',
      required: true,
    },
    {
      code: 'storageObject',
      name: '存储对象',
      fieldType: 'relation',
      referenceEntityCode: 'EcmStorageObject',
      required: false,
    },
    {
      code: 'publishState',
      name: '状态',
      fieldType: 'option',
      dictionaryCode: 'PublishState',
      required: true,
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>;
