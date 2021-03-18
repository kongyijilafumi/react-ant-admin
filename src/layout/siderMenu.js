import React, { useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
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

const MenuDom = ({
  addOpenedMenuFn,
  openKeys,
  selectedKeys,
  setSelectedKeys,
  setOpenKeys,
}) => {
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

  const menuClick = (items) => {
    const { key, keyPath } = items;
    if (keyPath.length === 1) {
      const openKeyInfo = menuList.find((i) => i.key === key);
      addOpenedMenuFn(openKeyInfo);
      setSelectedKeys([key]);
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
const mapDispatchToProps = (dispatch) => ({
  addOpenedMenuFn: (val) => dispatch(addOpenedMenu(val)),
  setSelectedKeys: (val) => dispatch(setSelectKey(val)),
  setOpenKeys: (val) => dispatch(setOpenKey(val)),
});
const mapStateToProps = (state) => ({
  openKeys: state.global.openMenuKey,
  selectedKeys: state.global.selectMenuKey,
});
export default connect(mapStateToProps, mapDispatchToProps)(MenuDom);
