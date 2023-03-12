import type { SdAtmEntity, SdAtmEntityOriginal } from '~/types/sd-autumn-types';
import prDef from '../pr-entities/BaseProdFlowTemplateProcess';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdAtmEntity } from '~/convertors/PrToSdAtmEntityConvertor';

const sdAtmEntityOriginal: SdAtmEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BaseProdFlowTemplateProcess'> = {
  namespace: 'mom',
  fields: [
    {
      code: 'flowTemplate',
      targetSingularCode: 'base_prod_flow_template',
      targetIdColumnName: 'flow_template_id',
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
