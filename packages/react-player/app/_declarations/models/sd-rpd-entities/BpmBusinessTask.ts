import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/BpmBusinessTask';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BpmBusinessTask'> = {
  namespace: 'app',
  fields: [
    {
      code: 'activity',
      targetSingularCode: 'bpm_business_activity',
      targetIdColumnName: 'activity_id',
    },
    {
      code: 'assignee',
      targetSingularCode: 'oc_user',
      targetIdColumnName: 'assignee_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
