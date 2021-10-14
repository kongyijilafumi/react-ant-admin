import React, { useMemo, useState } from "react";
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
  if (item.isShowOnMenu === false) {
    return null;
  }
  if (!item.children) {
    return (
      <Menu.Item key={item.key} icon={<MyIcon type={item.icon} />}>
        <Link to={(path || "") + item.path}>{item.title}</Link>
      </Menu.Item>
    );
  }
  return (
    <SubMenu
      key={item.key}
      title={item.title}
      icon={<MyIcon type={item.icon} />}
    >
      {item.children.map((i) => renderMenu(i, path + item.path))}
    </SubMenu>
  );
};

const SiderMenu = ({
  openKeys,
  selectedKeys,
  setOpenKeys,
  layout,
  menuList,
}) => {
  const menuComponent = useMemo(
    () => menuList && menuList.map((i) => renderMenu(i, "")),
    [menuList]
  );
  // 菜单组折叠
  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const WrapContainer =
    layout === layoutTypes.SINGLE_COLUMN ? FlexBox : SliderContent;
  return (
    <WrapContainer>
      <Menu
        mode={layout === layoutTypes.SINGLE_COLUMN ? "horizontal" : "inline"}
        triggerSubMenuAction="click"
        className={
          layout === layoutTypes.SINGLE_COLUMN
            ? "layout-silder-menu col"
            : "layout-silder-menu hide-scrollbar"
        }
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
