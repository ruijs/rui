import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import EmployeeState from '../pr-dictionaries/EmployeeState';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(EmployeeState, {
});
export default dictionary;
