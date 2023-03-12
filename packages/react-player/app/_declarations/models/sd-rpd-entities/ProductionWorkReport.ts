import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/ProductionWorkReport';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'ProductionWorkReport'> = {
  namespace: 'app',
  fields: [
    {
      code: 'productionTask',
      targetSingularCode: 'production_task',
      targetIdColumnName: 'production_task_id',
    },
    {
      code: 'unit',
      targetSingularCode: 'base_unit',
      targetIdColumnName: 'unit_id',
    },
    {
      code: 'operators',
      targetSingularCode: 'base_employee',
      linkTableName: 'production_work_report_operator_links',
      targetIdColumnName: 'operator_id',
      selfIdColumnName: 'production_work_report_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
