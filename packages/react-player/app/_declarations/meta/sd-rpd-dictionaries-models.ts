import type { SdRpdDataDictionary as TSdRpdDataDictionary } from '~/types/sd-rapid-types';
import ActiveInactiveState from '../models/sd-rpd-dictionaries/ActiveInactiveState';
import ApprovalState from '../models/sd-rpd-dictionaries/ApprovalState';
import DataDictionaryValueType from '../models/sd-rpd-dictionaries/DataDictionaryValueType';
import DataSecretLevel from '../models/sd-rpd-dictionaries/DataSecretLevel';
import EmployeeState from '../models/sd-rpd-dictionaries/EmployeeState';
import EnabledDisabledState from '../models/sd-rpd-dictionaries/EnabledDisabledState';
import EquipmentPowerState from '../models/sd-rpd-dictionaries/EquipmentPowerState';
import EquipmentProductionState from '../models/sd-rpd-dictionaries/EquipmentProductionState';
import MetaPropertyType from '../models/sd-rpd-dictionaries/MetaPropertyType';
import MetaRouteHttpMethod from '../models/sd-rpd-dictionaries/MetaRouteHttpMethod';
import MetaRouteType from '../models/sd-rpd-dictionaries/MetaRouteType';
import ProductionOrderAssignmentState from '../models/sd-rpd-dictionaries/ProductionOrderAssignmentState';
import ProductionOrderExecutionState from '../models/sd-rpd-dictionaries/ProductionOrderExecutionState';
import ProductionOrderState from '../models/sd-rpd-dictionaries/ProductionOrderState';
import ProductionPlanExecutionState from '../models/sd-rpd-dictionaries/ProductionPlanExecutionState';
import ProductionPlanScheduleState from '../models/sd-rpd-dictionaries/ProductionPlanScheduleState';
import ProductionTaskAssignmentState from '../models/sd-rpd-dictionaries/ProductionTaskAssignmentState';
import ProductionTaskExecutionState from '../models/sd-rpd-dictionaries/ProductionTaskExecutionState';
import ProductionTaskState from '../models/sd-rpd-dictionaries/ProductionTaskState';
import PublishState from '../models/sd-rpd-dictionaries/PublishState';
import QuantityType from '../models/sd-rpd-dictionaries/QuantityType';
import UndeletedDeletedState from '../models/sd-rpd-dictionaries/UndeletedDeletedState';
import UnitType from '../models/sd-rpd-dictionaries/UnitType';
import UserSecretLevel from '../models/sd-rpd-dictionaries/UserSecretLevel';

export default [
  ActiveInactiveState,
  ApprovalState,
  DataDictionaryValueType,
  DataSecretLevel,
  EmployeeState,
  EnabledDisabledState,
  EquipmentPowerState,
  EquipmentProductionState,
  MetaPropertyType,
  MetaRouteHttpMethod,
  MetaRouteType,
  ProductionOrderAssignmentState,
  ProductionOrderExecutionState,
  ProductionOrderState,
  ProductionPlanExecutionState,
  ProductionPlanScheduleState,
  ProductionTaskAssignmentState,
  ProductionTaskExecutionState,
  ProductionTaskState,
  PublishState,
  QuantityType,
  UndeletedDeletedState,
  UnitType,
  UserSecretLevel,
] as TSdRpdDataDictionary[];
