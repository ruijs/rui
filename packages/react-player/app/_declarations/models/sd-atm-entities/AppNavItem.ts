import type { SdAtmEntity, SdAtmEntityOriginal } from '~/types/sd-autumn-types';
import prDef from '../pr-entities/AppNavItem';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdAtmEntity } from '~/convertors/PrToSdAtmEntityConvertor';

const sdAtmEntityOriginal: SdAtmEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'AppNavItem'> = {
  namespace: 'app',
  fields: [
    {
      code: 'client',
      targetSingularCode: 'app_client',
      targetIdColumnName: 'client_id',
    },
    {
      code: 'parent',
      targetSingularCode: 'app_nav_item',
      targetIdColumnName: 'parent_id',
    },
  ],
};

const entity: SdAtmEntity = convertToSdAtmEntity(prDef, sdAtmEntityOriginal);
export default entity;
