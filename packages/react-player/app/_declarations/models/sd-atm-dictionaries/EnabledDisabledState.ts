import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import EnabledDisabledState from '../pr-dictionaries/EnabledDisabledState';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(EnabledDisabledState);
export default dictionary;
