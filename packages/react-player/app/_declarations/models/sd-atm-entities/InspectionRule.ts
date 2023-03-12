import type { SdAtmEntity, SdAtmEntityOriginal } from '~/types/sd-autumn-types';
import prDef from '../pr-entities/InspectionRule';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdAtmEntity } from '~/convertors/PrToSdAtmEntityConvertor';

const sdAtmEntityOriginal: SdAtmEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'InspectionRule'> = {
  namespace: 'mom',
  fields: [
    {
      code: 'category',
      targetSingularCode: 'inspection_category',
      targetIdColumnName: 'category_id',
    },
    {
      code: 'material',
      targetSingularCode: 'base_material',
      targetIdColumnName: 'material_id',
    },
    {
      code: 'materialProcess',
      targetSingularCode: 'base_material_flow_process',
      targetIdColumnName: 'material_process_id',
    },
  ],
};

const entity: SdAtmEntity = convertToSdAtmEntity(prDef, sdAtmEntityOriginal);
export default entity;
