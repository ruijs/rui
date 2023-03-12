import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import ApprovalState from '../pr-dictionaries/ApprovalState';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(ApprovalState);
export default dictionary;
