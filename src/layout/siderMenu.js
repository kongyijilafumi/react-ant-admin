import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Affix } from "antd";
import { throttle } from "lodash";
import MyIcon from "@/components/icon";
import { getMenus } from "@/common";
import { setOpenKey } from "@/store/action";
import { filterMenuList } from "@/utils";

const { Sider } = Layout;
const { SubMenu } = Menu;

function getAllMenuKey(list) {
  return list.reduce((a, c) => {
    a.push(c.key);
    if (c.children) {
      a.push(...c.children.map((i) => i.key));
    }
    return a;
  }, []);
}

const mapDispatchToProps = (dispatch) => ({
  setOpenKeys: (val) => dispatch(setOpenKey(val)),
});

const mapStateToProps = (state) => ({
  openKeys: state.global.openMenuKey,
  selectedKeys: state.global.selectMenuKey,
  userInfo: state.global.userInfo,
});

const MenuDom = ({ openKeys, selectedKeys, setOpenKeys, userInfo }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuList, setMenu] = useState([]);
  // 设置菜单
  useEffect(() => {
    getMenus().then((res) => {
      let list = filterMenuList(res, userInfo.type);
      setMenu(list);
    });
    // eslint-disable-next-line
  }, []);
  // 监听window 宽度变化
  const listenWindow = throttle(() => {
    const height = document.body.clientHeight;
    const width = document.body.clientWidth;
    if (height < 600 || width < 1100) {
      setCollapsed(true);
      return;
    }
    if (collapsed) {
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
    if (getAllMenuKey(menuList).indexOf(latestOpenKey) === -1) {
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
          <Menu.Item key={item.key} icon={<MyIcon type={item.icon} />}>
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
  }, [menuList]);
  // 菜单点击

  return (
    <Affix>
      <Sider
        width={200}
        collapsed={collapsed}
        className="site-layout-background"
      >
        <Menu
          theme="dark"
          mode="inline"
          triggerSubMenuAction="click"
          className="layout-silder-menu hide-scrollbar"
          onOpenChange={onOpenChange}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
        >
          {menu}
        </Menu>
        <div className="fold-control fixed">
          <Button onClick={toggleCollapsed}>
            {collapsed ? "展开" : "收起"}
            <MyIcon type={collapsed ? "icon_next" : "icon_back"} />
          </Button>
        </div>
      </Sider>
    </Affix>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuDom);
