import { Rock, SimpleRockConfig } from "@ruiapp/move-style";
import { CSSProperties, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Space, Dropdown, MenuProps } from "antd";
import { convertToEventHandlers } from "@ruiapp/react-renderer";
import { CSS } from "@dnd-kit/utilities";

import "./style.css";
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";

export interface ArrayBuilderProps extends SimpleRockConfig {
  value?: FormItemStyle[];
  onChange?(v: string): void;
  disabled?: boolean;
  enableAlpha?: boolean;
  className?: string;
  style?: CSSProperties;
}

type FormItemStyle = {
  value: string;
  label: string;
  id: number;
};

let id = 1;

function SortableItem(props: { id: number; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    flexDireaction: "row",
    cursor: "move",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <svg viewBox="0 0 20 20" width="12" {...listeners} style={{ marginRight: 6 }}>
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
      </svg>
      {props.children}
    </div>
  );
}

export default {
  $type: "arrayBuilder",

  Renderer(context, props: ArrayBuilderProps) {
    const { value = [] } = props;

    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const [checkedId, setCheckedId] = useState(0);

    const eventHandlers = convertToEventHandlers({ context, rockConfig: props }) as any;

    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      }),
    );

    function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event;

      if (!active || !over) return;

      if (active.id !== over?.id) {
        const ids = value.map((v) => v.id);
        const oldIndex = ids.indexOf(active.id as number);
        const newIndex = ids.indexOf(over.id as number);
        const data = arrayMove(value, oldIndex, newIndex);
        eventHandlers.onChange?.(data);

        return data;
      }
    }

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
          confirmData = value.map((item) => {
            if (item.id === checkedId) {
              return { ...res, id: checkedId };
            } else {
              return item;
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
      eventHandlers.onChange?.(value.filter((item) => item.id !== formData.id));
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
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={value.map((v) => v.id)} strategy={verticalListSortingStrategy}>
            {value.map((item) => {
              return (
                <SortableItem key={item.id} id={item.id}>
                  <Dropdown.Button
                    key={item.id}
                    className="drop-down-button"
                    style={{ width: "100%" }}
                    type="default"
                    menu={{
                      items,
                      onClick: ({ key }) => {
                        dropdownClickHandle(key, item);
                      },
                    }}
                  >
                    {item.value} : {item.label}
                  </Dropdown.Button>
                </SortableItem>
              );
            })}
          </SortableContext>
        </DndContext>
        <Button type="link" onClick={addHandle}>
          添加数据
        </Button>
        <Modal width={600} title="添加数据" open={visible} onCancel={closeHandle} onOk={okHandle} okText="确定" cancelText="取消">
          <Form name="form" form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} autoComplete="off">
            <Form.Item label="value" name="value" rules={[{ required: true, message: "value必须填写" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="label" name="label" rules={[{ required: true, message: "label必须填写" }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  },
} as Rock;
