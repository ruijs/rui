import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import ActiveInactiveState from '../pr-dictionaries/ActiveInactiveState';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(ActiveInactiveState, {
});
export default dictionary;
