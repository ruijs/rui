import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/BpmBusinessApplication';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BpmBusinessApplication'> = {
  namespace: 'app',
  fields: [
    {
      code: 'process',
      targetSingularCode: 'bpm_business_process',
      targetIdColumnName: 'process_id',
    },
    {
      code: 'initiator',
      targetSingularCode: 'oc_user',
      targetIdColumnName: 'initiator_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
