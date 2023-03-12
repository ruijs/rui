import type { SdAtmDictionary as TSdAtmDictionary } from '~/types/sd-autumn-types';
import ActiveInactiveState from '../models/sd-atm-dictionaries/ActiveInactiveState';
import ApprovalState from '../models/sd-atm-dictionaries/ApprovalState';
import DataDictionaryValueType from '../models/sd-atm-dictionaries/DataDictionaryValueType';
import DataSecretLevel from '../models/sd-atm-dictionaries/DataSecretLevel';
import EmployeeState from '../models/sd-atm-dictionaries/EmployeeState';
import EnabledDisabledState from '../models/sd-atm-dictionaries/EnabledDisabledState';
import EquipmentPowerState from '../models/sd-atm-dictionaries/EquipmentPowerState';
import EquipmentProductionState from '../models/sd-atm-dictionaries/EquipmentProductionState';
import MetaPropertyType from '../models/sd-atm-dictionaries/MetaPropertyType';
import MetaRouteHttpMethod from '../models/sd-atm-dictionaries/MetaRouteHttpMethod';
import MetaRouteType from '../models/sd-atm-dictionaries/MetaRouteType';
import ProductionOrderAssignmentState from '../models/sd-atm-dictionaries/ProductionOrderAssignmentState';
import ProductionOrderExecutionState from '../models/sd-atm-dictionaries/ProductionOrderExecutionState';
import ProductionOrderState from '../models/sd-atm-dictionaries/ProductionOrderState';
import ProductionPlanExecutionState from '../models/sd-atm-dictionaries/ProductionPlanExecutionState';
import ProductionPlanScheduleState from '../models/sd-atm-dictionaries/ProductionPlanScheduleState';
import ProductionTaskAssignmentState from '../models/sd-atm-dictionaries/ProductionTaskAssignmentState';
import ProductionTaskExecutionState from '../models/sd-atm-dictionaries/ProductionTaskExecutionState';
import ProductionTaskState from '../models/sd-atm-dictionaries/ProductionTaskState';
import PublishState from '../models/sd-atm-dictionaries/PublishState';
import QuantityType from '../models/sd-atm-dictionaries/QuantityType';
import UndeletedDeletedState from '../models/sd-atm-dictionaries/UndeletedDeletedState';
import UnitType from '../models/sd-atm-dictionaries/UnitType';
import UserSecretLevel from '../models/sd-atm-dictionaries/UserSecretLevel';

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
] as TSdAtmDictionary[];
