import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Affix, Col } from "antd";
import MyIcon from "@/components/icon";
import { stopPropagation } from "@/utils";
import { MenuItem } from "@/types"
import type { MenuProps } from 'antd/es/menu';
type AntdMenuItem = Required<MenuProps>['items'][number];

import * as layoutTypes from "@/store/layout/actionTypes";
import { useDispatchMenu, useStateLayout, useStateMenuList, useStateOpenMenuKey, useStateSelectMenuKey } from "@/store/hooks";
import { useStyle } from "./style";

const { Sider } = Layout;

const getItem = (label: React.ReactNode, key?: React.Key | null, icon?: React.ReactNode, children?: AntdMenuItem[]) => ({
  key,
  icon,
  children,
  label,
}) as AntdMenuItem


const renderMenu = (item: MenuItem, path: string): AntdMenuItem => {
  if (item[MENU_SHOW] === "false") {
    return null;
  }
  if (!item.children) {
    return getItem(<Link to={path + item[MENU_PATH]}>{item[MENU_TITLE]}</Link>, item[MENU_KEY], <MyIcon type={item[MENU_ICON] as string} />)
  }
  return (
    getItem(item[MENU_TITLE], item[MENU_KEY], <MyIcon type={item[MENU_ICON] as string} />, item.children.map(i => renderMenu(i, path + item[MENU_PATH])))
  );
};

const FlexBox = ({ children }: { children: JSX.Element }) => {
  return (
    <Col sm={6} md={10} lg={15} className="fl">
      {children}
    </Col>
  );
}
const SliderContent = ({ children }: { children: JSX.Element }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { styles } = useStyle()
  // 折叠菜单
  const toggleCollapsed = (e: any) => {
    setCollapsed(!collapsed);
    stopPropagation(e);
  };
  return (
    <Affix className={styles.column}>
      <Sider width={200} collapsed={collapsed} >
        {children}
        <div className={styles.foldControl + ' fixed'}>
          <Button onClick={toggleCollapsed}>
            {collapsed ? "展开" : "收起"}
            <MyIcon type={collapsed ? "icon_next" : "icon_back"} />
          </Button>
        </div>
      </Sider>
    </Affix>
  );
};
const SiderMenu = () => {
  const openKeys = useStateOpenMenuKey()
  const selectedKeys = useStateSelectMenuKey()
  const layout = useStateLayout()
  const menuList = useStateMenuList()
  const { styles } = useStyle()
  // 菜单组折叠  
  const { stateSetOpenMenuKey: onOpenChange } = useDispatchMenu()

  // 菜单选项
  const menuComponent = useMemo(() => menuList.map(m => renderMenu(m, '')), [menuList]);

  const WrapContainer = useMemo(() => layout === layoutTypes.SINGLE_COLUMN ? FlexBox : SliderContent, [layout])

  // classname
  const clsName = useMemo(() => {
    if (layout === layoutTypes.TWO_FLANKS) {
      return ' twoFlanks hide-scrollbar'
    }
    if (layout !== layoutTypes.SINGLE_COLUMN) {
      return " hide-scrollbar"
    }
    return " col"
  }, [layout])

  const mode = useMemo(() => {
    if (layout === layoutTypes.SINGLE_COLUMN) {
      return "horizontal"
    }
    return "inline"
  }, [layout])

  return <WrapContainer>
    <Menu
      mode={mode}
      triggerSubMenuAction="click"
      className={styles.layoutSilderMenu + clsName}
      onOpenChange={onOpenChange}
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      items={menuComponent}
    />
  </WrapContainer>;
};

export default SiderMenu;
