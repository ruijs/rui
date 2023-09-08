import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import BusinessActivityState from '../pr-dictionaries/BusinessActivityState';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(BusinessActivityState, {
});
export default dictionary;
