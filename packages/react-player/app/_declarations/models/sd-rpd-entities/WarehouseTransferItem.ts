import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/WarehouseTransferItem';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'WarehouseTransferItem'> = {
  namespace: 'app',
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

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
