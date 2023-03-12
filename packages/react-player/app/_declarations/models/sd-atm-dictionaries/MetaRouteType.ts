import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import MetaRouteType from '../pr-dictionaries/MetaRouteType';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(MetaRouteType);
export default dictionary;
