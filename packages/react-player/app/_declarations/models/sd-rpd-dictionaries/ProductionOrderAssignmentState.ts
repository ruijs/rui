import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import ProductionOrderAssignmentState from '../pr-dictionaries/ProductionOrderAssignmentState';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(ProductionOrderAssignmentState, {
});
export default dictionary;
