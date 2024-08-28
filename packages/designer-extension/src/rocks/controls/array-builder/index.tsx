import { Rock, SimpleRockConfig } from "@ruiapp/move-style";
import { CSSProperties, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Space, Dropdown, MenuProps } from "antd";
import { convertToEventHandlers } from "@ruiapp/react-renderer";

import "./style.css";

export interface ArrayBuilderProps extends SimpleRockConfig {
  value?: FormItemStyle[];
  onChange?(v: string): void;
  disabled?: boolean;
  enableAlpha?: boolean;
  className?: string;
  style?: CSSProperties;
}

type FormItemStyle = {
  key: string;
  value: string;
  id: number;
};

let id = 1;

export default {
  $type: "arrayBuilder",

  Renderer(context, props: ArrayBuilderProps) {
    const { value = [] } = props;

    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const [checkedId, setCheckedId] = useState(0);

    const eventHandlers = convertToEventHandlers({ context, rockConfig: props }) as any;

    const addHandle = () => {
      form.resetFields();
      setCheckedId(0);
      setVisible(true);
    };

    const closeHandle = () => {
      setVisible(false);
    };

    const okHandle = () => {
      form.validateFields().then((res) => {
        let confirmData = [];
        if (checkedId) {
          confirmData = value.map((d) => {
            if (d.id === checkedId) {
              return { ...res, id: checkedId };
            } else {
              return d;
            }
          });
        } else {
          confirmData = [...value, { ...res, id: ++id }];
        }

        eventHandlers.onChange?.(confirmData);

        setVisible(false);
      });
    };

    const editHandle = (formData: FormItemStyle) => {
      form.setFieldsValue(formData);
      setCheckedId(formData.id);
      setVisible(true);
    };

    const delHandle = (formData: FormItemStyle) => {
      eventHandlers.onChange?.(value.filter((d) => d.id !== formData.id));
    };

    const dropdownClickHandle = (key: string, formData: FormItemStyle) => {
      switch (key) {
        case "edit":
          editHandle(formData);
          break;
        case "del":
          delHandle(formData);
          break;
      }
    };

    const items = [
      {
        label: "编辑",
        key: "edit",
      },
      {
        label: "删除",
        key: "del",
      },
    ];

    return (
      <div className="array-builder">
        {value.map((d) => {
          return (
            <Dropdown.Button
              key={d.id}
              className="drop-down-button"
              style={{ width: "100%" }}
              type="default"
              menu={{
                items,
                onClick: ({ key }) => {
                  dropdownClickHandle(key, d);
                },
              }}
            >
              {d.key} : {d.value}
            </Dropdown.Button>
          );
        })}
        <Button type="link" onClick={addHandle}>
          添加数据
        </Button>
        <Modal width={600} title="添加数据" open={visible} onCancel={closeHandle} onOk={okHandle} okText="保存" cancelText="取消">
          <Form name="form" form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} autoComplete="off">
            <Form.Item label="key" name="key" rules={[{ required: true, message: "key必须填写" }]}>
              <Input></Input>
            </Form.Item>
            <Form.Item label="value" name="value" rules={[{ required: true, message: "value必须填写" }]}>
              <Input></Input>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  },
} as Rock;
