import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import ProductionPlanExecutionState from '../pr-dictionaries/ProductionPlanExecutionState';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(ProductionPlanExecutionState);
export default dictionary;
