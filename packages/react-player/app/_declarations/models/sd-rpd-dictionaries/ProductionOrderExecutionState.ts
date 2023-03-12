import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import ProductionOrderExecutionState from '../pr-dictionaries/ProductionOrderExecutionState';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(ProductionOrderExecutionState, {
});
export default dictionary;
