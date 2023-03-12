import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import UndeletedDeletedState from '../pr-dictionaries/UndeletedDeletedState';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(UndeletedDeletedState);
export default dictionary;
