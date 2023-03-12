import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/ProductionOrder';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'ProductionOrder'> = {
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
      code: 'materialFlow',
      targetSingularCode: 'base_material_flow',
      targetIdColumnName: 'material_flow_id',
    },
    {
      code: 'unit',
      targetSingularCode: 'base_unit',
      targetIdColumnName: 'unit_id',
    },
    {
      code: 'productionTasks',
      targetSingularCode: 'production_task',
      selfIdColumnName: 'production_order_id',
    },
    {
      code: 'lineItems',
      targetSingularCode: 'production_order_item',
      selfIdColumnName: 'order_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
