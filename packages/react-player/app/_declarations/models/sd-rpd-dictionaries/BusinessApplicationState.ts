import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import BusinessApplicationState from '../pr-dictionaries/BusinessApplicationState';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(BusinessApplicationState, {
});
export default dictionary;
