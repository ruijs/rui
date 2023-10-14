import type {
  ApprovalState,
  BusinessActivityKind,
  BusinessActivityState,
  BusinessApplicationState,
  BusinessTaskState,
  DataDictionaryLevel,
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
} from "./sd-rpd-dictionaries-types";
/**
 * 客户端
 */
export interface AppClient {
  /**
   * id
   */
  id: number;
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
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 客户端
 */
export type SaveAppClientInput = Omit<AppClient, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 导航菜单
 */
export interface AppNavItem {
  /**
   * id
   */
  id: number;
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
  client?: Partial<AppClient>;
  /**
   * 上级菜单
   */
  parent?: Partial<AppNavItem>;
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
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 导航菜单
 */
export type SaveAppNavItemInput = Omit<AppNavItem, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 员工
 */
export interface BaseEmployee {
  /**
   * id
   */
  id: number;
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
  shop?: Partial<OcShop>;
  /**
   * 部门
   */
  department?: Partial<OcDepartment>;
  /**
   * 状态
   */
  state?: EmployeeState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 员工
 */
export type SaveBaseEmployeeInput = Omit<BaseEmployee, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 设备
 */
export interface BaseEquipment {
  /**
   * id
   */
  id: number;
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
  category: Partial<BaseEquipmentCategory>;
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
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 设备
 */
export type SaveBaseEquipmentInput = Omit<BaseEquipment, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 设备分类
 */
export interface BaseEquipmentCategory {
  /**
   * id
   */
  id: number;
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
  parent?: Partial<BaseEquipmentCategory>;
  /**
   * 设备
   */
  equipments?: Partial<BaseEquipment>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 设备分类
 */
export type SaveBaseEquipmentCategoryInput = Omit<BaseEquipmentCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 表单字段
 */
export interface BaseFormField {
  /**
   * id
   */
  id: number;
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
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 表单字段
 */
export type SaveBaseFormFieldInput = Omit<BaseFormField, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料
 */
export interface BaseMaterial {
  /**
   * id
   */
  id: number;
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
  category: Partial<BaseMaterialCategory>;
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
  productionPlanItems?: Partial<ProductionPlanItem>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 物料
 */
export type SaveBaseMaterialInput = Omit<BaseMaterial, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * BOM
 */
export interface BaseMaterialBreakdown {
  /**
   * id
   */
  id: number;
  /**
   * 物料
   */
  material?: Partial<BaseMaterial>;
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
  unit?: Partial<BaseUnit>;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 下级物料
   */
  parts?: Partial<BaseMaterialBreakdownPart>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * BOM
 */
export type SaveBaseMaterialBreakdownInput = Omit<BaseMaterialBreakdown, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 下级物料
 */
export interface BaseMaterialBreakdownPart {
  /**
   * id
   */
  id: number;
  /**
   * BOM
   */
  materialBreakdown?: Partial<BaseMaterialBreakdown>;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 下级物料
   */
  subMaterial?: Partial<BaseMaterial>;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 下级物料
 */
export type SaveBaseMaterialBreakdownPartInput = Omit<BaseMaterialBreakdownPart, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料分类
 */
export interface BaseMaterialCategory {
  /**
   * id
   */
  id: number;
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
  parent?: Partial<BaseMaterialCategory>;
  /**
   * 物料
   */
  materials?: Partial<BaseMaterial>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 物料分类
 */
export type SaveBaseMaterialCategoryInput = Omit<BaseMaterialCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料文档
 */
export interface BaseMaterialDocument {
  /**
   * id
   */
  id: number;
  /**
   * 物料
   */
  material: Partial<BaseMaterial>;
  /**
   * 文档
   */
  document: Partial<EcmDocument>;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 物料文档
 */
export type SaveBaseMaterialDocumentInput = Omit<BaseMaterialDocument, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料工艺流程
 */
export interface BaseMaterialFlow {
  /**
   * id
   */
  id: number;
  /**
   * 物料
   */
  material?: Partial<BaseMaterial>;
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
  processes?: Partial<BaseMaterialFlowProcess>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 物料工艺流程
 */
export type SaveBaseMaterialFlowInput = Omit<BaseMaterialFlow, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料生产工序
 */
export interface BaseMaterialFlowProcess {
  /**
   * id
   */
  id: number;
  /**
   * 物料工艺流程
   */
  materialFlow: Partial<BaseMaterialFlow>;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 生产工序
   */
  process: Partial<BaseProdProcess>;
  /**
   * 工序别名
   */
  aliasName?: string;
  /**
   * 输入物料
   */
  inputs?: Partial<BaseMaterialFlowProcessInput>[];
  /**
   * 输出物料
   */
  outputs?: Partial<BaseMaterialFlowProcessOutput>[];
  /**
   * 标准周期时间
   */
  standardCycleTime?: number;
  /**
   * 配置
   */
  config?: object;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 物料生产工序
 */
export type SaveBaseMaterialFlowProcessInput = Omit<BaseMaterialFlowProcess, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料生产工序输入物料
 */
export interface BaseMaterialFlowProcessInput {
  /**
   * id
   */
  id: number;
  /**
   * 物料生产工序
   */
  materialProcess: Partial<BaseMaterialFlowProcess>;
  /**
   * 物料
   */
  material: Partial<BaseMaterial>;
  /**
   * 数量
   */
  amount: number;
  /**
   * 单位
   */
  unit: Partial<undefined>;
  /**
   * 配置
   */
  config?: object;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 物料生产工序输入物料
 */
export type SaveBaseMaterialFlowProcessInputInput = Omit<BaseMaterialFlowProcessInput, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 物料生产工序输出物料
 */
export interface BaseMaterialFlowProcessOutput {
  /**
   * id
   */
  id: number;
  /**
   * 物料生产工序
   */
  materialProcess?: Partial<BaseMaterialFlowProcess>;
  /**
   * 物料
   */
  material?: Partial<BaseMaterial>;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: Partial<undefined>;
  /**
   * 配置
   */
  config?: object;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 物料生产工序输出物料
 */
export type SaveBaseMaterialFlowProcessOutputInput = Omit<BaseMaterialFlowProcessOutput, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 合作伙伴
 */
export interface BasePartner {
  /**
   * id
   */
  id: number;
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
  categories?: Partial<BasePartnerCategory>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 合作伙伴
 */
export type SaveBasePartnerInput = Omit<BasePartner, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 合作伙伴分类
 */
export interface BasePartnerCategory {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 合作伙伴分类
 */
export type SaveBasePartnerCategoryInput = Omit<BasePartnerCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工艺流程
 */
export interface BaseProdFlow {
  /**
   * id
   */
  id: number;
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
  processes?: Partial<BaseProdFlowProcess>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 工艺流程
 */
export type SaveBaseProdFlowInput = Omit<BaseProdFlow, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工序
 */
export interface BaseProdFlowProcess {
  /**
   * id
   */
  id: number;
  /**
   * 工艺流程
   */
  flow: Partial<BaseProdFlow>;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 生产工序
   */
  process: Partial<BaseProdProcess>;
  /**
   * 标准周期时间
   */
  standardCycleTime?: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 工序
 */
export type SaveBaseProdFlowProcessInput = Omit<BaseProdFlowProcess, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工艺流程模板
 */
export interface BaseProdFlowTemplate {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 工序
   */
  processes?: Partial<BaseProdFlowTemplateProcess>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 工艺流程模板
 */
export type SaveBaseProdFlowTemplateInput = Omit<BaseProdFlowTemplate, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工艺流程模板工序
 */
export interface BaseProdFlowTemplateProcess {
  /**
   * id
   */
  id: number;
  /**
   * 工艺流程模板
   */
  flowTemplate: Partial<BaseProdFlowTemplate>;
  /**
   * 生产工序
   */
  process: Partial<BaseProdProcess>;
  /**
   * 标准周期时间
   */
  standardCycleTime?: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 工艺流程模板工序
 */
export type SaveBaseProdFlowTemplateProcessInput = Omit<BaseProdFlowTemplateProcess, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工序
 */
export interface BaseProdProcess {
  /**
   * id
   */
  id: number;
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
  category: Partial<BaseProdProcessCategory>;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 标准周期时间
   */
  standardCycleTime?: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 工序
 */
export type SaveBaseProdProcessInput = Omit<BaseProdProcess, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工序分类
 */
export interface BaseProdProcessCategory {
  /**
   * id
   */
  id: number;
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
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 工序分类
 */
export type SaveBaseProdProcessCategoryInput = Omit<BaseProdProcessCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 单位
 */
export interface BaseUnit {
  /**
   * id
   */
  id: number;
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
  category: Partial<BaseUnitCategory>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 单位
 */
export type SaveBaseUnitInput = Omit<BaseUnit, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 单位分组
 */
export interface BaseUnitCategory {
  /**
   * id
   */
  id: number;
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
  units?: Partial<BaseUnit>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 单位分组
 */
export type SaveBaseUnitCategoryInput = Omit<BaseUnitCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 仓库
 */
export interface BaseWarehouse {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 仓库
 */
export type SaveBaseWarehouseInput = Omit<BaseWarehouse, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 审批步骤
 */
export interface BpmBusinessActivity {
  /**
   * id
   */
  id: number;
  /**
   * 申请单
   */
  application: Partial<BpmBusinessApplication>;
  /**
   * 步骤名
   */
  name: string;
  /**
   * 步骤类型
   */
  kind: BusinessActivityKind;
  /**
   * 审批任务
   */
  tasks?: Partial<BpmBusinessTask>[];
  /**
   * 步骤状态
   */
  state: BusinessActivityState;
  /**
   * 步骤决议
   */
  resolution?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 审批步骤
 */
export type SaveBpmBusinessActivityInput = Omit<BpmBusinessActivity, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 业务申请单
 */
export interface BpmBusinessApplication {
  /**
   * id
   */
  id: number;
  /**
   * 业务流程
   */
  process: Partial<BpmBusinessProcess>;
  /**
   * 申请单号
   */
  code: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 表单数据
   */
  formData?: object;
  /**
   * 发起人
   */
  initiator?: Partial<OcUser>;
  /**
   * 发起时间
   */
  initiatedAt?: string;
  /**
   * 批准时间
   */
  approvedAt?: string;
  /**
   * 流程状态
   */
  state: BusinessApplicationState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 业务申请单
 */
export type SaveBpmBusinessApplicationInput = Omit<BpmBusinessApplication, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 流程分组
 */
export interface BpmBusinessCategory {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 排序号
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 流程分组
 */
export type SaveBpmBusinessCategoryInput = Omit<BpmBusinessCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 业务流程
 */
export interface BpmBusinessProcess {
  /**
   * id
   */
  id: number;
  /**
   * 分组
   */
  category?: Partial<BpmBusinessCategory>;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 表单配置
   */
  formConfig?: object;
  /**
   * 流程配置
   */
  flowConfig?: object;
  /**
   * 列表配置
   */
  listConfig?: object;
  /**
   * 高级设置
   */
  advancedConfig?: object;
  /**
   * 状态
   */
  state: EnabledDisabledState;
  /**
   * 状态
   */
  publishState: PublishState;
  /**
   * 当前版本
   */
  activeRevision?: Partial<BpmBusinessProcessRevision>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 业务流程
 */
export type SaveBpmBusinessProcessInput = Omit<BpmBusinessProcess, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 业务流程版本
 */
export interface BpmBusinessProcessRevision {
  /**
   * id
   */
  id: number;
  /**
   * 业务流程
   */
  process: Partial<BpmBusinessProcess>;
  /**
   * 名称
   */
  name: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 表单配置
   */
  formConfig?: object;
  /**
   * 流程配置
   */
  flowConfig?: object;
  /**
   * 高级设置
   */
  advancedConfig?: object;
  /**
   * 状态
   */
  publishState: PublishState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 业务流程版本
 */
export type SaveBpmBusinessProcessRevisionInput = Omit<BpmBusinessProcessRevision, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 审批任务
 */
export interface BpmBusinessTask {
  /**
   * id
   */
  id: number;
  /**
   * 审批步骤
   */
  activity: Partial<BpmBusinessActivity>;
  /**
   * 负责人
   */
  assignee: Partial<OcUser>;
  /**
   * 任务状态
   */
  state: BusinessTaskState;
  /**
   * 任务决议
   */
  resolution?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 审批任务
 */
export type SaveBpmBusinessTaskInput = Omit<BpmBusinessTask, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 文档
 */
export interface EcmDocument {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 扩展名
   */
  extName?: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 大小
   */
  size: number;
  /**
   * 最新版本
   */
  lastRevision?: Partial<EcmRevision>;
  /**
   * 存储对象
   */
  storageObject?: Partial<EcmStorageObject>;
  /**
   * 链接
   */
  ref?: Partial<EcmDocument>;
  /**
   * 父文档
   */
  parent?: Partial<EcmDocument>;
  /**
   * 状态
   */
  publishState: PublishState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 文档
 */
export type SaveEcmDocumentInput = Omit<EcmDocument, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 文档版本
 */
export interface EcmRevision {
  /**
   * id
   */
  id: number;
  /**
   * 文档
   */
  document: Partial<EcmDocument>;
  /**
   * 大小
   */
  size: number;
  /**
   * 存储对象
   */
  storageObject?: Partial<EcmStorageObject>;
  /**
   * 状态
   */
  publishState: PublishState;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 文档版本
 */
export type SaveEcmRevisionInput = Omit<EcmRevision, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 存储对象
 */
export interface EcmStorageObject {
  /**
   * id
   */
  id: number;
  /**
   * 大小
   */
  size: number;
  /**
   * 对象唯一键
   */
  key: string;
  /**
   * 哈希值
   */
  hash?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 存储对象
 */
export type SaveEcmStorageObjectInput = Omit<EcmStorageObject, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验类型
 */
export interface InspectionCategory {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 检验类型
 */
export type SaveInspectionCategoryInput = Omit<InspectionCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验特征
 */
export interface InspectionCharacteristic {
  /**
   * id
   */
  id: number;
  /**
   * 检验规则
   */
  rule?: Partial<InspectionRule>;
  /**
   * 名称
   */
  name?: string;
  /**
   * 特征类型
   */
  category?: Partial<InspectionCharacteristicCategory>;
  /**
   * 检验方法
   */
  method?: Partial<InspectionMethod>;
  /**
   * 检验仪器类型
   */
  instrumentCategory?: Partial<InspectionInstrumentCategory>;
  /**
   * 检验仪器
   */
  instrument?: Partial<InspectionInstrument>;
  /**
   * 配置
   */
  config?: object;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 检验特征
 */
export type SaveInspectionCharacteristicInput = Omit<InspectionCharacteristic, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验特征类型
 */
export interface InspectionCharacteristicCategory {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 检验特征类型
 */
export type SaveInspectionCharacteristicCategoryInput = Omit<InspectionCharacteristicCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验仪器
 */
export interface InspectionInstrument {
  /**
   * id
   */
  id: number;
  /**
   * 仪器编号
   */
  code?: string;
  /**
   * 仪器类型
   */
  category?: Partial<InspectionInstrumentCategory>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 检验仪器
 */
export type SaveInspectionInstrumentInput = Omit<InspectionInstrument, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验仪器类型
 */
export interface InspectionInstrumentCategory {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 检验仪器类型
 */
export type SaveInspectionInstrumentCategoryInput = Omit<InspectionInstrumentCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验方法
 */
export interface InspectionMethod {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 检验方法
 */
export type SaveInspectionMethodInput = Omit<InspectionMethod, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验规则
 */
export interface InspectionRule {
  /**
   * id
   */
  id: number;
  /**
   * 检验类型
   */
  category?: Partial<InspectionCategory>;
  /**
   * 物品
   */
  material?: Partial<BaseMaterial>;
  /**
   * 物料生产工序
   */
  materialProcess?: Partial<BaseMaterialFlowProcess>;
  /**
   * 配置
   */
  config?: object;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 检验规则
 */
export type SaveInspectionRuleInput = Omit<InspectionRule, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验单
 */
export interface InspectionSheet {
  /**
   * id
   */
  id: number;
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
  productionTask?: Partial<ProductionTask>;
  /**
   * 检验规则
   */
  rule?: Partial<InspectionRule>;
  /**
   * 物料生产工序
   */
  materialProcess?: Partial<BaseMaterialFlowProcess>;
  /**
   * 检验员
   */
  inspector?: Partial<BaseEmployee>;
  /**
   * 检验记录
   */
  records?: Partial<InspectionSheetRecord>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 检验单
 */
export type SaveInspectionSheetInput = Omit<InspectionSheet, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 检验记录
 */
export interface InspectionSheetRecord {
  /**
   * id
   */
  id: number;
  /**
   * 检验单
   */
  sheet?: Partial<InspectionSheet>;
  /**
   * 样本号
   */
  sampleCode?: string;
  /**
   * 检验特征
   */
  characteristic?: Partial<InspectionCharacteristic>;
  /**
   * 检验仪器类型
   */
  instrumentCategory?: Partial<InspectionInstrumentCategory>;
  /**
   * 检验仪器
   */
  instrument?: Partial<InspectionInstrument>;
  /**
   * 检验时间
   */
  inspectedAt?: string;
  /**
   * 检验值
   */
  actualValue?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 检验记录
 */
export type SaveInspectionSheetRecordInput = Omit<InspectionSheetRecord, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 数据字典
 */
export interface DataDictionary {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 值类型
   */
  valueType: DataDictionaryValueType;
  /**
   * 级别
   */
  level: DataDictionaryLevel;
  /**
   * 描述
   */
  description?: string;
  /**
   * 来源
   */
  source?: string;
  /**
   * 外部id
   */
  externalId?: string;
  /**
   * 外部数据
   */
  externalData?: object;
  /**
   * 状态
   */
  state: UndeletedDeletedState;
  /**
   * 条目
   */
  entries?: Partial<DataDictionary>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 数据字典
 */
export type SaveDataDictionaryInput = Omit<DataDictionary, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 数据字典条目
 */
export interface DataDictionaryEntry {
  /**
   * id
   */
  id: number;
  /**
   * 数据字典
   */
  dictionary?: Partial<DataDictionary>;
  /**
   * 值
   */
  value: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 颜色
   */
  color?: string;
  /**
   * 图标
   */
  icon?: string;
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
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 数据字典条目
 */
export type SaveDataDictionaryEntryInput = Omit<DataDictionaryEntry, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 实体模型
 */
export interface Model {
  /**
   * id
   */
  id: number;
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
  properties?: Partial<Property>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 实体模型
 */
export type SaveModelInput = Omit<Model, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 实体属性
 */
export interface Property {
  /**
   * id
   */
  id: number;
  /**
   * 模型
   */
  model?: Partial<Model>;
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
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 实体属性
 */
export type SavePropertyInput = Omit<Property, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * HTTP路由
 */
export interface Route {
  /**
   * id
   */
  id: number;
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
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * HTTP路由
 */
export type SaveRouteInput = Omit<Route, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 部门
 */
export interface OcDepartment {
  /**
   * id
   */
  id: number;
  /**
   * 上级部门
   */
  parent?: Partial<OcDepartment>;
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
  users?: Partial<OcUser>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 部门
 */
export type SaveOcDepartmentInput = Omit<OcDepartment, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 角色
 */
export interface OcRole {
  /**
   * id
   */
  id: number;
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
  users?: Partial<OcUser>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 角色
 */
export type SaveOcRoleInput = Omit<OcRole, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 车间
 */
export interface OcShop {
  /**
   * id
   */
  id: number;
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
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 车间
 */
export type SaveOcShopInput = Omit<OcShop, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 用户
 */
export interface OcUser {
  /**
   * id
   */
  id: number;
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
   * Email
   */
  email?: string;
  /**
   * 部门
   */
  department?: Partial<OcDepartment>;
  /**
   * 角色
   */
  roles?: Partial<OcRole>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 用户
 */
export type SaveOcUserInput = Omit<OcUser, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 生产工单
 */
export interface ProductionOrder {
  /**
   * id
   */
  id: number;
  /**
   * 工单号
   */
  code?: string;
  /**
   * 生产计划
   */
  productionPlan?: Partial<ProductionPlan>;
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
  material?: Partial<BaseMaterial>;
  /**
   * 工艺路线
   */
  materialFlow?: Partial<BaseMaterialFlow>;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
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
  productionTasks?: Partial<ProductionTask>[];
  /**
   * 工单项
   */
  lineItems?: Partial<ProductionOrderItem>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 生产工单
 */
export type SaveProductionOrderInput = Omit<ProductionOrder, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 生产工单项
 */
export interface ProductionOrderItem {
  /**
   * id
   */
  id: number;
  /**
   * 生产工单
   */
  productionOrder?: Partial<ProductionOrder>;
  /**
   * 物品
   */
  material?: Partial<BaseMaterial>;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 生产工单项
 */
export type SaveProductionOrderItemInput = Omit<ProductionOrderItem, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 生产计划
 */
export interface ProductionPlan {
  /**
   * id
   */
  id: number;
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
  lineItems?: Partial<ProductionPlanItem>[];
  /**
   * 生产工单
   */
  productionOrders?: Partial<ProductionOrder>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 生产计划
 */
export type SaveProductionPlanInput = Omit<ProductionPlan, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 生产计划项
 */
export interface ProductionPlanItem {
  /**
   * id
   */
  id: number;
  /**
   * 生产计划
   */
  productionPlan?: Partial<ProductionPlan>;
  /**
   * 物品
   */
  material?: Partial<BaseMaterial>;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 生产计划项
 */
export type SaveProductionPlanItemInput = Omit<ProductionPlanItem, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 工序任务
 */
export interface ProductionTask {
  /**
   * id
   */
  id: number;
  /**
   * 任务号
   */
  code?: string;
  /**
   * 生产工单
   */
  productionOrder?: Partial<ProductionOrder>;
  /**
   * 物品
   */
  material?: Partial<BaseMaterial>;
  /**
   * 工艺路线
   */
  materialFlow?: Partial<BaseMaterialFlow>;
  /**
   * 生产工序
   */
  materialProcess?: Partial<BaseMaterialFlowProcess>;
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
  unit?: Partial<BaseUnit>;
  /**
   * 设备
   */
  equipment?: Partial<BaseEquipment>;
  /**
   * 操作工
   */
  assignees?: Partial<BaseEmployee>[];
  /**
   * 最晚完成日期
   */
  deadline?: string;
  /**
   * 派工人员
   */
  assigner?: Partial<BaseEmployee>;
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
  workReports?: Partial<ProductionWorkReport>[];
  /**
   * 检验单
   */
  inspectionSheets?: Partial<InspectionSheet>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 工序任务
 */
export type SaveProductionTaskInput = Omit<ProductionTask, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 生产报工单
 */
export interface ProductionWorkReport {
  /**
   * id
   */
  id: number;
  /**
   * 生产报工单号
   */
  code?: string;
  /**
   * 生产任务
   */
  productionTask?: Partial<ProductionTask>;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 操作工
   */
  operators?: Partial<BaseEmployee>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 生产报工单
 */
export type SaveProductionWorkReportInput = Omit<ProductionWorkReport, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 采购订单
 */
export interface PurchaseOrder {
  /**
   * id
   */
  id: number;
  /**
   * 采购订单号
   */
  code?: string;
  /**
   * 供应商
   */
  supplier?: Partial<BasePartner>;
  /**
   * 订单项
   */
  lineItems?: Partial<PurchaseOrderItem>[];
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 采购订单
 */
export type SavePurchaseOrderInput = Omit<PurchaseOrder, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 采购订单项
 */
export interface PurchaseOrderItem {
  /**
   * id
   */
  id: number;
  /**
   * 采购订单
   */
  order?: Partial<PurchaseOrder>;
  /**
   * 物品
   */
  material?: Partial<BaseMaterial>;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 采购订单项
 */
export type SavePurchaseOrderItemInput = Omit<PurchaseOrderItem, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * Webhook
 */
export interface Webhook {
  /**
   * id
   */
  id: number;
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
  enabled: boolean;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * Webhook
 */
export type SaveWebhookInput = Omit<Webhook, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 仓库存货
 */
export interface WarehouseInventory {
  /**
   * id
   */
  id: number;
  /**
   * 仓库
   */
  warehouse?: Partial<BaseWarehouse>;
  /**
   * 物品
   */
  material?: Partial<BaseMaterial>;
  /**
   * 库位
   */
  region?: Partial<WarehouseRegion>;
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
  unit?: Partial<BaseUnit>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 仓库存货
 */
export type SaveWarehouseInventoryInput = Omit<WarehouseInventory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 库位
 */
export interface WarehouseRegion {
  /**
   * id
   */
  id: number;
  /**
   * 仓库
   */
  warehouse?: Partial<BaseWarehouse>;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 库位
 */
export type SaveWarehouseRegionInput = Omit<WarehouseRegion, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 出入库单
 */
export interface WarehouseTransfer {
  /**
   * id
   */
  id: number;
  /**
   * 仓库
   */
  warehouse?: Partial<BaseWarehouse>;
  /**
   * 出入库单号
   */
  code?: string;
  /**
   * 出入库类型
   */
  category?: Partial<WarehouseTransferCategory>;
  /**
   * 审核状态
   */
  approvalState?: ApprovalState;
  /**
   * 审核步骤
   */
  currentApprovalStep?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 出入库单
 */
export type SaveWarehouseTransferInput = Omit<WarehouseTransfer, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 出入库类型
 */
export interface WarehouseTransferCategory {
  /**
   * id
   */
  id: number;
  /**
   * Code
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 出入库类型
 */
export type SaveWarehouseTransferCategoryInput = Omit<WarehouseTransferCategory, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

/**
 * 出入库单项
 */
export interface WarehouseTransferItem {
  /**
   * id
   */
  id: number;
  /**
   * 出入库单
   */
  transfer?: Partial<WarehouseTransfer>;
  /**
   * 出库区域
   */
  fromRegion?: Partial<WarehouseRegion>;
  /**
   * 入库区域
   */
  toRegion?: Partial<WarehouseRegion>;
  /**
   * 物品
   */
  material?: Partial<BaseMaterial>;
  /**
   * 数量
   */
  amount?: number;
  /**
   * 单位
   */
  unit?: Partial<BaseUnit>;
  /**
   * 创建时间
   */
  createdAt?: string;
  /**
   * 创建人
   */
  createdBy?: Partial<OcUser>;
  /**
   * 更新时间
   */
  updatedAt?: string;
  /**
   * 更新人
   */
  updatedBy?: Partial<OcUser>;
  /**
   * 删除时间
   */
  deletedAt?: string;
  /**
   * 删除人
   */
  detetedBy?: Partial<OcUser>;
};

/**
 * 出入库单项
 */
export type SaveWarehouseTransferItemInput = Omit<WarehouseTransferItem, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;
