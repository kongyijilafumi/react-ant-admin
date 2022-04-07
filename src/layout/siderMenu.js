import React, { useCallback, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Affix, Col } from "antd";
import MyIcon from "@/components/icon";
import { setOpenKey } from "@/store/action";
import { stopPropagation } from "@/utils";
import * as layoutTypes from "@/store/layout/actionTypes";
const { Sider } = Layout;
const { SubMenu } = Menu;

const mapDispatchToProps = (dispatch) => ({
  setOpenKeys: (val) => dispatch(setOpenKey(val)),
});

const mapStateToProps = (state) => ({
  openKeys: state.menu.openMenuKey,
  selectedKeys: state.menu.selectMenuKey,
  layout: state.layout,
  menuList: state.menu.menuList,
});
const SliderContent = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  // 折叠菜单
  const toggleCollapsed = (e) => {
    setCollapsed(!collapsed);
    stopPropagation(e);
  };
  return (
    <Affix>
      <Sider width={200} collapsed={collapsed} className="">
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
const FlexBox = ({ children }) => {
  return (
    <Col sm={6} md={10} lg={15} className="fl">
      {children}
    </Col>
  );
};

const renderMenu = (item, path = "") => {
  if (item[MENU_SHOW] === false) {
    return null;
  }
  if (!item[MENU_CHILDREN]) {
    return (
      <Menu.Item key={String(item[MENU_KEY])} icon={<MyIcon type={item[MENU_ICON]} />}>
        <Link to={(path || "") + item[MENU_PATH]}>{item[MENU_TITLE]}</Link>
      </Menu.Item>
    );
  }
  return (
    <SubMenu
      key={String(item[MENU_KEY])}
      title={item[MENU_TITLE]}
      icon={<MyIcon type={item[MENU_ICON]} />}
    >
      {item[MENU_CHILDREN].map((i) => renderMenu(i, path + item[MENU_PATH]))}
    </SubMenu>
  );
};

const SiderMenu = ({ openKeys, selectedKeys, setOpenKeys, layout, menuList }) => {

  const menuComponent = useMemo(
    () => menuList && menuList.map((i) => renderMenu(i, "")),
    [menuList]
  );
  // 菜单组折叠
  const onOpenChange = useCallback((keys) => {
    setOpenKeys(keys);
  }, [setOpenKeys]);
  // classname
  const clsName = useMemo(() => {
    if (layout !== layoutTypes.SINGLE_COLUMN) {
      return "layout-silder-menu hide-scrollbar"
    }
    return "layout-silder-menu col"
  }, [layout])

  const WrapContainer = useMemo(() => {
    if (layout === layoutTypes.SINGLE_COLUMN) {
      return FlexBox
    }
    return SliderContent
  }, [layout])

  const mode = useMemo(() => {
    if (layout === layoutTypes.SINGLE_COLUMN) {
      return "horizontal"
    }
    return "inline"
  }, [layout])
  return (
    <WrapContainer>
      <Menu
        mode={mode}
        triggerSubMenuAction="click"
        className={clsName}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
      >
        {menuComponent}
      </Menu>
    </WrapContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu);
