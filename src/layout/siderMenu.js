import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { throttle } from "lodash";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import MyIcon from "@/components/icon";
import menuList from "@/common/menu";
import { addOpenedMenu, setOpenKey, setSelectKey } from "@/store/action";

const { Sider } = Layout;
const { SubMenu } = Menu;

const allMenukey = menuList.reduce((a, c) => {
  a.push(c.key);
  if (c.children) {
    a.push(...c.children.map((i) => i.key));
  }
  return a;
}, []);

const mapDispatchToProps = (dispatch) => ({
  addOpenedMenuFn: (val) => dispatch(addOpenedMenu(val)),
  setSelectedKeys: (val) => dispatch(setSelectKey(val)),
  setOpenKeys: (val) => dispatch(setOpenKey(val)),
});

const mapStateToProps = (state) => ({
  openKeys: state.global.openMenuKey,
  selectedKeys: state.global.selectMenuKey,
});

const MenuDom = ({
  addOpenedMenuFn,
  openKeys,
  selectedKeys,
  setSelectedKeys,
  setOpenKeys,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isFixed, setFixed] = useState(false);
  // 监听window 宽度变化
  const listenWindow = throttle(() => {
    const height = document.body.clientHeight;
    const width = document.body.clientWidth;
    if (height < 600 || width < 1100) {
      setCollapsed(true);
      setFixed(true);
      return;
    }
    if (collapsed || isFixed) {
      setFixed(false);
      setCollapsed(false);
    }
  }, 500);
  // 启动监听
  useEffect(() => {
    window.addEventListener("resize", listenWindow, false);
    return () => {
      window.removeEventListener("resize", listenWindow, false);
    };
  });
  // 菜单组折叠
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (allMenukey.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
      return;
    }
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };
  // 折叠菜单
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  // 菜单选项
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
        <SubMenu
          key={item.key}
          title={item.title}
          icon={<MyIcon type={item.icon} />}
        >
          {item.children.map((child) => {
            return (
              <Menu.Item key={child.key} icon={<MyIcon type={child.icon} />}>
                <Link to={child.path}>{child.title}</Link>
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    });
  }, []);
  // 菜单点击
  const menuClick = (items) => {
    const { key, keyPath } = items;
    if (keyPath.length === 1) {
      const openKeyInfo = menuList.find((i) => i.key === key);
      addOpenedMenuFn(openKeyInfo);
      setSelectedKeys([key]);
      setOpenKeys([]);
      return;
    }
    const findKeyInfo = (list, key) => {
      let item;
      list.some((i) => {
        if (i.key === key) {
          item = i;
          return true;
        }
        if (i.children) {
          item = findKeyInfo(i.children, key);
          return item;
        }
        return false;
      });
      return item;
    };
    const openKeyInfo = findKeyInfo(menuList, key);
    addOpenedMenuFn(openKeyInfo);
    setSelectedKeys([key]);
  };
  return (
    <Sider width={200} collapsed={collapsed} className="site-layout-background">
      <Menu
        theme="dark"
        mode="inline"
        triggerSubMenuAction="click"
        className="layout-silder-menu hide-scrollbar"
        onClick={menuClick}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
      >
        {menu}
      </Menu>
      <div className={isFixed ? "fold-control" : "fold-control fixed"}>
        <Button onClick={toggleCollapsed}>
          {collapsed ? "展开" : "收起"}
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
      </div>
    </Sider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuDom);
