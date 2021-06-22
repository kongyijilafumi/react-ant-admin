import React from "react";
import { Layout, Menu, Dropdown } from "antd";
import logo from "@/assets/images/logo.svg";
import MyIcon from "@/components/icon/";
import { connect } from "react-redux";
import { clearUser } from "@/store/user/action";
import { clearSessionUser, setKey, saveToken } from "@/utils";
const { Header } = Layout;
const mapStateToProps = (state) => ({
  userInfo: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  userOut: (info) => {
    clearSessionUser();
    info.isLogin = false;
    saveToken();
    setKey(true, "userInfo", info);
    dispatch(clearUser());
  },
});

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

const HeaderDom = ({ userInfo, userOut }) => {
  return (
    <Header className="header">
      <div className="logo">
        <img src={logo} alt="logo"></img>
        <span>react-ant-admin</span>
      </div>
      <div className="right" placement="bottomCenter">
        <Dropdown
          getPopupContainer={getPopupContainer}
          overlay={<RightMenu logout={() => userOut(userInfo)} />}
        >
          <div>管理员：{userInfo.username}</div>
        </Dropdown>
      </div>
    </Header>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderDom);
