import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/BaseEmployee';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BaseEmployee'> = {
  namespace: 'app',
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

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
