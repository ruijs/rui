import type { PrDictionary as TPrDictionary } from '~/types/pr-types';
import ActiveInactiveState from '../models/pr-dictionaries/ActiveInactiveState';
import ApprovalState from '../models/pr-dictionaries/ApprovalState';
import DataDictionaryValueType from '../models/pr-dictionaries/DataDictionaryValueType';
import DataSecretLevel from '../models/pr-dictionaries/DataSecretLevel';
import EmployeeState from '../models/pr-dictionaries/EmployeeState';
import EnabledDisabledState from '../models/pr-dictionaries/EnabledDisabledState';
import EquipmentPowerState from '../models/pr-dictionaries/EquipmentPowerState';
import EquipmentProductionState from '../models/pr-dictionaries/EquipmentProductionState';
import MetaPropertyType from '../models/pr-dictionaries/MetaPropertyType';
import MetaRouteHttpMethod from '../models/pr-dictionaries/MetaRouteHttpMethod';
import MetaRouteType from '../models/pr-dictionaries/MetaRouteType';
import ProductionOrderAssignmentState from '../models/pr-dictionaries/ProductionOrderAssignmentState';
import ProductionOrderExecutionState from '../models/pr-dictionaries/ProductionOrderExecutionState';
import ProductionPlanExecutionState from '../models/pr-dictionaries/ProductionPlanExecutionState';
import ProductionPlanScheduleState from '../models/pr-dictionaries/ProductionPlanScheduleState';
import ProductionTaskAssignmentState from '../models/pr-dictionaries/ProductionTaskAssignmentState';
import ProductionTaskExecutionState from '../models/pr-dictionaries/ProductionTaskExecutionState';
import PublishState from '../models/pr-dictionaries/PublishState';
import QuantityType from '../models/pr-dictionaries/QuantityType';
import UndeletedDeletedState from '../models/pr-dictionaries/UndeletedDeletedState';
import UnitType from '../models/pr-dictionaries/UnitType';
import UserSecretLevel from '../models/pr-dictionaries/UserSecretLevel';

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
  ProductionPlanExecutionState,
  ProductionPlanScheduleState,
  ProductionTaskAssignmentState,
  ProductionTaskExecutionState,
  PublishState,
  QuantityType,
  UndeletedDeletedState,
  UnitType,
  UserSecretLevel,
] as TPrDictionary[];
