import type { SdAtmEntity, SdAtmEntityOriginal } from '~/types/sd-autumn-types';
import prDef from '../pr-entities/ProductionWorkReport';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdAtmEntity } from '~/convertors/PrToSdAtmEntityConvertor';

const sdAtmEntityOriginal: SdAtmEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'ProductionWorkReport'> = {
  namespace: 'mom',
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

const entity: SdAtmEntity = convertToSdAtmEntity(prDef, sdAtmEntityOriginal);
export default entity;
