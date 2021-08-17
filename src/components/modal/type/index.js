import React, { useEffect, useState } from "react";
import { Modal, message, Tree } from "antd";
import MyForm from "@/components/form";
import { addType, editType } from "@/api";
const initFormItems = [
  {
    itemType: "input",
    itemProps: {
      rules: [{ required: true, message: "请填写权限名称" }],
      label: "权限名称",
      name: "name",
    },
    childProps: {
      placeholder: "权限名称",
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "type_id",
      hidden: true,
    },
  },
];
const ColorStyle = {
  color: "red",
};
export default function UserModal({ info, isShow, onCancel, onOk, menuList }) {
  const [form, setForm] = useState(null);
  const [menuId, setMenuId] = useState([]);
  useEffect(() => {
    if (info && form) {
      setMenuId(info.menu_id.split(",").map(Number));
      form.setFieldsValue(info);
    }
  }, [info, form]);

  const submit = () => {
    form.validateFields().then((values) => {
      let fn = Boolean(info) ? editType : addType;
      fn({ ...values, menu_id: menuId }).then((res) => {
        if (res.status === 0) {
          message.success(res.msg);
          close();
          onOk();
        }
      });
    });
  };
  const onCheck = ({ checked }) => {
    setMenuId(checked);
  };
  const close = () => {
    form.resetFields();
    setMenuId([]);
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
      <MyForm handleInstance={setForm} items={initFormItems} />
      <h3 style={ColorStyle}>选中子菜单未选中父菜单的将不会显示</h3>
      <Tree
        treeData={menuList}
        checkable
        defaultExpandAll={true}
        checkStrictly={true}
        checkedKeys={menuId}
        selectable={false}
        onCheck={onCheck}
      />
    </Modal>
  );
}
