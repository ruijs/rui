import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import ApprovalState from '../pr-dictionaries/ApprovalState';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(ApprovalState, {
});
export default dictionary;
