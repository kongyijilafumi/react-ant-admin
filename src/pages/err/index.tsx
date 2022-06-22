import { Result, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getDefaultMenu, } from "@/utils";
import { filterOpenKey } from "@/store/menu/action";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { getStateOpenMenu } from "@/store/getter";

interface ErrProps {
  status: 403 | 404 | 500 | '403' | '404' | '500'
  errTitle: string
  subTitle: string
  [name: string]: any
}


function ErrorPage(props: ErrProps) {
  const {
    status = "404",
    errTitle = "404",
    subTitle = "Sorry, the page you visited does not exist.",
  } = props;
  const dispatch = useDispatch()
  const filterOpenKeyFn = useCallback((key: string[]) => dispatch(filterOpenKey(key)), [dispatch])
  const navigate = useNavigate()
  const location = useLocation()
  const openMenus = useSelector(getStateOpenMenu)
  const back = useCallback(async () => {
    const url = location.pathname + (location.hash || location.search);
    // 顶部一个或以下被打开
    if (openMenus.length <= 1) {
      filterOpenKeyFn([url]);
      const defaultMenu = await getDefaultMenu();
      if (defaultMenu.openedMenu.length === 0) return navigate("/", { replace: true });
      let { parentPath = '', path } = defaultMenu.openedMenu[0];
      navigate(parentPath + path, { replace: true });
      return;
    }
    // 从顶部打开的路径，再去跳转
    const menuList = openMenus.filter((i) => i.path !== url);
    filterOpenKeyFn([url]);
    const next = menuList[menuList.length - 1];
    navigate(next.path, { replace: true });
  }, [location, navigate, filterOpenKeyFn, openMenus]);
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
