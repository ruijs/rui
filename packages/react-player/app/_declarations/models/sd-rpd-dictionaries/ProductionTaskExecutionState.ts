import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import ProductionTaskExecutionState from '../pr-dictionaries/ProductionTaskExecutionState';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(ProductionTaskExecutionState, {
});
export default dictionary;
