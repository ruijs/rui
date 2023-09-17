import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/EcmDocument';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'EcmDocument'> = {
  namespace: 'app',
  fields: [
    {
      code: 'lastRevision',
      targetSingularCode: 'ecm_revision',
      targetIdColumnName: 'last_revision_id',
    },
    {
      code: 'storageObject',
      targetSingularCode: 'ecm_storage_object',
      targetIdColumnName: 'storage_object_id',
    },
    {
      code: 'ref',
      targetSingularCode: 'ecm_document',
      targetIdColumnName: 'ref_id',
    },
    {
      code: 'parent',
      targetSingularCode: 'ecm_document',
      targetIdColumnName: 'parent_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
