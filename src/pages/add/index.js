import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import { addMenu, getMenu } from "@/api";
const Option = Select.Option;
export default function Add() {
  const [form] = Form.useForm();
  const [keys, setKey] = useState([]);
  useEffect(() => {
    getMenu().then((res) => {
      let list = res.filter((i) => i.parentKey === "");
      let keys = list.map((i) => i.key);
      setKey(keys);
    });
  }, []);
  const onFinish = (valuse) => {
    valuse.type = valuse.type ? valuse.type.join(",") : "";
    addMenu(valuse).then((res) => {
      const { msg } = res;
      message.success(msg);
      form.resetFields();
    });
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        form={form}
        initialValues={{ parentKey: "", icon: "" }}
      >
        <Form.Item name="title">
          <Input placeholder="title" />
        </Form.Item>
        <Form.Item name="path">
          <Input placeholder="path" />
        </Form.Item>
        <Form.Item name="key">
          <Input placeholder="key" />
        </Form.Item>
        <Form.Item name="parentKey">
          <Select>
            {keys.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="type">
          <Select mode="multiple">
            <Option value="1">1</Option>
            <Option value="0">0</Option>
          </Select>
        </Form.Item>
        <Form.Item name="icon">
          <Input placeholder="icon" />
        </Form.Item>
        <Form.Item className="btns">
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
