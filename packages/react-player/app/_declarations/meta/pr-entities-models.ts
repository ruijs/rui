import type { PrEntity as TPrEntity } from '~/types/pr-types';
import AppClient from '../models/pr-entities/AppClient';
import AppNavItem from '../models/pr-entities/AppNavItem';
import BaseEmployee from '../models/pr-entities/BaseEmployee';
import BaseEquipment from '../models/pr-entities/BaseEquipment';
import BaseEquipmentCategory from '../models/pr-entities/BaseEquipmentCategory';
import BaseFormField from '../models/pr-entities/BaseFormField';
import BaseMaterial from '../models/pr-entities/BaseMaterial';
import BaseMaterialBreakdown from '../models/pr-entities/BaseMaterialBreakdown';
import BaseMaterialBreakdownPart from '../models/pr-entities/BaseMaterialBreakdownPart';
import BaseMaterialCategory from '../models/pr-entities/BaseMaterialCategory';
import BaseMaterialFlow from '../models/pr-entities/BaseMaterialFlow';
import BaseMaterialFlowProcess from '../models/pr-entities/BaseMaterialFlowProcess';
import BaseMaterialFlowProcessInput from '../models/pr-entities/BaseMaterialFlowProcessInput';
import BaseMaterialFlowProcessOutput from '../models/pr-entities/BaseMaterialFlowProcessOutput';
import BasePartner from '../models/pr-entities/BasePartner';
import BasePartnerCategory from '../models/pr-entities/BasePartnerCategory';
import BaseProdFlow from '../models/pr-entities/BaseProdFlow';
import BaseProdFlowProcess from '../models/pr-entities/BaseProdFlowProcess';
import BaseProdFlowTemplate from '../models/pr-entities/BaseProdFlowTemplate';
import BaseProdFlowTemplateProcess from '../models/pr-entities/BaseProdFlowTemplateProcess';
import BaseProdProcess from '../models/pr-entities/BaseProdProcess';
import BaseProdProcessCategory from '../models/pr-entities/BaseProdProcessCategory';
import BaseUnit from '../models/pr-entities/BaseUnit';
import BaseUnitCategory from '../models/pr-entities/BaseUnitCategory';
import BaseWarehouse from '../models/pr-entities/BaseWarehouse';
import InspectionCategory from '../models/pr-entities/InspectionCategory';
import InspectionCharacteristic from '../models/pr-entities/InspectionCharacteristic';
import InspectionCharacteristicCategory from '../models/pr-entities/InspectionCharacteristicCategory';
import InspectionInstrument from '../models/pr-entities/InspectionInstrument';
import InspectionInstrumentCategory from '../models/pr-entities/InspectionInstrumentCategory';
import InspectionMethod from '../models/pr-entities/InspectionMethod';
import InspectionRule from '../models/pr-entities/InspectionRule';
import InspectionSheet from '../models/pr-entities/InspectionSheet';
import InspectionSheetRecord from '../models/pr-entities/InspectionSheetRecord';
import MetaDataDictionary from '../models/pr-entities/MetaDataDictionary';
import MetaDataDictionaryEntry from '../models/pr-entities/MetaDataDictionaryEntry';
import MetaModel from '../models/pr-entities/MetaModel';
import MetaProperty from '../models/pr-entities/MetaProperty';
import MetaRoute from '../models/pr-entities/MetaRoute';
import OcDepartment from '../models/pr-entities/OcDepartment';
import OcRole from '../models/pr-entities/OcRole';
import OcShop from '../models/pr-entities/OcShop';
import OcUser from '../models/pr-entities/OcUser';
import ProductionOrder from '../models/pr-entities/ProductionOrder';
import ProductionOrderItem from '../models/pr-entities/ProductionOrderItem';
import ProductionPlan from '../models/pr-entities/ProductionPlan';
import ProductionPlanItem from '../models/pr-entities/ProductionPlanItem';
import ProductionTask from '../models/pr-entities/ProductionTask';
import ProductionWorkReport from '../models/pr-entities/ProductionWorkReport';
import PurchaseOrder from '../models/pr-entities/PurchaseOrder';
import PurchaseOrderItem from '../models/pr-entities/PurchaseOrderItem';
import SysWebhook from '../models/pr-entities/SysWebhook';
import WarehouseInventory from '../models/pr-entities/WarehouseInventory';
import WarehouseRegion from '../models/pr-entities/WarehouseRegion';
import WarehouseTransfer from '../models/pr-entities/WarehouseTransfer';
import WarehouseTransferCategory from '../models/pr-entities/WarehouseTransferCategory';
import WarehouseTransferItem from '../models/pr-entities/WarehouseTransferItem';

export default [
  AppClient,
  AppNavItem,
  BaseEmployee,
  BaseEquipment,
  BaseEquipmentCategory,
  BaseFormField,
  BaseMaterial,
  BaseMaterialBreakdown,
  BaseMaterialBreakdownPart,
  BaseMaterialCategory,
  BaseMaterialFlow,
  BaseMaterialFlowProcess,
  BaseMaterialFlowProcessInput,
  BaseMaterialFlowProcessOutput,
  BasePartner,
  BasePartnerCategory,
  BaseProdFlow,
  BaseProdFlowProcess,
  BaseProdFlowTemplate,
  BaseProdFlowTemplateProcess,
  BaseProdProcess,
  BaseProdProcessCategory,
  BaseUnit,
  BaseUnitCategory,
  BaseWarehouse,
  InspectionCategory,
  InspectionCharacteristic,
  InspectionCharacteristicCategory,
  InspectionInstrument,
  InspectionInstrumentCategory,
  InspectionMethod,
  InspectionRule,
  InspectionSheet,
  InspectionSheetRecord,
  MetaDataDictionary,
  MetaDataDictionaryEntry,
  MetaModel,
  MetaProperty,
  MetaRoute,
  OcDepartment,
  OcRole,
  OcShop,
  OcUser,
  ProductionOrder,
  ProductionOrderItem,
  ProductionPlan,
  ProductionPlanItem,
  ProductionTask,
  ProductionWorkReport,
  PurchaseOrder,
  PurchaseOrderItem,
  SysWebhook,
  WarehouseInventory,
  WarehouseRegion,
  WarehouseTransfer,
  WarehouseTransferCategory,
  WarehouseTransferItem,
] as TPrEntity[];
