import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import UserSecretLevel from '../pr-dictionaries/UserSecretLevel';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(UserSecretLevel, {
});
export default dictionary;
