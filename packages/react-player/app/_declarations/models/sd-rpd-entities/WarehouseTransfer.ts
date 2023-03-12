import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/WarehouseTransfer';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'WarehouseTransfer'> = {
  namespace: 'app',
  fields: [
    {
      code: 'warehouse',
      targetSingularCode: 'base_warehouse',
      targetIdColumnName: 'warehouse_id',
    },
    {
      code: 'category',
      targetSingularCode: 'warehouse_transfer_category',
      targetIdColumnName: 'category_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
