import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Layout } from "antd";

import antdStyles from "antd/dist/antd.css";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import AppLeftNav from "~/components/AppLeftNav";
import rapidService from "~/rapidService";

import indexStyles from "~/styles/index.css";
import customizeStyles from "~/styles/customize.css";


export function links() {
  return [
    antdStyles,
    indexStyles,
    customizeStyles,
  ].map(styles => {
    return { rel: "stylesheet", href: styles }
  })
}

export const loader: LoaderFunction = async () => {
  const findAppNavItemOption = {
    properties: [ 'id', 'code', 'name', 'icon', 'pageCode', 'parent' ],
    filters: [
      {
        field: 'state',
        operator: 'eq',
        value: 'enabled',
      }
    ],
    orderBy: [
      {
        field: 'order_num',
      }
    ]
  };
  const navItems = (await rapidService.post("app/app_nav_items/operations/find", findAppNavItemOption)).data.list;
  return {
    navItems,
  }
}

export default function Index() {
  const viewModel = useLoaderData();
  console.log("viewModel", viewModel);

  return (
    <>
      <Layout style={{ minHeight: '100vh' }} hasSider>
        <Sider className="rui-player-left-sider">
          <h1 className="branch-title">RUI App</h1>
          <AppLeftNav navItems={viewModel.navItems} />
        </Sider>
        <Layout>
          <Content className="rui-player-main-content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
