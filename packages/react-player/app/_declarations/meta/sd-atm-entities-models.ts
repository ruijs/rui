import type { SdAtmEntity as TSdAtmEntity } from '~/types/sd-autumn-types';
import AppClient from '../models/sd-atm-entities/AppClient';
import AppNavItem from '../models/sd-atm-entities/AppNavItem';
import BaseEmployee from '../models/sd-atm-entities/BaseEmployee';
import BaseEquipment from '../models/sd-atm-entities/BaseEquipment';
import BaseEquipmentCategory from '../models/sd-atm-entities/BaseEquipmentCategory';
import BaseFormField from '../models/sd-atm-entities/BaseFormField';
import BaseMaterial from '../models/sd-atm-entities/BaseMaterial';
import BaseMaterialBreakdown from '../models/sd-atm-entities/BaseMaterialBreakdown';
import BaseMaterialBreakdownPart from '../models/sd-atm-entities/BaseMaterialBreakdownPart';
import BaseMaterialCategory from '../models/sd-atm-entities/BaseMaterialCategory';
import BaseMaterialFlow from '../models/sd-atm-entities/BaseMaterialFlow';
import BaseMaterialFlowProcess from '../models/sd-atm-entities/BaseMaterialFlowProcess';
import BaseMaterialFlowProcessInput from '../models/sd-atm-entities/BaseMaterialFlowProcessInput';
import BaseMaterialFlowProcessOutput from '../models/sd-atm-entities/BaseMaterialFlowProcessOutput';
import BasePartner from '../models/sd-atm-entities/BasePartner';
import BasePartnerCategory from '../models/sd-atm-entities/BasePartnerCategory';
import BaseProdFlow from '../models/sd-atm-entities/BaseProdFlow';
import BaseProdFlowProcess from '../models/sd-atm-entities/BaseProdFlowProcess';
import BaseProdFlowTemplate from '../models/sd-atm-entities/BaseProdFlowTemplate';
import BaseProdFlowTemplateProcess from '../models/sd-atm-entities/BaseProdFlowTemplateProcess';
import BaseProdProcess from '../models/sd-atm-entities/BaseProdProcess';
import BaseProdProcessCategory from '../models/sd-atm-entities/BaseProdProcessCategory';
import BaseUnit from '../models/sd-atm-entities/BaseUnit';
import BaseUnitCategory from '../models/sd-atm-entities/BaseUnitCategory';
import BaseWarehouse from '../models/sd-atm-entities/BaseWarehouse';
import InspectionCategory from '../models/sd-atm-entities/InspectionCategory';
import InspectionCharacteristic from '../models/sd-atm-entities/InspectionCharacteristic';
import InspectionCharacteristicCategory from '../models/sd-atm-entities/InspectionCharacteristicCategory';
import InspectionInstrument from '../models/sd-atm-entities/InspectionInstrument';
import InspectionInstrumentCategory from '../models/sd-atm-entities/InspectionInstrumentCategory';
import InspectionMethod from '../models/sd-atm-entities/InspectionMethod';
import InspectionRule from '../models/sd-atm-entities/InspectionRule';
import InspectionSheet from '../models/sd-atm-entities/InspectionSheet';
import InspectionSheetRecord from '../models/sd-atm-entities/InspectionSheetRecord';
import MetaDataDictionary from '../models/sd-atm-entities/MetaDataDictionary';
import MetaDataDictionaryEntry from '../models/sd-atm-entities/MetaDataDictionaryEntry';
import MetaModel from '../models/sd-atm-entities/MetaModel';
import MetaProperty from '../models/sd-atm-entities/MetaProperty';
import MetaRoute from '../models/sd-atm-entities/MetaRoute';
import OcDepartment from '../models/sd-atm-entities/OcDepartment';
import OcRole from '../models/sd-atm-entities/OcRole';
import OcShop from '../models/sd-atm-entities/OcShop';
import OcUser from '../models/sd-atm-entities/OcUser';
import ProductionOrder from '../models/sd-atm-entities/ProductionOrder';
import ProductionOrderItem from '../models/sd-atm-entities/ProductionOrderItem';
import ProductionPlan from '../models/sd-atm-entities/ProductionPlan';
import ProductionPlanItem from '../models/sd-atm-entities/ProductionPlanItem';
import ProductionTask from '../models/sd-atm-entities/ProductionTask';
import ProductionWorkReport from '../models/sd-atm-entities/ProductionWorkReport';
import PurchaseOrder from '../models/sd-atm-entities/PurchaseOrder';
import PurchaseOrderItem from '../models/sd-atm-entities/PurchaseOrderItem';
import SysWebhook from '../models/sd-atm-entities/SysWebhook';
import WarehouseInventory from '../models/sd-atm-entities/WarehouseInventory';
import WarehouseRegion from '../models/sd-atm-entities/WarehouseRegion';
import WarehouseTransfer from '../models/sd-atm-entities/WarehouseTransfer';
import WarehouseTransferCategory from '../models/sd-atm-entities/WarehouseTransferCategory';
import WarehouseTransferItem from '../models/sd-atm-entities/WarehouseTransferItem';

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
] as TSdAtmEntity[];
