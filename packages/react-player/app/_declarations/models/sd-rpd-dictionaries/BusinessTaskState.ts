import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import BusinessTaskState from '../pr-dictionaries/BusinessTaskState';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(BusinessTaskState, {
});
export default dictionary;
