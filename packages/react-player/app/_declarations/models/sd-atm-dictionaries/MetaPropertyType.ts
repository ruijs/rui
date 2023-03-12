import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import MetaPropertyType from '../pr-dictionaries/MetaPropertyType';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(MetaPropertyType);
export default dictionary;
