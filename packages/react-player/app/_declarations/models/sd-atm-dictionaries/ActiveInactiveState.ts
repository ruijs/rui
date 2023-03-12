import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import ActiveInactiveState from '../pr-dictionaries/ActiveInactiveState';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(ActiveInactiveState);
export default dictionary;
