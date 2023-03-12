import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/OcUser';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'OcUser'> = {
  namespace: 'app',
  fields: [
    {
      code: "department",
      targetSingularCode: "oc_department",
      targetIdColumnName: "department_id",
    },
    {
      code: "roles",
      targetSingularCode: "oc_role",
      linkTableName: "oc_role_uer_links",
      targetIdColumnName: "role_id",
      selfIdColumnName: "user_id",
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
