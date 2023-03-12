import type {
  ApprovalState,
  DataDictionaryValueType,
  EmployeeState,
  EnabledDisabledState,
  EquipmentPowerState,
  EquipmentProductionState,
  FormFieldType,
  ProductionOrderAssignmentState,
  ProductionOrderExecutionState,
  ProductionPlanExecutionState,
  ProductionPlanScheduleState,
  ProductionTaskAssignmentState,
  ProductionTaskExecutionState,
  PropertyType,
  PublishState,
  RouteHttpMethod,
  RouteType,
  UndeletedDeletedState,
  UnitType,
} from "./sd-atm-dictionaries-types";
/**
 * 客户端
 */
export interface AppClient {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * Code
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 配置
   */
  config?: object;
  /**
   * 状态
   */
  state: UndeletedDeletedState;
};

/**
 * 客户端
 */
export type SaveAppClientInput = Omit<AppClient, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 导航菜单
 */
export interface AppNavItem {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * Code
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 客户端
   */
  client?: AppClient;
  /**
   * 上级菜单
   */
  parent?: AppNavItem;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 页面代码
   */
  pageCode?: string;
  /**
   * 配置
   */
  config?: object;
  /**
   * 状态
   */
  state: EnabledDisabledState;
};

/**
 * 导航菜单
 */
export type SaveAppNavItemInput = Omit<AppNavItem, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 员工
 */
export interface BaseEmployee {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 工号
   */
  code?: string;
  /**
   * 姓名
   */
  name?: string;
  /**
   * 车间
   */
  shop?: OcShop;
  /**
   * 部门
   */
  department?: OcDepartment;
  /**
   * 状态
   */
  state?: EmployeeState;
};

/**
 * 员工
 */
export type SaveBaseEmployeeInput = Omit<BaseEmployee, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 设备
 */
export interface BaseEquipment {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 设备号
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 分类
   */
  category: BaseEquipmentCategory;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 电源状态
   */
  powerState?: EquipmentPowerState;
  /**
   * 生产状态
   */
  productionState?: EquipmentProductionState;
  /**
   * 计划每日工作时间
   */
  planedDailyWorkingTime?: number;
};

/**
 * 设备
 */
export type SaveBaseEquipmentInput = Omit<BaseEquipment, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 设备分类
 */
export interface BaseEquipmentCategory {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 排序号
   */
  orderNum?: number;
  /**
   * 上级分类
   */
  parent?: BaseEquipmentCategory;
  /**
   * 设备
   */
  equipments?: BaseEquipment[];
};

/**
 * 设备分类
 */
export type SaveBaseEquipmentCategoryInput = Omit<BaseEquipmentCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 表单字段
 */
export interface BaseFormField {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 编码
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 字段类型
   */
  fieldType: FormFieldType;
  /**
   * 状态
   */
  state?: EnabledDisabledState;
  /**
   * 备注
   */
  description?: string;
};

/**
 * 表单字段
 */
export type SaveBaseFormFieldInput = Omit<BaseFormField, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料
 */
export interface BaseMaterial {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 物料号
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 备注
   */
  description?: string;
  /**
   * 分类
   */
  category: BaseMaterialCategory;
  /**
   * 可生产
   */
  canProduce?: boolean;
  /**
   * 可采购
   */
  canPurchase?: boolean;
  /**
   * 可销售
   */
  canSale?: boolean;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 生产计划项
   */
  productionPlanItems?: undefined[];
};

/**
 * 物料
 */
export type SaveBaseMaterialInput = Omit<BaseMaterial, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * BOM
 */
export interface BaseMaterialBreakdown {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 物料
   */
  material?: BaseMaterial;
  /**
   * 版本
   */
  version?: string;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: undefined;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 下级物料
   */
  parts?: BaseMaterialBreakdownPart[];
};

/**
 * BOM
 */
export type SaveBaseMaterialBreakdownInput = Omit<BaseMaterialBreakdown, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 下级物料
 */
export interface BaseMaterialBreakdownPart {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * BOM
   */
  materialBreakdown?: BaseMaterialBreakdown;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 下级物料
   */
  subMaterial?: BaseMaterial;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: BaseUnit;
};

/**
 * 下级物料
 */
export type SaveBaseMaterialBreakdownPartInput = Omit<BaseMaterialBreakdownPart, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料分类
 */
export interface BaseMaterialCategory {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 上级分类
   */
  parent?: BaseMaterialCategory;
  /**
   * 物料
   */
  materials?: BaseMaterial[];
};

/**
 * 物料分类
 */
export type SaveBaseMaterialCategoryInput = Omit<BaseMaterialCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料工艺流程
 */
export interface BaseMaterialFlow {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 物料
   */
  material?: BaseMaterial;
  /**
   * 版本
   */
  version: string;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 发布状态
   */
  publishState: PublishState;
  /**
   * 物料生产工序
   */
  processes?: BaseMaterialFlowProcess[];
};

/**
 * 物料工艺流程
 */
export type SaveBaseMaterialFlowInput = Omit<BaseMaterialFlow, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料生产工序
 */
export interface BaseMaterialFlowProcess {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 物料工艺流程
   */
  materialFlow: BaseMaterialFlow;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 生产工序
   */
  process: BaseProdProcess;
  /**
   * 工序别名
   */
  aliasName?: string;
  /**
   * 输入物料
   */
  inputs?: undefined[];
  /**
   * 输出物料
   */
  outputs?: undefined[];
  /**
   * 标准周期时间
   */
  standardCycleTime?: number;
  /**
   * 配置
   */
  config?: object;
};

/**
 * 物料生产工序
 */
export type SaveBaseMaterialFlowProcessInput = Omit<BaseMaterialFlowProcess, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料生产工序输入物料
 */
export interface BaseMaterialFlowProcessInput {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 物料生产工序
   */
  materialProcess: undefined;
  /**
   * 物料
   */
  material: undefined;
  /**
   * 数量
   */
  amount: number;
  /**
   * 单位
   */
  unit: undefined;
  /**
   * 配置
   */
  config?: object;
};

/**
 * 物料生产工序输入物料
 */
export type SaveBaseMaterialFlowProcessInputInput = Omit<BaseMaterialFlowProcessInput, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料生产工序输出物料
 */
export interface BaseMaterialFlowProcessOutput {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 物料生产工序
   */
  materialProcess?: undefined;
  /**
   * 物料
   */
  material?: undefined;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: undefined;
  /**
   * 配置
   */
  config?: object;
};

/**
 * 物料生产工序输出物料
 */
export type SaveBaseMaterialFlowProcessOutputInput = Omit<BaseMaterialFlowProcessOutput, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 合作伙伴
 */
export interface BasePartner {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 分类
   */
  categories?: BasePartnerCategory[];
};

/**
 * 合作伙伴
 */
export type SaveBasePartnerInput = Omit<BasePartner, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 合作伙伴分类
 */
export interface BasePartnerCategory {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
};

/**
 * 合作伙伴分类
 */
export type SaveBasePartnerCategoryInput = Omit<BasePartnerCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工艺流程
 */
export interface BaseProdFlow {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 版本
   */
  version: string;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 工序
   */
  processes?: undefined[];
};

/**
 * 工艺流程
 */
export type SaveBaseProdFlowInput = Omit<BaseProdFlow, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工序
 */
export interface BaseProdFlowProcess {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 工艺流程
   */
  flow: undefined;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 生产工序
   */
  process: undefined;
  /**
   * 标准周期时间
   */
  standardCycleTime?: number;
};

/**
 * 工序
 */
export type SaveBaseProdFlowProcessInput = Omit<BaseProdFlowProcess, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工艺流程模板
 */
export interface BaseProdFlowTemplate {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 工序
   */
  processes?: BaseProdFlowTemplateProcess;
};

/**
 * 工艺流程模板
 */
export type SaveBaseProdFlowTemplateInput = Omit<BaseProdFlowTemplate, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工艺流程模板工序
 */
export interface BaseProdFlowTemplateProcess {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 工艺流程模板
   */
  flowTemplate: BaseProdFlowTemplate;
  /**
   * 生产工序
   */
  process: BaseProdProcess;
  /**
   * 标准周期时间
   */
  standardCycleTime?: number;
};

/**
 * 工艺流程模板工序
 */
export type SaveBaseProdFlowTemplateProcessInput = Omit<BaseProdFlowTemplateProcess, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工序
 */
export interface BaseProdProcess {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * Code
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 工序类型
   */
  category: BaseProdProcessCategory;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 标准周期时间
   */
  standardCycleTime?: number;
};

/**
 * 工序
 */
export type SaveBaseProdProcessInput = Omit<BaseProdProcess, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工序分类
 */
export interface BaseProdProcessCategory {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * Code
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 排序号
   */
  orderNum: number;
};

/**
 * 工序分类
 */
export type SaveBaseProdProcessCategoryInput = Omit<BaseProdProcessCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 单位
 */
export interface BaseUnit {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * Code
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 英文名称
   */
  nameEn?: string;
  /**
   * 打印符号
   */
  printSymbol?: string;
  /**
   * 类型
   */
  type: UnitType;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 单位分组
   */
  category: BaseUnitCategory;
};

/**
 * 单位
 */
export type SaveBaseUnitInput = Omit<BaseUnit, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 单位分组
 */
export interface BaseUnitCategory {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 单位
   */
  units?: BaseUnit[];
};

/**
 * 单位分组
 */
export type SaveBaseUnitCategoryInput = Omit<BaseUnitCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 仓库
 */
export interface BaseWarehouse {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
};

/**
 * 仓库
 */
export type SaveBaseWarehouseInput = Omit<BaseWarehouse, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验类型
 */
export interface InspectionCategory {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
};

/**
 * 检验类型
 */
export type SaveInspectionCategoryInput = Omit<InspectionCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验特征
 */
export interface InspectionCharacteristic {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 检验规则
   */
  rule?: InspectionRule;
  /**
   * 名称
   */
  name?: string;
  /**
   * 特征类型
   */
  category?: InspectionCharacteristicCategory;
  /**
   * 检验方法
   */
  method?: InspectionMethod;
  /**
   * 检验仪器类型
   */
  instrumentCategory?: InspectionInstrumentCategory;
  /**
   * 检验仪器
   */
  instrument?: InspectionInstrument;
  /**
   * 配置
   */
  config?: object;
};

/**
 * 检验特征
 */
export type SaveInspectionCharacteristicInput = Omit<InspectionCharacteristic, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验特征类型
 */
export interface InspectionCharacteristicCategory {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 描述
   */
  description?: string;
};

/**
 * 检验特征类型
 */
export type SaveInspectionCharacteristicCategoryInput = Omit<InspectionCharacteristicCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验仪器
 */
export interface InspectionInstrument {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 仪器编号
   */
  code?: string;
  /**
   * 仪器类型
   */
  category?: InspectionInstrumentCategory;
};

/**
 * 检验仪器
 */
export type SaveInspectionInstrumentInput = Omit<InspectionInstrument, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验仪器类型
 */
export interface InspectionInstrumentCategory {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 描述
   */
  description?: string;
};

/**
 * 检验仪器类型
 */
export type SaveInspectionInstrumentCategoryInput = Omit<InspectionInstrumentCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验方法
 */
export interface InspectionMethod {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 描述
   */
  description?: string;
};

/**
 * 检验方法
 */
export type SaveInspectionMethodInput = Omit<InspectionMethod, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验规则
 */
export interface InspectionRule {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 检验类型
   */
  category?: InspectionCategory;
  /**
   * 物品
   */
  material?: BaseMaterial;
  /**
   * 物料生产工序
   */
  materialProcess?: BaseMaterialFlowProcess;
  /**
   * 配置
   */
  config?: object;
};

/**
 * 检验规则
 */
export type SaveInspectionRuleInput = Omit<InspectionRule, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验单
 */
export interface InspectionSheet {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 检验单号
   */
  code?: string;
  /**
   * 发布状态
   */
  state?: PublishState;
  /**
   * 工序任务
   */
  productionTask?: ProductionTask;
  /**
   * 检验规则
   */
  rule?: InspectionRule;
  /**
   * 物料生产工序
   */
  materialProcess?: BaseMaterialFlowProcess;
  /**
   * 检验员
   */
  inspector?: BaseEmployee;
  /**
   * 检验记录
   */
  records?: InspectionSheetRecord[];
};

/**
 * 检验单
 */
export type SaveInspectionSheetInput = Omit<InspectionSheet, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验记录
 */
export interface InspectionSheetRecord {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 检验单
   */
  sheet?: InspectionSheet;
  /**
   * 样本号
   */
  sampleCode?: string;
  /**
   * 检验特征
   */
  characteristic?: InspectionCharacteristic;
  /**
   * 检验仪器类型
   */
  instrumentCategory?: InspectionInstrumentCategory;
  /**
   * 检验仪器
   */
  instrument?: InspectionInstrument;
  /**
   * 检验时间
   */
  inspectedAt?: string;
  /**
   * 检验值
   */
  actualValue?: string;
};

/**
 * 检验记录
 */
export type SaveInspectionSheetRecordInput = Omit<InspectionSheetRecord, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 数据字典
 */
export interface DataDictionary {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * Code
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 颜色
   */
  color: string;
  /**
   * 图标
   */
  icon: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 值类型
   */
  valueType: DataDictionaryValueType;
  /**
   * 状态
   */
  state: UndeletedDeletedState;
  /**
   * 条目
   */
  entries?: undefined[];
};

/**
 * 数据字典
 */
export type SaveDataDictionaryInput = Omit<DataDictionary, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 数据字典条目
 */
export interface DataDictionaryEntry {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 数据字典
   */
  dictionary?: undefined;
  /**
   * 值
   */
  value: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 是否禁用
   */
  disabled: boolean;
  /**
   * 排序号
   */
  orderNum: number;
};

/**
 * 数据字典条目
 */
export type SaveDataDictionaryEntryInput = Omit<DataDictionaryEntry, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 实体模型
 */
export interface Model {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * namespace
   */
  namespace: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * singular code
   */
  singularCode: string;
  /**
   * plural code
   */
  pluralCode: string;
  /**
   * 属性
   */
  properties?: undefined[];
};

/**
 * 实体模型
 */
export type SaveModelInput = Omit<Model, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 实体属性
 */
export interface Property {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 模型
   */
  model?: undefined;
  /**
   * 属性类型
   */
  type: PropertyType;
  /**
   * 名称
   */
  name: string;
  /**
   * code
   */
  code: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 数据库列名
   */
  columnName: string;
  /**
   * 必填
   */
  required: boolean;
  /**
   * 默认值
   */
  defaultValue?: string;
  /**
   * 配置
   */
  config?: object;
  /**
   * 自增
   */
  autoIncrement: boolean;
  /**
   * 最小长度
   */
  minLength?: number;
  /**
   * 最大长度
   */
  maxLength?: number;
  /**
   * 关系类型
   */
  relation?: string;
  /**
   * 关联实体
   */
  targetSingularCode?: string;
  /**
   * 关联实体的Id列名
   */
  targetIdColumnName?: string;
  /**
   * 自身实体Id列名
   */
  selfIdColumnName?: string;
  /**
   * 关系表所属schema
   */
  linkSchema?: string;
  /**
   * 关系表表名
   */
  linkTableName?: string;
  /**
   * 数据字典
   */
  dataDictionary?: string;
};

/**
 * 实体属性
 */
export type SavePropertyInput = Omit<Property, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * HTTP路由
 */
export interface Route {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * namespace
   */
  namespace: string;
  /**
   * Code
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 路由类型
   */
  type: RouteType;
  /**
   * HTTP Method
   */
  method: RouteHttpMethod;
  /**
   * Endpoint
   */
  endpoint: string;
  /**
   * Handlers
   */
  handlers?: object;
};

/**
 * HTTP路由
 */
export type SaveRouteInput = Omit<Route, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 部门
 */
export interface OcDepartment {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 上级部门
   */
  parent?: undefined;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 排序
   */
  orderNum: number;
  /**
   * 用户
   */
  users?: undefined[];
};

/**
 * 部门
 */
export type SaveOcDepartmentInput = Omit<OcDepartment, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 角色
 */
export interface OcRole {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 排序
   */
  orderNum: number;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 用户
   */
  users?: undefined[];
};

/**
 * 角色
 */
export type SaveOcRoleInput = Omit<OcRole, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 车间
 */
export interface OcShop {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 排序
   */
  orderNum: number;
  /**
   * 状态
   */
  state: EnabledDisabledState;
};

/**
 * 车间
 */
export type SaveOcShopInput = Omit<OcShop, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 用户
 */
export interface OcUser {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 姓名
   */
  name: string;
  /**
   * 登录账号
   */
  login: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 部门
   */
  department?: undefined;
  /**
   * 角色
   */
  roles?: undefined[];
};

/**
 * 用户
 */
export type SaveOcUserInput = Omit<OcUser, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 生产工单
 */
export interface ProductionOrder {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 工单号
   */
  code?: string;
  /**
   * 生产计划
   */
  productionPlan?: ProductionPlan;
  /**
   * 分配状态
   */
  assignmentState?: ProductionOrderAssignmentState;
  /**
   * 执行状态
   */
  executionState?: ProductionOrderExecutionState;
  /**
   * 物品
   */
  material?: undefined;
  /**
   * 工艺路线
   */
  materialFlow?: undefined;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: undefined;
  /**
   * 计划开始日期
   */
  scheduledStartDate?: string;
  /**
   * 计划完成日期
   */
  scheduledFinishDate?: string;
  /**
   * 实际开始日期
   */
  actualStartDate?: string;
  /**
   * 实际完成日期
   */
  actualFinishDate?: string;
  /**
   * 生产任务
   */
  productionTasks?: ProductionTask[];
  /**
   * 工单项
   */
  lineItems?: ProductionOrderItem[];
};

/**
 * 生产工单
 */
export type SaveProductionOrderInput = Omit<ProductionOrder, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 生产工单项
 */
export interface ProductionOrderItem {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 生产工单
   */
  productionOrder?: ProductionOrder;
  /**
   * 物品
   */
  material?: BaseMaterial;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: BaseUnit;
};

/**
 * 生产工单项
 */
export type SaveProductionOrderItemInput = Omit<ProductionOrderItem, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 生产计划
 */
export interface ProductionPlan {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 生产计划号
   */
  code?: string;
  /**
   * 计划开始日期
   */
  scheduledStartDate?: string;
  /**
   * 计划完成日期
   */
  scheduledFinishDate?: string;
  /**
   * 实际开始日期
   */
  actualStartDate?: string;
  /**
   * 实际完成日期
   */
  actualFinishDate?: string;
  /**
   * 计划状态
   */
  scheduleState?: ProductionPlanScheduleState;
  /**
   * 执行状态
   */
  executionState?: ProductionPlanExecutionState;
  /**
   * 计划项
   */
  lineItems?: undefined[];
  /**
   * 生产工单
   */
  productionOrders?: ProductionOrder[];
};

/**
 * 生产计划
 */
export type SaveProductionPlanInput = Omit<ProductionPlan, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 生产计划项
 */
export interface ProductionPlanItem {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 生产计划
   */
  productionPlan?: undefined;
  /**
   * 物品
   */
  material?: undefined;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: undefined;
};

/**
 * 生产计划项
 */
export type SaveProductionPlanItemInput = Omit<ProductionPlanItem, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工序任务
 */
export interface ProductionTask {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 任务号
   */
  code?: string;
  /**
   * 生产工单
   */
  productionOrder?: ProductionOrder;
  /**
   * 物品
   */
  material?: BaseMaterial;
  /**
   * 工艺路线
   */
  materialFlow?: BaseMaterialFlow;
  /**
   * 生产工序
   */
  materialProcess?: BaseMaterialFlowProcess;
  /**
   * 计划开始日期
   */
  scheduledStartDate?: string;
  /**
   * 计划完成日期
   */
  scheduledFinishDate?: string;
  /**
   * 实际开始日期
   */
  actualStartDate?: string;
  /**
   * 实际完成日期
   */
  actualFinishDate?: string;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: BaseUnit;
  /**
   * 设备
   */
  equipment?: BaseEquipment;
  /**
   * 操作工
   */
  assignees?: BaseEmployee[];
  /**
   * 最晚完成日期
   */
  deadline?: string;
  /**
   * 派工人员
   */
  assigner?: BaseEmployee;
  /**
   * 派工时间
   */
  assignedAt?: string;
  /**
   * 领工时间
   */
  acceptedAt?: string;
  /**
   * 分配状态
   */
  assignmentState?: ProductionTaskAssignmentState;
  /**
   * 执行状态
   */
  executionState?: ProductionTaskExecutionState;
  /**
   * 生产报工单
   */
  workReports?: ProductionWorkReport[];
  /**
   * 检验单
   */
  inspectionSheets?: InspectionSheet[];
};

/**
 * 工序任务
 */
export type SaveProductionTaskInput = Omit<ProductionTask, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 生产报工单
 */
export interface ProductionWorkReport {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 生产报工单号
   */
  code?: string;
  /**
   * 生产任务
   */
  productionTask?: ProductionTask;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: BaseUnit;
  /**
   * 操作工
   */
  operators?: BaseEmployee[];
};

/**
 * 生产报工单
 */
export type SaveProductionWorkReportInput = Omit<ProductionWorkReport, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 采购订单
 */
export interface PurchaseOrder {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 采购订单号
   */
  code?: string;
  /**
   * 供应商
   */
  supplier?: BasePartner;
  /**
   * 订单项
   */
  lineItems?: PurchaseOrderItem[];
};

/**
 * 采购订单
 */
export type SavePurchaseOrderInput = Omit<PurchaseOrder, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 采购订单项
 */
export interface PurchaseOrderItem {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 采购订单
   */
  order?: PurchaseOrder;
  /**
   * 物品
   */
  material?: BaseMaterial;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: BaseUnit;
};

/**
 * 采购订单项
 */
export type SavePurchaseOrderItemInput = Omit<PurchaseOrderItem, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * Webhook
 */
export interface Webhook {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * URL
   */
  url: string;
  /**
   * 密钥
   */
  secret?: string;
  /**
   * namespace
   */
  namespace: string;
  /**
   * 模型Code
   */
  modelSingularCode: string;
  /**
   * 事件
   */
  events?: object;
  /**
   * 是否启用
   */
  enabled: any;
};

/**
 * Webhook
 */
export type SaveWebhookInput = Omit<Webhook, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 仓库存货
 */
export interface WarehouseInventory {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 仓库
   */
  warehouse?: BaseWarehouse;
  /**
   * 物品
   */
  material?: BaseMaterial;
  /**
   * 库位
   */
  region?: WarehouseRegion;
  /**
   * 入库单号
   */
  transferCode?: string;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: BaseUnit;
};

/**
 * 仓库存货
 */
export type SaveWarehouseInventoryInput = Omit<WarehouseInventory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 库位
 */
export interface WarehouseRegion {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 仓库
   */
  warehouse?: BaseWarehouse;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
};

/**
 * 库位
 */
export type SaveWarehouseRegionInput = Omit<WarehouseRegion, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 出入库单
 */
export interface WarehouseTransfer {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 仓库
   */
  warehouse?: BaseWarehouse;
  /**
   * 出入库单号
   */
  code?: string;
  /**
   * 出入库类型
   */
  category?: WarehouseTransferCategory;
  /**
   * 审核状态
   */
  approvalState?: ApprovalState;
  /**
   * 审核步骤
   */
  currentApprovalStep?: string;
};

/**
 * 出入库单
 */
export type SaveWarehouseTransferInput = Omit<WarehouseTransfer, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 出入库类型
 */
export interface WarehouseTransferCategory {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
};

/**
 * 出入库类型
 */
export type SaveWarehouseTransferCategoryInput = Omit<WarehouseTransferCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 出入库单项
 */
export interface WarehouseTransferItem {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  /**
   * 出入库单
   */
  transfer?: WarehouseTransfer;
  /**
   * 出库区域
   */
  fromRegion?: WarehouseRegion;
  /**
   * 入库区域
   */
  toRegion?: WarehouseRegion;
  /**
   * 物品
   */
  material?: BaseMaterial;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: BaseUnit;
};

/**
 * 出入库单项
 */
export type SaveWarehouseTransferItemInput = Omit<WarehouseTransferItem, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;
