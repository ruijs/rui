import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import ProductionPlanScheduleState from '../pr-dictionaries/ProductionPlanScheduleState';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(ProductionPlanScheduleState, {
});
export default dictionary;
