import type { SdAtmEntity, SdAtmEntityOriginal } from '~/types/sd-autumn-types';
import prDef from '../pr-entities/InspectionCharacteristic';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdAtmEntity } from '~/convertors/PrToSdAtmEntityConvertor';

const sdAtmEntityOriginal: SdAtmEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'InspectionCharacteristic'> = {
  namespace: 'mom',
  fields: [
    {
      code: 'rule',
      targetSingularCode: 'inspection_rule',
      targetIdColumnName: 'rule_id',
    },
    {
      code: 'category',
      targetSingularCode: 'inspection_characteristic_category',
      targetIdColumnName: 'category_id',
    },
    {
      code: 'method',
      targetSingularCode: 'inspection_method',
      targetIdColumnName: 'method_id',
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
