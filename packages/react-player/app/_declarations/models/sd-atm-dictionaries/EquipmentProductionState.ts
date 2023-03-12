import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import EquipmentProductionState from '../pr-dictionaries/EquipmentProductionState';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(EquipmentProductionState);
export default dictionary;
