import React, { useEffect } from "react";
import { Modal, Form, Input, message } from "antd";
import { addType, editType } from "@/api";
const NRule = [{ required: true, message: "请填写权限名称" }];
const TRule = [{ required: true, message: "请填写权限简称" }];

export default function UserModal({ info, isShow, onCancel, onOk }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (info && form) {
      form.setFieldsValue(info);
    }
    // eslint-disable-next-line
  }, [info]);

  const submit = () => {
    form.validateFields().then((values) => {
      let fn = Boolean(info) ? editType : addType;
      fn(values).then((res) => {
        if (res.status === 0) {
          message.success(res.msg);
          close();
          onOk();
        }
      });
    });
  };
  const close = () => {
    form.resetFields();
    onCancel(null, false);
  };
  return (
    <Modal
      maskClosable={false}
      title={info ? "修改权限" : "添加权限"}
      visible={isShow}
      okText="确认"
      cancelText="取消"
      onCancel={close}
      onOk={submit}
    >
      <Form form={form}>
        <Form.Item name="name" rules={NRule} label="权限名称">
          <Input placeholder="权限名称" />
        </Form.Item>
        <Form.Item name="type" rules={TRule} label="权限简称">
          <Input disabled={Boolean(info)} placeholder="权限简称,推荐使用英文或者数字，且唯一" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
