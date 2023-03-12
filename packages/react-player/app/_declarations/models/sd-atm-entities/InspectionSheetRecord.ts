import type { SdAtmEntity, SdAtmEntityOriginal } from '~/types/sd-autumn-types';
import prDef from '../pr-entities/InspectionSheetRecord';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdAtmEntity } from '~/convertors/PrToSdAtmEntityConvertor';

const sdAtmEntityOriginal: SdAtmEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'InspectionSheetRecord'> = {
  namespace: 'mom',
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

const entity: SdAtmEntity = convertToSdAtmEntity(prDef, sdAtmEntityOriginal);
export default entity;
