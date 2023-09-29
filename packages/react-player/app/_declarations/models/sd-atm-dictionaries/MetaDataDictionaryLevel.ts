import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import MetaDataDictionaryLevel from '../pr-dictionaries/MetaDataDictionaryLevel';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(MetaDataDictionaryLevel);
export default dictionary;
