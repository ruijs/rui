import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/ProductionPlanItem';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'ProductionPlanItem'> = {
  namespace: 'app',
  fields: [
    {
      code: 'productionPlan',
      targetSingularCode: 'production_plan',
      targetIdColumnName: 'production_plan_id',
    },
    {
      code: 'material',
      targetSingularCode: 'base_material',
      targetIdColumnName: 'material_id',
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
