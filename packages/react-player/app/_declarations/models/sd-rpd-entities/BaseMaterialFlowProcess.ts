import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/BaseMaterialFlowProcess';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BaseMaterialFlowProcess'> = {
  namespace: 'app',
  fields: [
    {
      code: 'materialFlow',
      targetSingularCode: 'base_material_flow',
      targetIdColumnName: 'material_flow_id',
    },
    {
      code: 'process',
      targetSingularCode: 'base_prod_process',
      targetIdColumnName: 'process_id',
    },
    {
      code: 'inputs',
      targetSingularCode: 'base_material_flow_process_input',
      selfIdColumnName: 'material_process_id',
    },
    {
      code: 'outputs',
      targetSingularCode: 'base_material_flow_process_output',
      selfIdColumnName: 'material_process_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
