import prDef from '../pr-pages/AppNavItemDetailsPage';
import { convertToSdRpdDetailsPage  } from '~/convertors/PrToSdRpdPageConvertor';
import type { SdRpdDetailsPage, SdRpdDetailsPageOriginal } from '~/types/sd-rapid-page-types';

const sdRpdOriginal: SdRpdDetailsPageOriginal = {
};

const page: SdRpdDetailsPage = convertToSdRpdDetailsPage(prDef, sdRpdOriginal);
export default page;
