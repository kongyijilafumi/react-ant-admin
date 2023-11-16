import { ReactNode, useEffect, useState } from "react";
import MyIcon from "@/components/icon";
import MyForm, { FormItemData } from "@/components/form";
import { Modal, Select, message, FormInstance } from "antd";
import { addMenu, getMenuInfo, editMenu } from "@/api";
import { MenuList, MenuItem } from "@/types"
import { ModalType, SelectInfo } from "@/pages/power/menu"
import ICON_JSON from "@/assets/json/iconfont.json";

import "./index.less";
interface IconItem {
  icon_id: string,
  name: string,
  font_class: string,
  unicode: string,
  unicode_decimal: number
}

interface MenuModalProps {
  info: SelectInfo
  modalType: ModalType
  isShow: boolean
  setShow: (s: boolean) => void
  updateMenu: () => void
  menus: MenuList
}

interface ActiveFn {
  add: (data: MenuItem) => void;
  edit: (data: MenuItem) => void;
  addChild: (data: MenuItem) => void;
}
const ICON_PREFIX: string = ICON_JSON.css_prefix_text;
const ICON_DATA: IconItem[] = ICON_JSON.glyphs;
const { Option } = Select;
const titleType: {
  add: string;
  addChild: string;
  edit: string;
} = {
  add: "新增菜单",
  addChild: "新增子菜单",
  edit: "修改菜单信息",
};

const initFormItems: FormItemData[] = [
  {
    itemType: "input",
    itemProps: {
      rules: [{ required: true, message: "请填写菜单标题" }],
      label: "菜单标题",
      name: MENU_TITLE,
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
      name: MENU_PATH,
    },
    childProps: {
      placeholder: "菜单路径",
    },
  },
  {
    itemType: "select",
    itemProps: {
      label: "父级菜单",
      name: MENU_PARENTKEY,
    },
    childProps: {
      placeholder: "父级菜单",
    },
  },
  {
    itemType: "select",
    itemProps: {
      label: "菜单图标",
      name: MENU_ICON,
    },
    childProps: {
      placeholder: "图标",
      allowClear: true,
      showSearch: true,
      getPopupContainer: (v: ReactNode) => v,
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
      name: MENU_KEEPALIVE,
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
      name: MENU_ORDER,
      label: "菜单排序",
    },
    childProps: {
      placeholder: "数值越小越靠前",
    },
  },
];

function getMenuList(list: MenuList, id: number | string) {
  let menu: MenuList = []
  const findList = (ls: MenuList): boolean => {
    return ls.some(item => {
      let l = item[MENU_CHILDREN]
      if (item[MENU_KEY] === id) {
        menu = ls
        return true
      } else if (Array.isArray(l) && l.length) {
        let d = findList(l)
        if (d) {
          menu = l
        }
        return d
      }
      return false
    })
  }
  findList(list)
  return menu
}

export default function MenuModal({
  info,
  modalType = "add",
  isShow,
  setShow,
  updateMenu,
  menus = [],
}: MenuModalProps) {
  const [form, setForm] = useState<FormInstance | null>(null);
  const [activeFn] = useState<ActiveFn>({ add, edit, addChild: add });
  const [formItems, setItems] = useState<FormItemData[]>([]);
  // form item
  useEffect(() => {
    if (modalType !== "add" && menus && info) {
      let items = [...initFormItems.map((i) => ({ ...i }))];
      items.forEach((i) => {
        if (i.itemProps.name === MENU_PARENTKEY) {
          let disabled = modalType === "addChild" || (modalType === "edit" && info.isParent);
          i.childProps && (i.childProps.disabled = disabled)
          let childrenList = modalType === "addChild" ? getMenuList(menus, info[MENU_KEY] as string) : menus
          if (i.childProps) {
            i.childProps.children = childrenList.map((menu) => (
              <Option value={menu[MENU_KEY]} key={menu[MENU_KEY]}>
                <div className="icons">
                  <MyIcon type={menu[MENU_ICON] as string} />
                  <span className="title"> {menu[MENU_TITLE]}</span>
                </div>
              </Option>
            ));
          }

        }
      });
      setItems(items);
    } else if (info && modalType === "add" && menus) {
      let items = [...initFormItems.map((i) => ({ ...i }))];
      items = items.filter((i) => i.itemProps.name !== MENU_PARENTKEY);
      setItems(items);
    }
  }, [modalType, info, menus]);

  useEffect(() => {
    if (modalType === "edit" && isShow && form) {
      getMenuInfo({ key: info && info[MENU_KEY] }).then((res) => {
        if (res.status === 0 && res.data) {
          form.setFieldsValue(res.data);
        }
      });
    } else if (modalType === "addChild" && isShow && form) {
      form.setFieldsValue({
        [MENU_PARENTKEY]: info && info[MENU_KEY],
      });
    }
  }, [modalType, isShow, info, form]);
  // 提交表单
  const submit = () => {
    form && form.validateFields().then((values) => {
      let fn = activeFn[modalType];
      fn(values);
    });
  };

  const onCancel = () => {
    form && form.resetFields();
    setShow(false);
  };
  function edit(data: MenuItem) {
    editMenu(data).then((res) => {
      const { status, msg } = res;
      if (status === 0) {
        message.success(msg);
        onCancel();
        updateMenu();
      }
    });
  }
  function add(data: MenuItem) {
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
      open={isShow}
      okText="确认"
      cancelText="取消"
      onCancel={onCancel}
      onOk={submit}
    >
      <MyForm handleInstance={setForm} items={formItems} />
    </Modal>
  );
}
