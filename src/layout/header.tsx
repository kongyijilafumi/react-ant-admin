import { Layout, Menu, Dropdown } from "antd";
import logo from "@/assets/images/logo.svg";
import MyIcon from "@/components/icon/";
import { connect } from "react-redux";
import { clearUser } from "@/store/user/action";
import {
  setKey,
  saveToken,
  clearLocalDatas,
  USER_INFO,
  TOKEN,
  MENU,
} from "@/utils";
import { State, Dispatch } from "@/types"

interface LayoutHeaderProps {
  userInfo: State["user"];
  clearStateUser: () => void;
  children: JSX.Element | null
}

const { Header } = Layout;

const mapStateToProps = (state: State) => ({
  userInfo: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearStateUser: () => {
    dispatch(clearUser());
  },
});

const RightMenu = ({ logout }: {
  logout: () => void;
}) => (
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

const getPopupContainer = (HTMLElement: HTMLElement) => HTMLElement;

const LayoutHeader = ({ userInfo, clearStateUser, children }: LayoutHeaderProps) => {
  const logout = () => {
    clearLocalDatas([USER_INFO, TOKEN, MENU]);
    if (userInfo) {
      setKey(true, USER_INFO, { ...userInfo, isLogin: false });
    }
    saveToken(null);
    window.location.reload();
    clearStateUser();
  };
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
          <div>管理员：{userInfo && userInfo.username}</div>
        </Dropdown>
      </div>
    </Header>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(LayoutHeader);
