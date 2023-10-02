import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import FormFieldType from '../pr-dictionaries/FormFieldType';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(FormFieldType, {
});
export default dictionary;
