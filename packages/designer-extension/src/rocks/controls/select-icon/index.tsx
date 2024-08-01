import { Rock, SimpleRockConfig } from "@ruiapp/move-style";
import _ from "lodash";
import { Input, Button, Modal } from "antd";
import * as antdIconList from "@ant-design/icons/lib/icons";
import { CSSProperties, useState } from "react";
import Icon from "@ant-design/icons/lib/components/Icon";
import { convertToEventHandlers } from "@ruiapp/react-renderer";

import "./style.css";

export interface SelectIconPickerProps extends SimpleRockConfig {
  value?: string;
  onChange?(v: string): void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default {
  $type: "selectIcon",

  Renderer: (context, props: SelectIconPickerProps) => {
    const options: {
      key: string;
    }[] = [];

    for (const key in antdIconList) {
      if (/^[A-Z]/.test(key) && antdIconList[key].render && !key.includes("TwoTone")) {
        options.push({
          key: key,
        });
      }
    }

    const eventHandlers = convertToEventHandlers({ context, rockConfig: props }) as any;

    const [value, setValue] = useState(props.value);
    const [searchValue, setSearchValue] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };

    const closeHandle = () => {
      setModalOpen(false);
    };

    const searchChangeHandle = (value: string) => {
      setSearchValue(value);
    };

    const selectItemHandle = (key: string) => {
      setValue(key);
      eventHandlers.onChange?.(key);
      closeHandle();
    };

    const fileterListDom = options
      .filter((option) => {
        return option.key.toLowerCase().includes(searchValue.toLowerCase());
      })
      .map((option) => {
        return (
          <div className="list" key={option.key} onClick={() => selectItemHandle(option.key)}>
            <Icon component={antdIconList[option.key]} rev={undefined}></Icon>
          </div>
        );
      });

    return (
      <>
        <Button onClick={openModal} style={{ width: "100%" }}>
          {value ? <Icon component={antdIconList[value]} rev={undefined}></Icon> : "请选择"}
        </Button>
        <Modal footer={null} width={800} title="选择图标" open={modalOpen} onCancel={closeHandle}>
          <div className="dropDownBox">
            <Input.Search placeholder="请输入图标的名称" className="searchBox" onSearch={searchChangeHandle}></Input.Search>
            {fileterListDom.length ? fileterListDom : <div className="no-result">没有查到图标</div>}
          </div>
        </Modal>
      </>
    );
  },
} as Rock;
