import { Layout, Menu, Dropdown } from "antd";
import logo from "@/assets/images/logo.svg";
import MyIcon from "@/components/icon/";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/store/user/action";
import {
  setKey,
  saveToken,
  clearLocalDatas,
  USER_INFO,
  TOKEN,
  MENU,
} from "@/utils";
import { State } from "@/types"
import { getStateUser } from "@/store/getter";
import { useCallback } from "react";

interface LayoutHeaderProps {
  userInfo: State["user"];
  clearStateUser: () => void;
  children: JSX.Element | null
}

const { Header } = Layout;


const RightMenu = ({ logout }: { logout: () => void; }) => (
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

const LayoutHeader = ({ children }: LayoutHeaderProps) => {

  const userInfo = useSelector(getStateUser)
  const dispatch = useDispatch()
  const clearStateUser = useCallback(() => dispatch(clearUser()), [dispatch])
  const logout = useCallback(() => {
    clearLocalDatas([USER_INFO, TOKEN, MENU]);
    if (userInfo) {
      setKey(true, USER_INFO, { ...userInfo, isLogin: false });
    }
    saveToken(null);
    window.location.reload();
    clearStateUser();
  }, [userInfo, clearStateUser]);
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
export default LayoutHeader;
