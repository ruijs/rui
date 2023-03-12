import type { SdAtmEntity, SdAtmEntityOriginal } from '~/types/sd-autumn-types';
import prDef from '../pr-entities/WarehouseTransfer';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdAtmEntity } from '~/convertors/PrToSdAtmEntityConvertor';

const sdAtmEntityOriginal: SdAtmEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'WarehouseTransfer'> = {
  namespace: 'mom',
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

const entity: SdAtmEntity = convertToSdAtmEntity(prDef, sdAtmEntityOriginal);
export default entity;
