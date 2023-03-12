import { Link } from "@remix-run/react";
import { Menu } from "antd";
import * as antdIcons from "@ant-design/icons";
import { ItemType, MenuItemGroupType } from "antd/lib/menu/hooks/useItems";
import { useMemo } from "react";
import { get } from "lodash";
import { arrayToTree } from "~/utils/array-utils";
import React from "react";
import { MoveStyleUtils } from "@ruijs/move-style";


function getMenuItem(label: string, path: string) {
  return {
    key: path,
    label: <Link to={path}>{label}</Link>,
  }
}

const menuItems: ItemType[] = [
  {
    type: "group",
    label: "PR",
    children: [
      getMenuItem("实体", "/pr/entities"),
      getMenuItem("字典", "/pr/dictionaries"),
      getMenuItem("页面", "/pr/pages"),
    ]
  },
  {
    type: "group",
    label: "SD",
    children: [
      getMenuItem("实体", "/sd/entities"),
      getMenuItem("字典", "/sd/dictionaries"),
      getMenuItem("页面", "/sd/pages"),
    ]
  },
  {
    type: "group",
    label: "Preview",
    children: [
      getMenuItem("实体", "/preview/entities"),
      getMenuItem("页面", "/preview/pages"),
    ]
  },
];

export interface AppNavItem {
  code: string;
  name: string;
  icon?: string;
  pageCode: string;
  state: string;
  orderNum: number;
  parent?: AppNavItem;
  children?: AppNavItem[];
}

function getMenuItemFromNavItem(navItem: AppNavItem): ItemType {
  const IconComponent = navItem.icon ? (antdIcons as any)[navItem.icon] : null;
  const menuItem: ItemType = {
    key: navItem.code,
    icon: IconComponent ? <IconComponent /> : null,
    label: navItem.pageCode ? <Link to={`/pages/${navItem.pageCode}`}>{navItem.name}</Link> : <span>{navItem.name}</span>,
  };
  if (navItem.children && navItem.children.length) {
    (menuItem as MenuItemGroupType).children = navItem.children.map(getMenuItemFromNavItem);
  }

  return menuItem;
}

function getMenuItems(navItems: AppNavItem[]) {
  const navItemsTree = arrayToTree(navItems, null, {
    parentField: "parent.id",
  });
  const menuItems: ItemType[] = navItemsTree.map(getMenuItemFromNavItem);

  return menuItems;
}



export interface IProps {
  navItems: AppNavItem[];
}

export default function LeftNav(props: IProps) {
  const { navItems } = props;
  const menuItems = useMemo(() => {
    return getMenuItems(navItems);
  }, [navItems])

  return (
    <Menu className="rui-left-nav-menu" theme="dark" mode="inline" items={menuItems} />
  )
}