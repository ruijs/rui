import type { SdAtmEntity, SdAtmEntityOriginal } from '~/types/sd-autumn-types';
import prDef from '../pr-entities/ProductionOrder';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdAtmEntity } from '~/convertors/PrToSdAtmEntityConvertor';

const sdAtmEntityOriginal: SdAtmEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'ProductionOrder'> = {
  namespace: 'mom',
  fields: [
    {
      code: 'productionPlan',
      targetSingularCode: 'production_plan',
      targetIdColumnName: 'production_plan_id',
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

const entity: SdAtmEntity = convertToSdAtmEntity(prDef, sdAtmEntityOriginal);
export default entity;
