import type { SdRpdEntity as TSdRpdEntity } from '~/types/sd-rapid-types';
import AppClient from '../models/sd-rpd-entities/AppClient';
import AppNavItem from '../models/sd-rpd-entities/AppNavItem';
import BaseEmployee from '../models/sd-rpd-entities/BaseEmployee';
import BaseEquipment from '../models/sd-rpd-entities/BaseEquipment';
import BaseEquipmentCategory from '../models/sd-rpd-entities/BaseEquipmentCategory';
import BaseFormField from '../models/sd-rpd-entities/BaseFormField';
import BaseMaterial from '../models/sd-rpd-entities/BaseMaterial';
import BaseMaterialBreakdown from '../models/sd-rpd-entities/BaseMaterialBreakdown';
import BaseMaterialBreakdownPart from '../models/sd-rpd-entities/BaseMaterialBreakdownPart';
import BaseMaterialCategory from '../models/sd-rpd-entities/BaseMaterialCategory';
import BaseMaterialDocument from '../models/sd-rpd-entities/BaseMaterialDocument';
import BaseMaterialFlow from '../models/sd-rpd-entities/BaseMaterialFlow';
import BaseMaterialFlowProcess from '../models/sd-rpd-entities/BaseMaterialFlowProcess';
import BaseMaterialFlowProcessInput from '../models/sd-rpd-entities/BaseMaterialFlowProcessInput';
import BaseMaterialFlowProcessOutput from '../models/sd-rpd-entities/BaseMaterialFlowProcessOutput';
import BasePartner from '../models/sd-rpd-entities/BasePartner';
import BasePartnerCategory from '../models/sd-rpd-entities/BasePartnerCategory';
import BaseProdFlow from '../models/sd-rpd-entities/BaseProdFlow';
import BaseProdFlowProcess from '../models/sd-rpd-entities/BaseProdFlowProcess';
import BaseProdFlowTemplate from '../models/sd-rpd-entities/BaseProdFlowTemplate';
import BaseProdFlowTemplateProcess from '../models/sd-rpd-entities/BaseProdFlowTemplateProcess';
import BaseProdProcess from '../models/sd-rpd-entities/BaseProdProcess';
import BaseProdProcessCategory from '../models/sd-rpd-entities/BaseProdProcessCategory';
import BaseUnit from '../models/sd-rpd-entities/BaseUnit';
import BaseUnitCategory from '../models/sd-rpd-entities/BaseUnitCategory';
import BaseWarehouse from '../models/sd-rpd-entities/BaseWarehouse';
import BpmBusinessActivity from '../models/sd-rpd-entities/BpmBusinessActivity';
import BpmBusinessApplication from '../models/sd-rpd-entities/BpmBusinessApplication';
import BpmBusinessCategory from '../models/sd-rpd-entities/BpmBusinessCategory';
import BpmBusinessProcess from '../models/sd-rpd-entities/BpmBusinessProcess';
import BpmBusinessProcessRevision from '../models/sd-rpd-entities/BpmBusinessProcessRevision';
import BpmBusinessTask from '../models/sd-rpd-entities/BpmBusinessTask';
import EcmDocument from '../models/sd-rpd-entities/EcmDocument';
import EcmRevision from '../models/sd-rpd-entities/EcmRevision';
import EcmStorageObject from '../models/sd-rpd-entities/EcmStorageObject';
import InspectionCategory from '../models/sd-rpd-entities/InspectionCategory';
import InspectionCharacteristic from '../models/sd-rpd-entities/InspectionCharacteristic';
import InspectionCharacteristicCategory from '../models/sd-rpd-entities/InspectionCharacteristicCategory';
import InspectionInstrument from '../models/sd-rpd-entities/InspectionInstrument';
import InspectionInstrumentCategory from '../models/sd-rpd-entities/InspectionInstrumentCategory';
import InspectionMethod from '../models/sd-rpd-entities/InspectionMethod';
import InspectionRule from '../models/sd-rpd-entities/InspectionRule';
import InspectionSheet from '../models/sd-rpd-entities/InspectionSheet';
import InspectionSheetRecord from '../models/sd-rpd-entities/InspectionSheetRecord';
import MetaDataDictionary from '../models/sd-rpd-entities/MetaDataDictionary';
import MetaDataDictionaryEntry from '../models/sd-rpd-entities/MetaDataDictionaryEntry';
import MetaModel from '../models/sd-rpd-entities/MetaModel';
import MetaProperty from '../models/sd-rpd-entities/MetaProperty';
import MetaRoute from '../models/sd-rpd-entities/MetaRoute';
import OcDepartment from '../models/sd-rpd-entities/OcDepartment';
import OcRole from '../models/sd-rpd-entities/OcRole';
import OcShop from '../models/sd-rpd-entities/OcShop';
import OcUser from '../models/sd-rpd-entities/OcUser';
import ProductionOrder from '../models/sd-rpd-entities/ProductionOrder';
import ProductionOrderItem from '../models/sd-rpd-entities/ProductionOrderItem';
import ProductionPlan from '../models/sd-rpd-entities/ProductionPlan';
import ProductionPlanItem from '../models/sd-rpd-entities/ProductionPlanItem';
import ProductionTask from '../models/sd-rpd-entities/ProductionTask';
import ProductionWorkReport from '../models/sd-rpd-entities/ProductionWorkReport';
import PurchaseOrder from '../models/sd-rpd-entities/PurchaseOrder';
import PurchaseOrderItem from '../models/sd-rpd-entities/PurchaseOrderItem';
import SysWebhook from '../models/sd-rpd-entities/SysWebhook';
import WarehouseInventory from '../models/sd-rpd-entities/WarehouseInventory';
import WarehouseRegion from '../models/sd-rpd-entities/WarehouseRegion';
import WarehouseTransfer from '../models/sd-rpd-entities/WarehouseTransfer';
import WarehouseTransferCategory from '../models/sd-rpd-entities/WarehouseTransferCategory';
import WarehouseTransferItem from '../models/sd-rpd-entities/WarehouseTransferItem';

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
  BaseMaterialDocument,
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
  BpmBusinessActivity,
  BpmBusinessApplication,
  BpmBusinessCategory,
  BpmBusinessProcess,
  BpmBusinessProcessRevision,
  BpmBusinessTask,
  EcmDocument,
  EcmRevision,
  EcmStorageObject,
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
] as TSdRpdEntity[];
