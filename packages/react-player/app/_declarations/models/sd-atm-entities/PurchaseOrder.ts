import type { SdAtmEntity, SdAtmEntityOriginal } from '~/types/sd-autumn-types';
import prDef from '../pr-entities/PurchaseOrder';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdAtmEntity } from '~/convertors/PrToSdAtmEntityConvertor';

const sdAtmEntityOriginal: SdAtmEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'PurchaseOrder'> = {
  namespace: 'mom',
  fields: [
    {
      code: 'supplier',
      targetSingularCode: 'base_partner',
      targetIdColumnName: 'supplier_id',
    },
    {
      code: 'lineItems',
      targetSingularCode: 'purchase_order_item',
      selfIdColumnName: 'order_id',
    },
  ],
};

const entity: SdAtmEntity = convertToSdAtmEntity(prDef, sdAtmEntityOriginal);
export default entity;
