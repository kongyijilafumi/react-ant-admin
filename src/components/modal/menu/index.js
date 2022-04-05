import React, { useEffect, useState } from "react";
import MyIcon from "@/components/icon";
import MyForm from "@/components/form";
import { Modal, Select, message } from "antd";
import { addMenu, getMenuInfo, editMenu } from "@/api";
import "./index.less";

const ICON_JSON = require("@/assets/json/iconfont.json");
const ICON_PREFIX = ICON_JSON.css_prefix_text;
const ICON_DATA = ICON_JSON.glyphs;

const { Option } = Select;
const initFormItems = [
  {
    itemType: "input",
    itemProps: {
      rules: [{ required: true, message: "请填写菜单标题" }],
      label: "菜单标题",
      name: "title",
    },
    childProps: {
      placeholder: "菜单标题",
    },
  },
  {
    itemType: "input",
    itemProps: {
      rules: [{ required: true, message: "请填写菜单路径" }],
      label: "菜单路径",
      name: "path",
    },
    childProps: {
      placeholder: "菜单路径",
    },
  },
  {
    itemType: "input",
    itemProps: {
      rules: [{ required: true, message: "请填写菜单key值" }],
      label: "菜单key",
      name: "key",
    },
    childProps: {
      placeholder: "菜单key值必须唯一，否则创建失败",
    },
  },
  {
    itemType: "select",
    itemProps: {
      label: "父级菜单",
      name: "parentKey",
    },
    childProps: {
      placeholder: "父级菜单",
    },
  },
  {
    itemType: "select",
    itemProps: {
      label: "菜单图标",
      name: "icon",
    },
    childProps: {
      placeholder: "图标",
      allowClear: true,
      showSearch: true,
      getPopupContainer: (v) => v,
      children: ICON_DATA.map((icon) => (
        <Option value={ICON_PREFIX + icon.font_class} key={icon.icon_id}>
          <div className="icons">
            <MyIcon type={ICON_PREFIX + icon.font_class} />
            <span className="title"> {icon.font_class}</span>
          </div>
        </Option>
      )),
    },
  },
  {
    itemType: "radio",
    itemProps: {
      rules: [{ required: true, message: "请选择菜单缓存模式" }],
      name: "keepAlive",
      label: "页面是否缓存",
    },
    childProps: {
      options: [
        { label: "是", value: "true" },
        { label: "否", value: "false" },
      ],
    },
  },
  {
    itemType: "inputNumber",
    itemProps: {
      className: "ipt-number",
      rules: [
        {
          type: "number",
          min: 0,
          max: 10000,
          message: "请正确填写菜单排序大小",
        },
        { required: true, message: "请填写菜单排序大小" },
      ],
      name: "order",
      label: "菜单排序",
    },
    childProps: {
      placeholder: "数值越小越靠前",
    },
  },
];
const titleType = {
  add: "新增菜单",
  addChild: "新增子菜单",
  edit: "修改菜单信息",
};

export default function MenuModal({
  info,
  modalType = "add",
  isShow,
  setShow,
  updateMenu,
  menus = [],
}) {
  const [form, setForm] = useState(null);
  const [formItems, setItems] = useState([]);

  // form item
  useEffect(() => {
    if (modalType !== "add" && menus && info) {
      let items = [...initFormItems.map((i) => ({ ...i }))];
      items.forEach((i) => {
        if (i.itemProps.name === "parentKey") {
          i.childProps.disabled =
            modalType === "addChild" || (modalType === "edit" && info.isParent);
          i.childProps.children = menus.map((menu) => (
            <Option value={menu[MENU_KEY]} key={menu[MENU_KEY]}>
              <div className="icons">
                <MyIcon type={menu[MENU_ICON]} />
                <span className="title"> {menu[MENU_TITLE]}</span>
              </div>
            </Option>
          ));
        }
      });
      setItems(items);
    } else if (info && modalType === "add" && menus) {
      let items = [...initFormItems.map((i) => ({ ...i }))];
      items = items.filter((i) => i.itemProps.name !== "parentKey");
      setItems(items);
    }
  }, [modalType, info, menus]);

  useEffect(() => {
    if (modalType === "edit" && isShow && form) {
      getMenuInfo({ key: info[MENU_KEY] }).then((res) => {
        if (res.status === 0 && res.data) {
          form.setFieldsValue(res.data);
        }
      });
    } else if (modalType === "addChild" && isShow && form) {
      form.setFieldsValue({
        parentKey: info[MENU_KEY],
      });
    }
  }, [modalType, isShow, info, form]);
  // 提交表单
  const submit = () => {
    form.validateFields().then((values) => {
      const activeFn = { add, edit, addChild: add };
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
      <MyForm handleInstance={setForm} items={formItems} />
    </Modal>
  );
}
