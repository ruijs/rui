import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import QuantityType from '../pr-dictionaries/QuantityType';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(QuantityType);
export default dictionary;
