import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import UnitType from '../pr-dictionaries/UnitType';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(UnitType);
export default dictionary;
