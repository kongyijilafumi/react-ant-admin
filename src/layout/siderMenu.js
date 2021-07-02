import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Affix } from "antd";
import MyIcon from "@/components/icon";
import { getMenus } from "@/common";
import { setOpenKey } from "@/store/menu/action";
import { filterMenuList, stopPropagation } from "@/utils";
import * as layoutTypes from "@/store/layout/actionTypes";
const { Sider } = Layout;
const { SubMenu } = Menu;

const mapDispatchToProps = (dispatch) => ({
  setOpenKeys: (val) => dispatch(setOpenKey(val)),
});

const mapStateToProps = (state) => ({
  openKeys: state.menu.openMenuKey,
  selectedKeys: state.menu.selectMenuKey,
  userInfo: state.user,
  layout: state.layout,
});

const SiderMenu = ({
  openKeys,
  selectedKeys,
  setOpenKeys,
  userInfo,
  layout,
}) => {
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

  // 菜单组折叠
  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };
  // 折叠菜单
  const toggleCollapsed = (e) => {
    setCollapsed(!collapsed);
    stopPropagation(e);
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
                <Link onClick={stopPropagation} to={item.path + child.path}>
                  {child.title}
                </Link>
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    });
  }, [menuList]);
  // 菜单点击
  const MenuList = (
    <Menu
      mode={layout === layoutTypes.TWO_COLUMN ? "inline" : "horizontal"}
      triggerSubMenuAction="click"
      className={
        layout === layoutTypes.TWO_COLUMN
          ? "layout-silder-menu hide-scrollbar"
          : "layout-silder-menu w800"
      }
      onOpenChange={onOpenChange}
      openKeys={openKeys}
      selectedKeys={selectedKeys}
    >
      {menu}
    </Menu>
  );
  const SliderContent = ({ children }) => {
    return (
      <Affix>
        <Sider
          width={200}
          collapsed={collapsed}
          className="site-layout-background"
        >
          {children}
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

  return layout === layoutTypes.TWO_COLUMN ? (
    <SliderContent> {MenuList} </SliderContent>
  ) : (
    MenuList
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu);
