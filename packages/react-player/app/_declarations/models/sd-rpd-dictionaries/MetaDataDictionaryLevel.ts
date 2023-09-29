import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import MetaDataDictionaryLevel from '../pr-dictionaries/MetaDataDictionaryLevel';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(MetaDataDictionaryLevel, {
});
export default dictionary;
