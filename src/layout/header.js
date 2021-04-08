import React from "react";
import { Layout, Menu, Dropdown } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import logo from "@/asset/images/logo.svg";
import { connect } from "react-redux";
import { clearUser } from "@/store/action";
import { clearSessionUser } from "@/utils";
const { Header } = Layout;
const mapStateToProps = (state) => ({
  userInfo: state.global.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  userOut: () => {
    clearSessionUser();
    dispatch(clearUser());
  },
});

const RightMenu = ({ logout }) => (
  <Menu className="right-down">
    <Menu.Item key="logout" onClick={logout} icon={<LogoutOutlined />}>
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
        <span>React-ant-admin</span>
      </div>
      <div className="right" placement="bottomCenter">
        <Dropdown
          getPopupContainer={getPopupContainer}
          overlay={<RightMenu logout={userOut} />}
        >
          <div>管理员：{userInfo.username}</div>
        </Dropdown>
      </div>
    </Header>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderDom);
