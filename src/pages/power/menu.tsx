import { useEffect, useState } from "react";
import { Row, Button, message, Popconfirm } from "antd";
import { getMenuList as apiGetList, delMenu } from "@/api";
import MenuModal from "@/components/modal/menu";
import MyTable from "@/components/table";
import MyIcon from "@/components/icon";
import { MenuList, MapKey } from "@/types"
import "./index.less";


export type ModalType = "add" | "addChild" | "edit"
export type SelectInfo = {
  [MENU_KEY]?: string
  isParent?: Boolean
}

function useMenu() {
  const [menus, setMenu] = useState<MenuList>([]);
  const [tabCol, setCol] = useState<MapKey>([]);
  const [selectInfo, setSelectInfo] = useState<SelectInfo>({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('add');


  const menuAction = {
    title: "操作",
    dataIndex: "action",
    key: "action",
    align: "center",
    render: (text: any, record: any) => {
      return (
        <Row>
          <Button type="link" onClick={() => openModal("edit", record)}>
            编辑
          </Button>
          <Button type="link" onClick={() => openModal("addChild", record)}>
            添加子菜单
          </Button>
          <Popconfirm
            onConfirm={() => deleteMenu(record)}
            okText="确认"
            title="删除选中菜单会一同删除其下所有子菜单，确认删除？"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Row>
      );
    },
  };
  const getMenuList = () => {
    apiGetList().then((res) => {
      if (res) {
        res.mapKey.push(menuAction);
        res.mapKey.forEach((item) => {
          if (item.dataIndex === "icon") {
            item.render = (text: string | null) =>
              text ? <MyIcon className="preview" type={text} /> : "暂未设置";
          } else if (item.dataIndex === MENU_KEEPALIVE) {
            item.render = (text: string) => (text === "true" ? "保持" : "关闭销毁");
          } else if (item.dataIndex === MENU_SHOW) {
            item.render = (t: string) => t === "true" ? '显示' : '隐藏'
          }
        });
        setCol(res.mapKey);
        setMenu(res.data);
      }
    });
  };

  useEffect(() => {
    getMenuList();
    // eslint-disable-next-line
  }, []);

  const openModal = (type: ModalType, { [MENU_KEY]: key, isParent }: SelectInfo) => {
    setSelectInfo({ [MENU_KEY]: key, isParent: !Boolean(isParent) });
    setModalType(type);
    setShowModal(true);
  };

  const deleteMenu = (info: any) => {
    delMenu(info).then((res) => {
      const { msg, status } = res;
      if (status === 0) {
        message.success(msg);
        getMenuList();
      }
    });
  };
  const addMenu = () => {
    openModal("add", {});
  };
  return {
    selectInfo,
    menus,
    showModal,
    modalType,
    tabCol,
    setShowModal,
    getMenuList,
    addMenu,
  };
}

export default function Menu() {
  const {
    selectInfo,
    menus,
    showModal,
    modalType,
    tabCol,
    setShowModal,
    getMenuList,
    addMenu,
  } = useMenu();
  return (
    <div className="powermenu-container">
      <Button type="primary" onClick={addMenu}>
        新增菜单
      </Button>
      <MyTable dataSource={menus} rowKey={`${MENU_KEY}`} columns={tabCol} saveKey="MENUTABLE" />
      <MenuModal
        menus={menus}
        isShow={showModal}
        info={selectInfo}
        modalType={modalType}
        setShow={setShowModal}
        updateMenu={getMenuList}
      />
    </div>
  );
}

Menu.route = {
  [MENU_PATH]: "/power/menu"
}