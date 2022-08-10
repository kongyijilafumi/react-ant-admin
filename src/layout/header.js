import React, { useCallback } from "react";
import { Layout, Menu, Dropdown } from "antd";
import logo from "@/assets/images/logo.svg";
import MyIcon from "@/components/icon/";
import { clearLocalDatas } from "@/utils";
import { USER_INFO, TOKEN, MENU, } from "@/common"
import { useDispatchUser, useStateUserInfo } from "@/store/hooks";
const { Header } = Layout;

const RightMenu = ({ logout }) => (
  <Menu className="right-down">
    <Menu.Item
      key="logout"
      onClick={logout}
      icon={<MyIcon type="icon_disconnectdevice" />}
    >
      退出登录
    </Menu.Item>
  </Menu>
);

const getPopupContainer = (HTMLElement) => HTMLElement;

const LayoutHeader = ({ children }) => {
  const userInfo = useStateUserInfo()
  const { stateClearUser: clearStateUser } = useDispatchUser()
  const logout = useCallback(() => {
    clearLocalDatas([USER_INFO, TOKEN, MENU]);
    window.location.reload();
    clearStateUser();
  }, [clearStateUser]);
  return (
    <Header className="header">
      <div className="logo">
        <img src={logo} alt="logo"></img>
        <span>react-ant-admin</span>
      </div>
      {children}
      <div className="right">
        <Dropdown
          placement="bottomCenter"
          getPopupContainer={getPopupContainer}
          overlay={<RightMenu logout={logout} />}
        >
          <div>管理员：{userInfo.username}</div>
        </Dropdown>
      </div>
    </Header>
  );
};
export default LayoutHeader
