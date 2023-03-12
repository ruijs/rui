import type { SdAtmEntity, SdAtmEntityOriginal } from '~/types/sd-autumn-types';
import prDef from '../pr-entities/BaseEmployee';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdAtmEntity } from '~/convertors/PrToSdAtmEntityConvertor';

const sdAtmEntityOriginal: SdAtmEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BaseEmployee'> = {
  namespace: 'mom',
  fields: [
    {
      code: 'shop',
      targetSingularCode: 'oc_shop',
      targetIdColumnName: 'shop_id',
    },
    {
      code: 'department',
      targetSingularCode: 'oc_department',
      targetIdColumnName: 'department_id',
    },
  ],
};

const entity: SdAtmEntity = convertToSdAtmEntity(prDef, sdAtmEntityOriginal);
export default entity;
