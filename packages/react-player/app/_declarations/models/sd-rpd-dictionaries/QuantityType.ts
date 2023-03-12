import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import QuantityType from '../pr-dictionaries/QuantityType';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(QuantityType, {
});
export default dictionary;
