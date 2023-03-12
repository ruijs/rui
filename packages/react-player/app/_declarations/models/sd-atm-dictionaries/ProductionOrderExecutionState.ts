import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import ProductionOrderExecutionState from '../pr-dictionaries/ProductionOrderExecutionState';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(ProductionOrderExecutionState);
export default dictionary;
