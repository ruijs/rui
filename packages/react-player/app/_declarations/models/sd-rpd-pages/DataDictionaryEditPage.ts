import prDef from '../pr-pages/DataDictionaryEditPage';
import { convertToSdRpdFormPage  } from '~/convertors/PrToSdRpdPageConvertor';
import type { SdRpdFormPage, SdRpdFormPageOriginal } from '~/types/sd-rapid-page-types';

const sdRpdOriginal: SdRpdFormPageOriginal = {
  form: {
    items: [
      {
        code: "description",
        formControlType: "antdInputTextArea",
      },
    ],
  },
};

const page: SdRpdFormPage = convertToSdRpdFormPage(prDef, sdRpdOriginal);
export default page;
