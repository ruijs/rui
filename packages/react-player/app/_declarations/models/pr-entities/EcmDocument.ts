import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'EcmDocument',
  name: '文档',
  fields: [
    {
      code: 'code',
      name: 'Code',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'extName',
      name: '扩展名',
      fieldType: 'string',
      required: false,
    },
    {
      code: 'title',
      name: '标题',
      fieldType: 'string',
      required: false,
    },
    {
      code: 'size',
      name: '大小',
      fieldType: 'integer',
      required: true,
    },
    {
      code: 'lastRevision',
      name: '最新版本',
      fieldType: 'relation',
      referenceEntityCode: 'EcmRevision',
      required: false,
    },
    {
      code: 'storageObject',
      name: '存储对象',
      fieldType: 'relation',
      referenceEntityCode: 'EcmStorageObject',
      required: false,
    },
    {
      code: 'ref',
      name: '链接',
      description: '链接指向的文档',
      fieldType: 'relation',
      referenceEntityCode: 'EcmDocument',
      required: false,
    },
    {
      code: 'parent',
      name: '父文档',
      fieldType: 'relation',
      referenceEntityCode: 'EcmDocument',
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
