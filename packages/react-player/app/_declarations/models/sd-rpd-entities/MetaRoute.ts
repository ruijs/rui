import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/MetaRoute';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'Route'> = {
  metaOnly: true,
  namespace: 'meta',
  fields: [
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
