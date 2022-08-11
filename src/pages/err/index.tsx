import { Result, Button } from "antd";
import { getDefaultMenu, } from "@/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDispatchMenu, useStateOpenedMenu } from "@/store/hooks";

interface ErrProps {
  status?: 403 | 404 | 500 | '403' | '404' | '500'
  errTitle?: string
  subTitle?: string
  [name: string]: any
}


function ErrorPage(props: ErrProps) {
  const {
    status = "404",
    errTitle = "404",
    subTitle = "Sorry, the page you visited does not exist.",
  } = props;
  const { stateFilterOpenMenuKey } = useDispatchMenu()
  const openMenus = useStateOpenedMenu()
  const navigate = useNavigate()
  const location = useLocation()
  const back = useCallback(async () => {
    const url = location.pathname + (location.hash || location.search);
    // 顶部一个或以下被打开
    if (openMenus.length <= 1) {
      stateFilterOpenMenuKey([url]);
      const defaultMenu = await getDefaultMenu();
      if (defaultMenu.openedMenu.length === 0) return navigate("/", { replace: true });
      let { parentPath = '', path } = defaultMenu.openedMenu[0];
      navigate(parentPath + path, { replace: true });
      return;
    }
    // 从顶部打开的路径，再去跳转
    const menuList = openMenus.filter((i) => i.path !== url);
    stateFilterOpenMenuKey([url]);
    const next = menuList[menuList.length - 1];
    navigate(next.path, { replace: true });
  }, [location, navigate, stateFilterOpenMenuKey, openMenus]);
  return (
    <Result
      status={status}
      title={errTitle}
      subTitle={subTitle}
      extra={
        <Button type="primary" onClick={back}>
          Go Back
        </Button>
      }
    />
  );
}

export default ErrorPage;
