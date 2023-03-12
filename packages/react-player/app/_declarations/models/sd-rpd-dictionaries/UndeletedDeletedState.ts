import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import UndeletedDeletedState from '../pr-dictionaries/UndeletedDeletedState';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(UndeletedDeletedState, {
});
export default dictionary;
