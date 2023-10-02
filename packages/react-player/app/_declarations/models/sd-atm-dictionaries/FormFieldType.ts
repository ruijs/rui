import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import FormFieldType from '../pr-dictionaries/FormFieldType';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(FormFieldType);
export default dictionary;
