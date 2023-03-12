import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/BaseProdFlowTemplate';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BaseProdFlowTemplate'> = {
  namespace: 'app',
  fields: [
    {
      code: 'processes',
      targetSingularCode: 'base_prod_flow_template_process',
      selfIdColumnName: 'flow_template_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
