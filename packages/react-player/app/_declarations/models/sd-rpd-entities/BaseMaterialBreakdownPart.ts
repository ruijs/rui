import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/BaseMaterialBreakdownPart';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BaseMaterialBreakdownPart'> = {
  namespace: 'app',
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

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
