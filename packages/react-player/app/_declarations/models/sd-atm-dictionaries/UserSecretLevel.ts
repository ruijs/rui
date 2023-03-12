import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import UserSecretLevel from '../pr-dictionaries/UserSecretLevel';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(UserSecretLevel);
export default dictionary;
