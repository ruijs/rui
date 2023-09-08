import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import BusinessActivityState from '../pr-dictionaries/BusinessActivityState';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(BusinessActivityState);
export default dictionary;
