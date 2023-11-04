import { Framework, Page, PageConfig, Rock } from "@ruiapp/move-style";
import { Rui } from "@ruiapp/react-renderer";
import { Rui as RuiRock, ErrorBoundary, Show, HtmlElement, Anchor, Box, Label, List, Scope, Text, CodeEditor } from "@ruiapp/react-rocks";
import { AntdRocks, AntdIconRock } from "@ruiapp/antd-rocks";
import { RapidRocks } from "@ruiapp/react-rapid-rocks";
import { useMemo } from "react";
import _, { find, first } from "lodash";
import { redirect, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { sdRpdEntitiesModels, sdRpdDictionariesModels, sdRpdPagesModels } from "~/proton";
import type { SdRpdPage, SdRpdEntity, SdRpdDataDictionary } from "~/proton";

import styles from "antd/dist/antd.css";
import rapidService from "~/rapidService";
import { generateRuiPage } from "~/expanders/rui-page-generator";

import RapidExtension from "~/rapid-extension";
import { DesignerRocks } from "@ruiapp/react-designer";
import { Avatar, Dropdown, MenuProps, PageHeader, Space } from "antd";
import { ExportOutlined, UserOutlined } from "@ant-design/icons";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const framework = new Framework();

framework.registerExpressionVar("_", _);

framework.registerComponent(RuiRock);
framework.registerComponent(ErrorBoundary);
framework.registerComponent(Show);
framework.registerComponent(HtmlElement);
framework.registerComponent(Scope);
framework.registerComponent(Text);

framework.registerComponent(Anchor);
framework.registerComponent(Box);
framework.registerComponent(Label);
framework.registerComponent(List);
framework.registerComponent(CodeEditor);

framework.loadExtension(RapidExtension);

for(const name in RapidRocks) {
  framework.registerComponent(RapidRocks[name]);
}

for(const name in AntdRocks) {
  framework.registerComponent(AntdRocks[name]);
}
framework.registerComponent(AntdIconRock);

for (const name in DesignerRocks) {
  framework.registerComponent((DesignerRocks as Record<string, Rock>)[name]);
}


export type Params = {
  code: string;
}

type ViewModel = {
  myProfile: any;
  pageCode: string;
  navItem: any;
  sdPage: SdRpdPage;
  entities: SdRpdEntity[];
  dataDictionaries: SdRpdDataDictionary[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const myProfile = (await rapidService.get(`me`, {
    headers: {
      "Cookie": request.headers.get("Cookie"),
    }
  })).data?.user;

  if (!myProfile) {
    return redirect("/signin");
  }


  const pageCode = params.code;
  const navItems = (await rapidService.post(`app/app_nav_items/operations/find`, {
    filters: [
      {
        field: "page_code",
        operator: "eq",
        value: pageCode,
      }
    ],
    properties: ["id", "code", "name", "pageCode"],
  }, {
    headers: {
      "Cookie": request.headers.get("Cookie"),
    }
  })).data;

  const sdPage: SdRpdPage | undefined = find(sdRpdPagesModels, item => item.code === pageCode);

  return {
    myProfile,
    pageCode,
    navItem: first(navItems.list),
    sdPage,
    entities: sdRpdEntitiesModels,
    dataDictionaries: sdRpdDictionariesModels,
  }
}


export default function Index() {
  const viewModel = useLoaderData<ViewModel>();
  console.warn('viewModel', viewModel);
  const { myProfile, pageCode, sdPage, entities, dataDictionaries } = viewModel;

  const page = useMemo(() => {
    let ruiPageConfig: PageConfig | undefined;
    if (!sdPage) {
      ruiPageConfig = {
        view: [
          { $type: "text", text: `Page with code '${pageCode}' was not configured.`}
        ]
      }
      return new Page(framework, ruiPageConfig);
    }

    console.log(`[RUI][ReactPlayer] Generating RUI page config...`);
    ruiPageConfig = generateRuiPage({
      sdPage: sdPage as any,
      entities,
      dataDictionaries,
    });
    console.debug("[RUI][ReactPlayer] Auto generated RUI page config:", ruiPageConfig);
    return new Page(framework, ruiPageConfig);
  }, [pageCode, sdPage, entities, dataDictionaries]);

  const profileMenuItems: MenuProps['items'] = [
    {
      key: "signout",
      label: <a href="/api/signout">登出</a>,
      icon: <ExportOutlined rev={undefined} />
    }
  ]

  return <>
    <PageHeader
      title={sdPage?.title || sdPage?.name || pageCode}
      extra={
        <div>
            <Dropdown menu={{items: profileMenuItems}}>
              <div className="rui-current-user-indicator">
                <Avatar icon={<UserOutlined rev={undefined} />} />
                {"" + myProfile?.name}
              </div>
            </Dropdown>
        </div>
      }
    >
    </PageHeader>
    <div className="rui-play-main-container-body">
      <Rui framework={framework} page={page} />
    </div>
  </>
}