import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import ProductionPlanScheduleState from '../pr-dictionaries/ProductionPlanScheduleState';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(ProductionPlanScheduleState);
export default dictionary;
