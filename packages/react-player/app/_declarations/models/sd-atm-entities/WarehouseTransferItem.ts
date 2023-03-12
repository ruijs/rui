import type { SdAtmEntity, SdAtmEntityOriginal } from '~/types/sd-autumn-types';
import prDef from '../pr-entities/WarehouseTransferItem';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdAtmEntity } from '~/convertors/PrToSdAtmEntityConvertor';

const sdAtmEntityOriginal: SdAtmEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'WarehouseTransferItem'> = {
  namespace: 'mom',
  fields: [
    {
      code: 'transfer',
      targetSingularCode: 'warehouse_transfer',
      targetIdColumnName: 'transfer_id',
    },
    {
      code: 'fromRegion',
      targetSingularCode: 'warehouse_region',
      targetIdColumnName: 'from_region_id',
    },
    {
      code: 'toRegion',
      targetSingularCode: 'warehouse_region',
      targetIdColumnName: 'to_region_id',
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

const entity: SdAtmEntity = convertToSdAtmEntity(prDef, sdAtmEntityOriginal);
export default entity;
