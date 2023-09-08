import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/BpmBusinessActivity';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BpmBusinessActivity'> = {
  namespace: 'app',
  fields: [
    {
      code: 'application',
      targetSingularCode: 'bpm_business_application',
      targetIdColumnName: 'application_id',
    },
    {
      code: 'tasks',
      targetSingularCode: 'bpm_business_task',
      selfIdColumnName: 'activity_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
