import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import PublishState from '../pr-dictionaries/PublishState';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(PublishState);
export default dictionary;
