import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/BaseMaterial';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BaseMaterial'> = {
  namespace: 'app',
  fields: [
    {
      code: 'category',
      targetSingularCode: 'base_material_category',
      targetIdColumnName: 'category_id',
    },
    {
      code: 'productionPlanItems',
      targetSingularCode: 'production_plan_item',
      selfIdColumnName: 'material_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
