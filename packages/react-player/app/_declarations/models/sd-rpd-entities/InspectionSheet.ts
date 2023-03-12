import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/InspectionSheet';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'InspectionSheet'> = {
  namespace: 'app',
  fields: [
    {
      code: 'productionTask',
      targetSingularCode: 'production_task',
      targetIdColumnName: 'production_task_id',
    },
    {
      code: 'rule',
      targetSingularCode: 'inspection_rule',
      targetIdColumnName: 'rule_id',
    },
    {
      code: 'materialProcess',
      targetSingularCode: 'base_material_flow_process',
      targetIdColumnName: 'material_process_id',
    },
    {
      code: 'inspector',
      targetSingularCode: 'base_employee',
      targetIdColumnName: 'inspector_id',
    },
    {
      code: 'records',
      targetSingularCode: 'inspection_sheet_record',
      selfIdColumnName: 'sheet_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
