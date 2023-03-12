import type { SdAtmEntity, SdAtmEntityOriginal } from '~/types/sd-autumn-types';
import prDef from '../pr-entities/BaseEquipmentCategory';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdAtmEntity } from '~/convertors/PrToSdAtmEntityConvertor';

const sdAtmEntityOriginal: SdAtmEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BaseEquipmentCategory'> = {
  namespace: 'mom',
  fields: [
    {
      code: 'parent',
      targetSingularCode: 'base_equipment_category',
      targetIdColumnName: 'parent_id',
    },
    {
      code: 'equipments',
      targetSingularCode: 'base_equipment',
      selfIdColumnName: 'category_id',
    },
  ],
};

const entity: SdAtmEntity = convertToSdAtmEntity(prDef, sdAtmEntityOriginal);
export default entity;
