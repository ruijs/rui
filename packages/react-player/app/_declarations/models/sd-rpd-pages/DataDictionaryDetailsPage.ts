import prDef from '../pr-pages/DataDictionaryDetailsPage';
import { convertToSdRpdDetailsPage  } from '~/convertors/PrToSdRpdPageConvertor';
import type { SdRpdDetailsPage, SdRpdDetailsPageOriginal } from '~/types/sd-rapid-page-types';

const sdRpdOriginal: SdRpdDetailsPageOriginal = {
  details: {
    items: [
    ],
  },
};

const page: SdRpdDetailsPage = convertToSdRpdDetailsPage(prDef, sdRpdOriginal);
export default page;
