import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import BusinessApplicationState from '../pr-dictionaries/BusinessApplicationState';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(BusinessApplicationState);
export default dictionary;
