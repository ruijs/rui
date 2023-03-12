import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/PurchaseOrder';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'PurchaseOrder'> = {
  namespace: 'app',
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

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
