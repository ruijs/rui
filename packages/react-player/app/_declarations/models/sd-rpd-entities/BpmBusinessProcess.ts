import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/BpmBusinessProcess';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BpmBusinessProcess'> = {
  namespace: 'app',
  fields: [
    {
      code: 'category',
      targetSingularCode: 'bpm_business_category',
      targetIdColumnName: 'category_id',
    },
    {
      code: 'activeRevision',
      targetSingularCode: 'bpm_business_process_revision',
      targetIdColumnName: 'active_revision_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
