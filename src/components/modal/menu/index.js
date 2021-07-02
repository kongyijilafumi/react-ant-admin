import React, { useEffect, useState } from "react";
import MyIcon from "@/components/icon";
import { Modal, Form, Input, Select, message, Radio, InputNumber } from "antd";
import { getPower, addMenu, getMenuInfo, editMenu } from "@/api";
import "./index.less";

const ICON_JSON = require("@/assets/json/iconfont.json");
const ICON_PREFIX = ICON_JSON.css_prefix_text;
const ICON_DATA = ICON_JSON.glyphs;
const titleRules = [{ required: true, message: "请填写菜单标题" }];
const pathRules = [{ required: true, message: "请填写菜单路径" }];
const keyRules = [{ required: true, message: "请填写菜单key值" }];
const powerRules = [{ required: true, message: "请填写菜单权限可见" }];
const keepRules = [{ required: true, message: "请选择菜单缓存模式" }];
const orderRules = [
  { type: "number", min: 0, max: 10000, message: "请正确填写菜单排序大小" },
  { required: true, message: "请填写菜单排序大小" },
];
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
  menus = [],
}) {
  const [form] = Form.useForm();
  const [powers, setPowers] = useState([]);
  const [activeFn] = useState({ add, edit, addChild: add });

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
  }, [modalType, isShow, info]);
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
              {menus.map((menu) => (
                <Option value={menu.key} key={menu.key}>
                  <div className="icons">
                    <MyIcon type={menu.icon} />
                    <span className="title"> {menu.title}</span>
                  </div>
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
        <Form.Item rules={keepRules} name="keepAlive" label="页面是否缓存">
          <Radio.Group>
            <Radio value="true">是</Radio>
            <Radio value="false">否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          className="ipt-number"
          rules={orderRules}
          name="order"
          label="菜单排序"
        >
          <InputNumber placeholder="数值越小越靠前" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
