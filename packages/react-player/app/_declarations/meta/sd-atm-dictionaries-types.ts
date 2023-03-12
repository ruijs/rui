/**
 * 活跃/不活跃状态
 */
export type ActiveInactiveState =
  | 'active'
  | 'inactive'
  ;

/**
 * 审批状态
 */
export type ApprovalState =
  | 'uninitiated'
  | 'pending'
  | 'approving'
  | 'approved'
  | 'rejected'
  | 'revoked'
  ;

/**
 * 字典值类型
 */
export type DataDictionaryValueType =
  | 'string'
  | 'integer'
  ;

/**
 * 数据密级
 */
export type DataSecretLevel =
  | '1'
  | '2'
  | '3'
  | '4'
  ;

/**
 * 员工状态
 */
export type EmployeeState =
  | 'normal'
  | 'disabled'
  | 'quitted'
  ;

/**
 * 启用/禁用状态
 */
export type EnabledDisabledState =
  | 'enabled'
  | 'disabled'
  ;

/**
 * 设备电源状态
 */
export type EquipmentPowerState =
  | 'on'
  | 'off'
  ;

/**
 * 设备生产状态
 */
export type EquipmentProductionState =
  | 'idle'
  | 'commissioning'
  | 'processing'
  | 'fault'
  ;

/**
 * 实体属性类型
 */
export type PropertyType =
  | 'integer'
  | 'long'
  | 'float'
  | 'double'
  | 'text'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'json'
  | 'option'
  ;

/**
 * HTTP方法
 */
export type RouteHttpMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  ;

/**
 * 路由类型
 */
export type RouteType =
  | 'RESTful'
  ;

/**
 * 工单分配状态
 */
export type ProductionOrderAssignmentState =
  | 'unassigned'
  | 'assigned'
  | 'assigned'
  | 'canceled'
  ;

/**
 * 工单执行状态
 */
export type ProductionOrderExecutionState =
  | 'pending'
  | 'processing'
  | 'finished'
  | 'canceled'
  ;

/**
 * 工单分配状态
 */
export type ProductionOrderAssignmentState =
  | 'unassigned'
  | 'assigned'
  | 'assigned'
  | 'canceled'
  ;

/**
 * 计划执行状态
 */
export type ProductionPlanExecutionState =
  | 'pending'
  | 'processing'
  | 'finished'
  | 'canceled'
  ;

/**
 * 计划排期状态
 */
export type ProductionPlanScheduleState =
  | 'unscheduled'
  | 'scheduling'
  | 'scheduled'
  | 'canceled'
  ;

/**
 * 生产任务分配状态
 */
export type ProductionTaskAssignmentState =
  | 'unassigned'
  | 'assigned'
  | 'canceled'
  ;

/**
 * 任务执行状态
 */
export type ProductionTaskExecutionState =
  | 'pending'
  | 'processing'
  | 'finished'
  | 'canceled'
  ;

/**
 * 生产任务分配状态
 */
export type ProductionTaskAssignmentState =
  | 'unassigned'
  | 'assigned'
  | 'canceled'
  ;

/**
 * 发布状态
 */
export type PublishState =
  | 'draft'
  | 'in_review'
  | 'published'
  | 'withdrawed'
  ;

/**
 * 物理量类型
 */
export type QuantityType =
  | 'time'
  | 'length'
  | 'mass'
  | 'electric_current'
  | 'temperature'
  | 'amount_of_substance'
  | 'luminous_intensity'
  ;

/**
 * 未删除/已删除状态
 */
export type UndeletedDeletedState =
  | 'undeleted'
  | 'deleted'
  ;

/**
 * 单位类型
 */
export type UnitType =
  | 'quantity'
  | 'packaging'
  ;

/**
 * 用户密级
 */
export type UserSecretLevel =
  | '1'
  | '2'
  | '3'
  | '4'
  ;
