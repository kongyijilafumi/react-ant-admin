import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import menuList from "@/common/menu";
const { Sider } = Layout;
const { SubMenu } = Menu;
const allMenukey = menuList.reduce((a, c) => {
  a.push(c.key);
  if (c.children) {
    a.push(...c.children.map((i) => i.key));
  }
  return a;
}, []);
const MenuDom = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  useEffect(() => {
    menuList.some((list) => {
      if (list.children) {
        setOpenKeys([list.key]);
        setSelectedKeys([list.children[0].key]);
        return true;
      }
      return false;
    });
  }, []);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (allMenukey.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const menu = useMemo(() => {
    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        );
      }
      return (
        <SubMenu key={item.key} title={item.title}>
          {item.children.map((child) => {
            return (
              <Menu.Item key={child.key}>
                <Link to={child.path}>{child.title}</Link>
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    });
  }, []);
  const menuClick = ({ key }) => {
    setSelectedKeys([key]);
  };
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        theme="dark"
        mode="inline"
        onClick={menuClick}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        style={{ height: "100%", borderRight: 0 }}
      >
        {menu}
      </Menu>
    </Sider>
  );
};

export default MenuDom;
