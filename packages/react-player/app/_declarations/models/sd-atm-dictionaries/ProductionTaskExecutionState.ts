import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import ProductionTaskExecutionState from '../pr-dictionaries/ProductionTaskExecutionState';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(ProductionTaskExecutionState);
export default dictionary;
