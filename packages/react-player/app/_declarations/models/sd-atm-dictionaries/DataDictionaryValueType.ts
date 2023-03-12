import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import DataDictionaryValueType from '../pr-dictionaries/DataDictionaryValueType';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(DataDictionaryValueType);
export default dictionary;
