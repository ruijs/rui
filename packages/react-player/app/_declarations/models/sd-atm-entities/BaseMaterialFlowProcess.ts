import type { SdAtmEntity, SdAtmEntityOriginal } from '~/types/sd-autumn-types';
import prDef from '../pr-entities/BaseMaterialFlowProcess';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdAtmEntity } from '~/convertors/PrToSdAtmEntityConvertor';

const sdAtmEntityOriginal: SdAtmEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BaseMaterialFlowProcess'> = {
  namespace: 'mom',
  fields: [
    {
      code: 'materialFlow',
      targetSingularCode: 'base_material_flow',
      targetIdColumnName: 'flow_id',
    },
    {
      code: 'process',
      targetSingularCode: 'base_prod_process',
      targetIdColumnName: 'process_id',
    },
  ],
};

const entity: SdAtmEntity = convertToSdAtmEntity(prDef, sdAtmEntityOriginal);
export default entity;
