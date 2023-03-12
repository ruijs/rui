import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/BaseProdFlowTemplateProcess';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BaseProdFlowTemplateProcess'> = {
  namespace: 'app',
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

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
