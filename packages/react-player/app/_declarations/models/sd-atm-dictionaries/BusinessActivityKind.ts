import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import BusinessActivityKind from '../pr-dictionaries/BusinessActivityKind';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(BusinessActivityKind);
export default dictionary;
