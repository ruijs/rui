import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import DataSecretLevel from '../pr-dictionaries/DataSecretLevel';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(DataSecretLevel);
export default dictionary;
