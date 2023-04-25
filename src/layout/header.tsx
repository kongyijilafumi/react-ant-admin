import { Layout, Menu, Dropdown } from "antd";
import logo from "@/assets/images/logo.svg";
import MyIcon from "@/components/icon/";
import {
  setKey,
  saveToken,
  clearLocalDatas,
  USER_INFO,
  TOKEN,
  MENU,
} from "@/utils";
import { useCallback } from "react";
import { useDispatchUser, useStateUserInfo } from "@/store/hooks";
import { useStyle } from "./style"
interface LayoutHeaderProps {
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
  const { styles } = useStyle()
  const userInfo = useStateUserInfo()
  const { stateClearUser } = useDispatchUser()
  const logout = useCallback(() => {
    clearLocalDatas([USER_INFO, TOKEN, MENU]);
    if (userInfo) {
      setKey(true, USER_INFO, { ...userInfo, isLogin: false });
    }
    saveToken(null);
    window.location.reload();
    stateClearUser();
  }, [userInfo, stateClearUser]);
  const dropdownRender = useCallback(() => <RightMenu logout={logout} />, [logout])
  return (
    <Header className={styles.header}>
      <div className="logo">
        <img src={logo} alt="logo"></img>
        <span>react-ant-admin</span>
      </div>
      {children}
      <div className="right">
        <Dropdown
          placement="bottom"
          getPopupContainer={getPopupContainer}
          dropdownRender={dropdownRender}
        >
          <div>管理员：{userInfo && userInfo.username}</div>
        </Dropdown>
      </div>
    </Header>
  );
};
export default LayoutHeader;
