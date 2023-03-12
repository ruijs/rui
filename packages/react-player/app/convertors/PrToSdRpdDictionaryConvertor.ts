import type { PrDictionary, PrDictionaryItem } from '~/types/pr-types';
import type { SdRpdDataDictionary, SdRpdDataDictionaryEntry, SdRpdDataDictionaryOriginal } from '~/types/sd-rapid-types';
import { map } from 'lodash';

export function convertToSdRpdDataDictionaryEntry(source: PrDictionaryItem) {
  let result: SdRpdDataDictionaryEntry = {
    name: source.name,
    value: source.value.toString(),
    color: source.color,
    icon: source.icon,
    description: source.description,
  };
  return result;
}

export function convertToSdRpdDataDictionary(source: PrDictionary, original: SdRpdDataDictionaryOriginal): SdRpdDataDictionary {
  let result: SdRpdDataDictionary = {
    metaOnly: original.metaOnly,
    code: source.code,
    name: source.name,
    description: source.description,
    valueType: source.valueType,
    entries: map(source.items, convertToSdRpdDataDictionaryEntry),
  };

  return result;
}
