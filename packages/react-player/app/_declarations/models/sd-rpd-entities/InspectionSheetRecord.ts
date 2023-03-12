import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/InspectionSheetRecord';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'InspectionSheetRecord'> = {
  namespace: 'app',
  fields: [
    {
      code: 'sheet',
      targetSingularCode: 'inspection_sheet',
      targetIdColumnName: 'sheet_id',
    },
    {
      code: 'characteristic',
      targetSingularCode: 'inspection_characteristic',
      targetIdColumnName: 'characteristic_id',
    },
    {
      code: 'instrumentCategory',
      targetSingularCode: 'inspection_instrument_category',
      targetIdColumnName: 'instrument_category_id',
    },
    {
      code: 'instrument',
      targetSingularCode: 'inspection_instrument',
      targetIdColumnName: 'instrument_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
