import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import MetaPropertyType from '../pr-dictionaries/MetaPropertyType';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(MetaPropertyType, {
});
export default dictionary;
