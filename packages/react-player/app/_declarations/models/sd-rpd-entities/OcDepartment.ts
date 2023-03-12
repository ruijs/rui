import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/OcDepartment';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'OcDepartment'> = {
  namespace: 'app',
  fields: [
    {
      code: "parent",
      targetSingularCode: "oc_department",
      targetIdColumnName: "parent_id",
    },
    {
      code: "users",
      targetSingularCode: "oc_user",
      selfIdColumnName: "department_id",
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
