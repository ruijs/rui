import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/BaseWarehouse';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BaseWarehouse'> = {
  namespace: 'app',
  fields: [
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;