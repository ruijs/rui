import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import DocumentType from '../pr-dictionaries/DocumentType';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(DocumentType);
export default dictionary;
