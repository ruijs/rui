import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import DataSecretLevel from '../pr-dictionaries/DataSecretLevel';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(DataSecretLevel, {
});
export default dictionary;
