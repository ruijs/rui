import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import BusinessActivityKind from '../pr-dictionaries/BusinessActivityKind';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(BusinessActivityKind, {
});
export default dictionary;
