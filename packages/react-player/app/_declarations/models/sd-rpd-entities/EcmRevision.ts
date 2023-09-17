import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/EcmRevision';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'EcmRevision'> = {
  namespace: 'app',
  fields: [
    {
      code: 'document',
      targetSingularCode: 'ecm_document',
      targetIdColumnName: 'document_id',
    },
    {
      code: 'storageObject',
      targetSingularCode: 'ecm_storage_object',
      targetIdColumnName: 'storage_object_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
