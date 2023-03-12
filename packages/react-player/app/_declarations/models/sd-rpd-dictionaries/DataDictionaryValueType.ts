import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import DataDictionaryValueType from '../pr-dictionaries/DataDictionaryValueType';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(DataDictionaryValueType, {
  metaOnly: true,
});
export default dictionary;
