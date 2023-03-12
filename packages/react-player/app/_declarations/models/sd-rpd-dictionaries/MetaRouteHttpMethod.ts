import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import MetaRouteHttpMethod from '../pr-dictionaries/MetaRouteHttpMethod';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(MetaRouteHttpMethod, {
});
export default dictionary;
