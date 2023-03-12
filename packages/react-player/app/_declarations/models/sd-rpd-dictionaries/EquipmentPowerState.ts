import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import EquipmentPowerState from '../pr-dictionaries/EquipmentPowerState';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(EquipmentPowerState, {
});
export default dictionary;
