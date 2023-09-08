import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import BusinessTaskState from '../pr-dictionaries/BusinessTaskState';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(BusinessTaskState);
export default dictionary;
