import React, { useEffect, useState } from "react";
import { Row, Button, message, Popconfirm } from "antd";
import { getMenuList as apiGetList, delMenu } from "@/api";
import MenuModal from "@/components/modal/menu";
import MyTable from "@/components/table";
import MyIcon from "@/components/icon";
import "./index.less";

function useMenu() {
  const [menus, setMenu] = useState([]);
  const [tabCol, setCol] = useState([]);
  const [selectInfo, setSelectInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const menuAction = {
    title: "操作",
    dataIndex: "action",
    align: "center",
    render: (text, record) => {
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
        console.log(res);
        res.mapKey.push(menuAction);
        res.mapKey.forEach((item) => {
          if (item.dataIndex === "icon") {
            item.render = (text) =>
              text ? <MyIcon className="preview" type={text} /> : "暂未设置";
          } else if (item.dataIndex === "keepAlive") {
            item.render = (text) => (text === "true" ? "保持" : "关闭销毁");
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

  const openModal = (type, { key, parentKey }) => {
    setSelectInfo({ key, isParent: !Boolean(parentKey) });
    setModalType(type);
    setShowModal(true);
  };

  const deleteMenu = (info) => {
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
      <MyTable dataSource={menus} columns={tabCol} saveKey="MENUTABLE" />
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
  path: "/power/menu",
};
