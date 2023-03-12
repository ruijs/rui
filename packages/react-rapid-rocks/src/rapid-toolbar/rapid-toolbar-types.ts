import type { RockChildrenConfig, RockConfig, SimpleRockConfig } from "@ruijs/move-style";
import type { RapidFormItemType, RapidSearchFormItemConfig } from "../rapid-form-item/rapid-form-item-types";
import { RapidActionBase, RapidActionButton, RapidActionButtonBase } from "../rapid-action-types";

export type RapidToolbarConfig = {
  items?: RockConfig[];
  extras?: RockConfig[];
}

// export type RapidToolbarItem = RapidToolbarButtonItem | RapidToolbarSearchFormItem;

// export type RapidToolbarButtonItem = RapidActionButton | RapidToolbarItemLink | RapidToolbarItemPageLink;

// export type RapidToolbarItemLink = RapidActionButtonBase & {
//   actionType: "link";
//   url: string;
// }

// export type RapidToolbarItemPageLink = RapidActionButtonBase & {
//   actionType: "pageLink";
//   pageCode: string;
// }

// export type RapidToolbarSearchFormItem = RapidActionBase & RapidSearchFormItemConfig & {
//   actionType: "searchFormItem";
//   label?: string;
//   placeholder?: string;
//   type: RapidFormItemType;

//   /**
//    * 表单项控件类型
//    */
//   formControlType?: string;

//   /**
//    * 表单控件属性
//    */
//   formControlProps?: Record<string, any>;
// }

export interface RapidToolbarRockConfig extends SimpleRockConfig, RapidToolbarConfig {
}