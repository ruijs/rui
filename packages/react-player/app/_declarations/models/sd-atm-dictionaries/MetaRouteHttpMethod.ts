import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import MetaRouteHttpMethod from '../pr-dictionaries/MetaRouteHttpMethod';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(MetaRouteHttpMethod);
export default dictionary;
