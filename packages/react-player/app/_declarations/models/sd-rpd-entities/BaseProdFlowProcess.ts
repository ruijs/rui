import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/BaseProdFlowProcess';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BaseProdFlowProcess'> = {
  namespace: 'app',
  fields: [
    {
      code: 'flow',
      targetSingularCode: 'base_prod_flow',
      targetIdColumnName: 'flow_id',
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
