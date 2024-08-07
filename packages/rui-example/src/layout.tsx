import { memo, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { css, cx } from "@emotion/css";
import routes from "./routes";
import { Menu, Select } from "antd";

import { Framework } from "@ruiapp/move-style";
import { Rui } from "@ruiapp/react-renderer";
import { Page } from "@ruiapp/move-style";
import _, { forEach } from "lodash";
import qs from "qs";

import ReactRocks from "@ruiapp/react-rocks";
import AntdExtension from "@ruiapp/antd-extension";
import DesignerExtension from "@ruiapp/designer-extension";

export const framework = new Framework();

framework.registerExpressionVar("_", _);
framework.registerExpressionVar("qs", qs);

framework.loadExtension(AntdExtension);
framework.loadExtension(DesignerExtension);
framework.loadExtension(ReactRocks);

forEach(routes, (route) => {
  const examples = route.examples;
  forEach(examples, (example) => {
    if (example.componentRock) {
      framework.registerComponent(example.componentRock);
    }
  });
});

const Layout = memo(() => {
  const params = useParams<{ pkgName: string; funcName: string }>();
  const navigate = useNavigate();

  const currentRoute = routes.find((r) => r.name === params.pkgName);
  const page = useMemo(() => {
    const currentExample = currentRoute?.examples.find((e) => e.name === params.funcName);

    return new Page(framework, {
      $id: "examplePage" + params.pkgName + params.funcName,
      stores: [],
      layout: {
        view: [
          {
            $type: "htmlElement",
            htmlTag: "h2",
            children: {
              $type: "text",
              text: `${params.pkgName}: ${params.funcName}`,
            },
          },
          {
            $type: "box",
            style: {
              padding: "20px",
            },
            children: {
              $type: "slot",
            },
          },
        ],
      },
      view: currentExample ? [{ $type: currentExample.componentRock.$type }] : [],
      eventSubscriptions: [],
    });
  }, [params.pkgName, params.funcName]);

  return (
    <div className={CssNames.container}>
      <div className={CssNames.head}>
        <Select
          value={params.pkgName}
          style={{ width: 260 }}
          onChange={(key) => {
            const selectedRoute = routes.find((r) => r.name === key);
            navigate(`/${key}/${selectedRoute?.examples[0].name}`);
          }}
        >
          {routes.map((r) => (
            <Select.Option key={r.name} value={r.name}>
              {r.title}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className={cx(CssNames.flex, CssNames.row)}>
        <div className={CssNames.sidebar}>
          <Menu
            selectedKeys={params.funcName ? [params.funcName] : []}
            items={(currentRoute?.examples || []).map((item) => ({ label: item.title, key: item.name }))}
            onClick={(e: any) => {
              navigate(`/${params.pkgName}/${e.key}`);
            }}
          />
        </div>
        <div className={cx(CssNames.body, CssNames.flex)}>
          <div className={CssNames.content}>
            <Rui framework={framework as any} page={page as any} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Layout;

const CssNames = {
  container: css`
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  head: css`
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 32px;
    border-bottom: 1px solid #f1f2f3;
  `,
  sidebar: css`
    height: 100%;
    width: 260px;
    border-right: 1px solid #f1f2f3;
  `,
  body: css`
    height: 100%;
    background-color: #f1f2f3;
    padding: 16px;
  `,
  flex: css`
    flex: 1 0 0;
    min-height: 0;
    min-width: 0;
  `,
  row: css`
    display: flex;
    flex-direction: row;
  `,
  content: css`
    height: 100%;
    width: 100%;
    overflow: auto;
    background-color: #fff;
  `,
};
