import type { SdRpdDataDictionary as TSdRpdDataDictionary } from '~/types/sd-rapid-types';
import ActiveInactiveState from '../models/sd-rpd-dictionaries/ActiveInactiveState';
import ApprovalState from '../models/sd-rpd-dictionaries/ApprovalState';
import BusinessActivityKind from '../models/sd-rpd-dictionaries/BusinessActivityKind';
import BusinessActivityState from '../models/sd-rpd-dictionaries/BusinessActivityState';
import BusinessApplicationState from '../models/sd-rpd-dictionaries/BusinessApplicationState';
import BusinessTaskState from '../models/sd-rpd-dictionaries/BusinessTaskState';
import DataDictionaryValueType from '../models/sd-rpd-dictionaries/DataDictionaryValueType';
import DataSecretLevel from '../models/sd-rpd-dictionaries/DataSecretLevel';
import DocumentType from '../models/sd-rpd-dictionaries/DocumentType';
import EmployeeState from '../models/sd-rpd-dictionaries/EmployeeState';
import EnabledDisabledState from '../models/sd-rpd-dictionaries/EnabledDisabledState';
import EquipmentPowerState from '../models/sd-rpd-dictionaries/EquipmentPowerState';
import EquipmentProductionState from '../models/sd-rpd-dictionaries/EquipmentProductionState';
import MetaDataDictionaryLevel from '../models/sd-rpd-dictionaries/MetaDataDictionaryLevel';
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
  BusinessActivityKind,
  BusinessActivityState,
  BusinessApplicationState,
  BusinessTaskState,
  DataDictionaryValueType,
  DataSecretLevel,
  DocumentType,
  EmployeeState,
  EnabledDisabledState,
  EquipmentPowerState,
  EquipmentProductionState,
  MetaDataDictionaryLevel,
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
