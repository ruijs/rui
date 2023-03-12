import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import UnitType from '../pr-dictionaries/UnitType';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(UnitType, {
});
export default dictionary;
