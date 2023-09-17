import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'EcmStorageObject',
  name: '存储对象',
  fields: [
    {
      code: 'size',
      name: '大小',
      fieldType: 'integer',
      required: true,
    },
    {
      code: 'key',
      name: '对象唯一键',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'hash',
      name: '哈希值',
      fieldType: 'string',
      required: false,
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>;
