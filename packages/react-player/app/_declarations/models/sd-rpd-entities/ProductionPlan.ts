import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/ProductionPlan';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'ProductionPlan'> = {
  namespace: 'app',
  fields: [
    {
      code: 'lineItems',
      targetSingularCode: 'production_plan_item',
      selfIdColumnName: 'plan_id',
    },
    {
      code: 'productionOrders',
      targetSingularCode: 'production_order',
      selfIdColumnName: 'production_plan_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
