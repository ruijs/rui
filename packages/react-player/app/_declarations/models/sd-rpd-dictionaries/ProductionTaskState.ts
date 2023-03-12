import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import ProductionTaskAssignmentState from '../pr-dictionaries/ProductionTaskAssignmentState';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(ProductionTaskAssignmentState, {
});
export default dictionary;
