import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import DocumentType from '../pr-dictionaries/DocumentType';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(DocumentType, {
});
export default dictionary;
