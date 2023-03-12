import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import EquipmentProductionState from '../pr-dictionaries/EquipmentProductionState';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(EquipmentProductionState, {
});
export default dictionary;
