import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/AppNavItem';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'AppNavItem'> = {
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

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
