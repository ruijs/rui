import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'RouteHttpMethod',
  name: 'HTTP方法',
  valueType: 'string',
  items: [
    { name: 'get', value: 'get' },
    { name: 'post', value: 'post' },
    { name: 'put', value: 'put' },
    { name: 'delete', value: 'delete' },
  ],
} as PrDictionary;
