import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import MyForm from "@/components/form";
const initFormItems = [
  {
    itemType: "inputText",
    itemProps: {
      name: "f_back",
    },
    childProps: {
      placeholder: "回复内容",
      rows: 4,
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "fd_id",
      hidden: true,
    },
  },
];

export default function FeedbackModal({ id, isShow, onSubmit, onCancel }) {
  const [form, setForm] = useState(null);
  useEffect(() => {
    if (id && form) {
      form.setFieldsValue({ fd_id: id });
    }
  }, [id, form]);

  const submit = () => {
    const data = form.getFieldsValue();
    onSubmit(data);
  };

  const close = () => {
    form.resetFields();
    onCancel(null, false);
  };
  return (
    <Modal
      maskClosable={false}
      title="回复"
      visible={isShow}
      okText="确认"
      cancelText="取消"
      onCancel={close}
      onOk={submit}
    >
      <MyForm handleInstance={setForm} items={initFormItems} />
    </Modal>
  );
}
