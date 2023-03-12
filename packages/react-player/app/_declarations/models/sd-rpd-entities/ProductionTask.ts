import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/ProductionTask';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'ProductionTask'> = {
  namespace: 'app',
  fields: [
    {
      code: 'productionOrder',
      targetSingularCode: 'production_order',
      targetIdColumnName: 'production_order_id',
    },
    {
      code: 'material',
      targetSingularCode: 'base_material',
      targetIdColumnName: 'material_id',
    },
    {
      code: 'unit',
      targetSingularCode: 'base_unit',
      targetIdColumnName: 'unit_id',
    },
    {
      code: 'materialFlow',
      targetSingularCode: 'base_material_flow',
      targetIdColumnName: 'material_flow_id',
    },
    {
      code: 'materialProcess',
      targetSingularCode: 'base_material_flow_process',
      targetIdColumnName: 'material_process_id',
    },
    {
      code: 'equipment',
      targetSingularCode: 'base_equipment',
      targetIdColumnName: 'equipment_id',
    },
    {
      code: 'assignees',
      targetSingularCode: 'base_employee',
      linkTableName: 'production_task_assignee_links',
      targetIdColumnName: 'assignee_id',
      selfIdColumnName: 'production_task_id',
    },
    {
      code: 'assigner',
      targetSingularCode: 'base_employee',
      targetIdColumnName: 'assigner_id',
    },
    {
      code: 'workReports',
      targetSingularCode: 'production_work_report',
      selfIdColumnName: 'production_task_id',
    },
    {
      code: 'inspectionSheets',
      targetSingularCode: 'inspection_sheet',
      selfIdColumnName: 'production_task_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
