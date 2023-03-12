import type { SdAtmEntity, SdAtmEntityOriginal } from '~/types/sd-autumn-types';
import prDef from '../pr-entities/BaseMaterialBreakdownPart';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdAtmEntity } from '~/convertors/PrToSdAtmEntityConvertor';

const sdAtmEntityOriginal: SdAtmEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BaseMaterialBreakdownPart'> = {
  namespace: 'mom',
  fields: [
    {
      code: 'materialBreakdown',
      targetSingularCode: 'base_material_breakdown',
      targetIdColumnName: 'breakdown_id',
    },
    {
      code: 'subMaterial',
      targetSingularCode: 'base_material',
      targetIdColumnName: 'sub_material_id',
    },
    {
      code: 'unit',
      targetSingularCode: 'base_unit',
      targetIdColumnName: 'unit_id',
    },
  ],
};

const entity: SdAtmEntity = convertToSdAtmEntity(prDef, sdAtmEntityOriginal);
export default entity;
