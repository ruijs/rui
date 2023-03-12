import type { SdAtmEntity, SdAtmEntityOriginal } from '~/types/sd-autumn-types';
import prDef from '../pr-entities/InspectionCategory';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdAtmEntity } from '~/convertors/PrToSdAtmEntityConvertor';

const sdAtmEntityOriginal: SdAtmEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'InspectionCategory'> = {
  namespace: 'mom',
  fields: [],
};

const entity: SdAtmEntity = convertToSdAtmEntity(prDef, sdAtmEntityOriginal);
export default entity;
