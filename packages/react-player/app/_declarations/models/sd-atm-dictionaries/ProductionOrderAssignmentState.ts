import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import ProductionOrderAssignmentState from '../pr-dictionaries/ProductionOrderAssignmentState';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(ProductionOrderAssignmentState);
export default dictionary;
