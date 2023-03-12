import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import MetaRouteType from '../pr-dictionaries/MetaRouteType';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(MetaRouteType, {
});
export default dictionary;
