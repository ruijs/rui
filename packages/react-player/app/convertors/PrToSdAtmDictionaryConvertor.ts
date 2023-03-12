import type { PrDictionary, PrDictionaryItem } from '~/types/pr-types';
import type { SdAtmDictionary, SdAtmDictionaryItem } from '~/types/sd-autumn-types';
import { map } from 'lodash';

export function convertToSdAtmDictionaryItem(source: PrDictionaryItem) {
  let result: SdAtmDictionaryItem = {
    name: source.name,
    value: source.value.toString(),
    description: source.description,
  };
  return result;
}

export function convertToSdAtmDictionary(source: PrDictionary): SdAtmDictionary {
  let result: SdAtmDictionary = {
    code: source.code,
    description: source.name,
    type: source.valueType,
    items: map(source.items, convertToSdAtmDictionaryItem),
  };
  return result;
}
