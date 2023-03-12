import type { SdAtmEntity, SdAtmEntityOriginal } from '~/types/sd-autumn-types';
import prDef from '../pr-entities/BaseMaterialCategory';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdAtmEntity } from '~/convertors/PrToSdAtmEntityConvertor';

const sdAtmEntityOriginal: SdAtmEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BaseMaterialCategory'> = {
  namespace: 'mom',
  fields: [
    {
      code: 'parent',
      targetSingularCode: 'base_material_category',
      targetIdColumnName: 'parent_id',
    },
    {
      code: 'materials',
      targetSingularCode: 'base_material',
      selfIdColumnName: 'category_id',
    },
  ],
};

const entity: SdAtmEntity = convertToSdAtmEntity(prDef, sdAtmEntityOriginal);

export default entity;
