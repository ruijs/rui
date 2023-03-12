import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import ProductionTaskAssignmentState from '../pr-dictionaries/ProductionTaskAssignmentState';
import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';

const dictionary: SdAtmDictionary = convertToSdAtmDictionary(ProductionTaskAssignmentState);
export default dictionary;
