import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import ProductionPlanExecutionState from '../pr-dictionaries/ProductionPlanExecutionState';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(ProductionPlanExecutionState, {
});
export default dictionary;
