import React, { useEffect, useState } from "react";
import { Tree, Row, Col, Button, message, Popconfirm } from "antd";
import MyIcon from "@/components/icon";
import { getMenu, delMenu } from "@/api";
import AddModal from "@/components/modal/add-menu";
import "./index.scss";

const { TreeNode } = Tree;

export default function Menu() {
  const [menus, setMenu] = useState([]);
  const [selectInfo, setSelectInfo] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [modalType, setModalType] = useState("");
  useEffect(() => {
    getMenuList();
  }, []);

  const onSelect = (selectedKeys, info) => {
    let { key, pos } = info.node;
    if (info.selected) {
      setSelectInfo({ key, isParent: Boolean(pos.split("-").length === 2) });
      return;
    }
    setSelectInfo(null);
  };

  const getMenuList = () => {
    getMenu().then(setMenu);
  };

  const addMenu = () => {
    openModal("add");
  };
  const addChildMenu = () => {
    openModal("addChild");
  };

  const openModal = (type) => {
    setModalType(type);
    setShowAdd(true);
  };

  const setMenuInfo = () => {
    openModal("edit");
  };
  const deleteMenu = () => {
    delMenu(selectInfo).then((res) => {
      const { msg, status } = res;
      if (status === 0) {
        message.success(msg);
        getMenuList();
      }
    });
  };
  return (
    <div className="powermenu-container">
      <div className="top-form">
        <Button
          type="primary"
          onClick={addChildMenu}
          disabled={!selectInfo || !selectInfo.isParent}
        >
          新增子菜单
        </Button>
        <Button type="primary" onClick={addMenu}>
          新增菜单
        </Button>
        <Button
          type="dashed"
          onClick={setMenuInfo}
          danger
          disabled={!selectInfo}
        >
          修改菜单
        </Button>
        <Popconfirm
          disabled={!selectInfo}
          onConfirm={deleteMenu}
          okText="确认"
          title="删除选中菜单会一同删除其下所有子菜单，确认删除？"
          cancelText="取消"
        >
          <Button danger disabled={!selectInfo}>
            删除菜单
          </Button>
        </Popconfirm>
      </div>
      <Row className="tree-data">
        <Col span={8}>
          {menus.length && (
            <Tree blockNode showIcon onSelect={onSelect}>
              {menus.map((item) => (
                <TreeNode
                  key={item.key}
                  title={item.title}
                  icon={item.icon && <MyIcon type={item.icon} />}
                  children={
                    item.children &&
                    item.children.map((child) => (
                      <TreeNode
                        key={child.key}
                        title={child.title}
                        icon={child.icon && <MyIcon type={child.icon} />}
                      />
                    ))
                  }
                />
              ))}
            </Tree>
          )}
        </Col>
      </Row>
      <AddModal
        isShow={showAdd}
        info={selectInfo}
        modalType={modalType}
        setShow={setShowAdd}
        updateMenu={getMenuList}
      />
    </div>
  );
}
