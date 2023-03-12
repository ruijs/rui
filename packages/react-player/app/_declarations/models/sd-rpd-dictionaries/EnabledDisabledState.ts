import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import EnabledDisabledState from '../pr-dictionaries/EnabledDisabledState';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(EnabledDisabledState, {
});
export default dictionary;
