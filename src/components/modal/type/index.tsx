import { useEffect, useMemo, useState } from "react";
import { Modal, message, Tree, FormInstance } from "antd";
import MyForm, { FormItemData } from "@/components/form";
import { addType, editType } from "@/api";
import { MenuItem, MenuList } from "@/types";
import { reduceMenuList } from "@/utils";
const initFormItems: FormItemData[] = [
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
export type Info = { name: string, type: string, menu_id: string } | null
interface ModalProps {
  info: Info
  isShow: boolean
  onCancel: (i: Info, b: boolean) => void
  onOk: () => void
  menuList: MenuList
}
type CheckList = Array<string | number>
const ColorStyle = {
  color: "red",
};

function pushParentId(checkList: CheckList, list: MenuList, id: MenuItem["key"]) {
  const info = list.find(item => item[MENU_KEY] === id)
  if (!info) {
    return
  }

  const parentId: string = info.parentId
  if (parentId && !checkList.includes(parentId)) {
    checkList.push(parentId)
    pushParentId(checkList, list, parentId)
  }
}
function filterParentId(parent: CheckList, list: MenuList, id: MenuItem["key"]) {
  const find = list.find(item => item[MENU_KEY] === id)
  if (!find) {
    return
  }
  const pid = find.parentId
  if (pid) {
    if (!parent.includes(pid)) {
      parent.push(pid)
    }
    filterParentId(parent, list, pid)
  }
}

export default function TypeModal({ info, isShow, onCancel, onOk, menuList }: ModalProps) {
  const [form, setForm] = useState<FormInstance | null>(null);
  const [menuId, setMenuId] = useState<number[]>([]);
  const reducerList = useMemo(() => {
    if (menuList) {
      return reduceMenuList(menuList)
    }
    return []
  }, [menuList])

  useEffect(() => {
    if (info && form && reducerList) {
      const parentId: CheckList = [], childId: CheckList = []
      const checkId = info.menu_id.split(",").map(Number)
      checkId.forEach(id => {
        filterParentId(parentId, reducerList, id)
        if (!parentId.includes(id) && !childId.includes(id)) {
          childId.push(id)
        }
      })
      setMenuId(childId as Array<number>);
      form.setFieldsValue(info);
    } else {
      setMenuId([])
    }
  }, [info, form, reducerList]);

  const submit = () => {
    form?.validateFields().then((values) => {
      let fn = Boolean(info) ? editType : addType;
      let checkMenuId: CheckList = []
      menuId.forEach(id => {
        if (!checkMenuId.includes(id)) {
          checkMenuId.push(id)
        }
        pushParentId(checkMenuId, reducerList, id)
      })
      console.log(checkMenuId);
      fn({ ...values, menu_id: checkMenuId }).then((res) => {
        if (res.status === 0) {
          message.success(res.msg);
          close();
          onOk();
        }
      });
    });
  };
  const onCheck = (checked: number[]) => {
    setMenuId(checked);
  };
  const close = () => {
    form?.resetFields();
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
        checkedKeys={menuId}
        selectable={false}
        onCheck={onCheck as any}
      />
    </Modal>
  );
}
