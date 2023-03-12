import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import EmployeeState from '../pr-dictionaries/EmployeeState';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(EmployeeState);
export default dictionary;
