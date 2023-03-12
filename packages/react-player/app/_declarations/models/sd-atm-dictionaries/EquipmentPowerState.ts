import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import EquipmentPowerState from '../pr-dictionaries/EquipmentPowerState';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(EquipmentPowerState);
export default dictionary;
