import React, { useEffect, useState } from "react";
import MyIcon from "@/components/icon";
import { Modal, Form, Input, Select, message } from "antd";
import { getPower, addMenu, getMenu, getMenuInfo, editMenu } from "@/api";
import "./index.scss";

const ICON_JSON = require("@/asset/json/iconfont.json");
const ICON_PREFIX = ICON_JSON.css_prefix_text;
const ICON_DATA = ICON_JSON.glyphs;
const titleRules = [{ required: true, message: "请填写菜单标题" }];
const pathRules = [{ required: true, message: "请填写菜单路径" }];
const keyRules = [{ required: true, message: "请填写菜单key值" }];
const powerRules = [{ required: true, message: "请填写菜单权限可见" }];
const { Option } = Select;
const titleType = {
  add: "新增菜单",
  addChild: "新增子菜单",
  edit: "修改菜单信息",
};

export default function AddMenu({
  info,
  modalType = "add",
  isShow,
  setShow,
  updateMenu,
}) {
  const [form] = Form.useForm();
  const [parentKeys, setParentKey] = useState([]);
  const [powers, setPowers] = useState([]);
  const [activeFn] = useState({ add, edit, addChild: add });

  useEffect(() => {
    getMenu().then(setParentKey);
  }, []);

  useEffect(() => {
    getPower().then((res) => {
      if (res.status === 0) {
        setPowers(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (modalType === "edit" && isShow) {
      getMenuInfo({ key: info.key }).then((res) => {
        if (res.status === 0 && res.data) {
          res.data.type = res.data.type.split(",");
          form.setFieldsValue(res.data);
        }
      });
    } else if (modalType === "addChild" && isShow) {
      form.setFieldsValue({
        parentKey: info.key,
      });
    }
    // eslint-disable-next-line
  }, [modalType, isShow]);
  // 提交表单
  const submit = () => {
    form.validateFields().then((values) => {
      console.log(values);
      values.type = values.type.join(",");
      let fn = activeFn[modalType];
      fn(values);
    });
  };

  const onCancel = () => {
    form.resetFields();
    setShow(false);
  };
  function edit(data) {
    editMenu(data).then((res) => {
      const { status, msg } = res;
      if (status === 0) {
        message.success(msg);
        onCancel();
        updateMenu();
      }
    });
  }
  function add(data) {
    addMenu(data).then((res) => {
      const { status, msg } = res;
      if (status === 0) {
        message.success(msg);
        onCancel();
        updateMenu();
      }
    });
  }
  return (
    <Modal
      maskClosable={false}
      title={titleType[modalType]}
      visible={isShow}
      okText="确认"
      cancelText="取消"
      onCancel={onCancel}
      onOk={submit}
    >
      <Form form={form}>
        <Form.Item name="title" rules={titleRules} label="菜单标题">
          <Input placeholder="菜单标题" />
        </Form.Item>
        <Form.Item name="path" rules={pathRules} label="菜单路径">
          <Input placeholder="菜单路径" />
        </Form.Item>
        <Form.Item name="key" rules={keyRules} label="菜单key">
          <Input placeholder="菜单key值必须唯一，否则创建失败" />
        </Form.Item>
        {info && modalType !== "add" && (
          <Form.Item name="parentKey" label="父级菜单">
            <Select
              placeholder="父级菜单"
              disabled={
                modalType === "addChild" ||
                (modalType === "edit" && info.isParent)
              }
            >
              {parentKeys.map((parent) => (
                <Option value={parent.key} key={parent.key}>
                  {parent.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item name="type" rules={powerRules} label="菜单权限">
          <Select mode="multiple" placeholder="谁可见？">
            {powers.map((power) => (
              <Option value={power.type} key={power.type}>
                {power.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="icon" label="图标选择">
          <Select
            placeholder="图标"
            allowClear
            showSearch
            getPopupContainer={(v) => v}
          >
            {ICON_DATA.map((icon) => (
              <Option value={ICON_PREFIX + icon.font_class} key={icon.icon_id}>
                <div className="icons">
                  <MyIcon type={ICON_PREFIX + icon.font_class} />
                  <span className="title"> {icon.font_class}</span>
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
