import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import PublishState from '../pr-dictionaries/PublishState';
import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';

const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(PublishState, {
});
export default dictionary;
