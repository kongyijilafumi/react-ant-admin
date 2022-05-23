import React, { useCallback } from "react";
import { Result, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getDefaultMenu } from "@/utils";
import { filterOpenKey } from "@/store/menu/action";
import { getOpenedMenu } from "@/store/getters";
import { useHistory } from "react-router-dom";

function useErrorPage(props) {
  const {
    status = "404",
    errTitle = "404",
    subTitle = "Sorry, the page you visited does not exist.",
  } = props;
  const openedMenu = useSelector(getOpenedMenu)
  const dispatch = useDispatch()
  const history = useHistory()
  const filterOpenKeyFn = useCallback((key) => dispatch(filterOpenKey(key)), [dispatch])
  const back = useCallback(async () => {
    const url =
      history.location.pathname +
      (history.location.hash || history.location.search);
    // 顶部一个或以下被打开
    if (openedMenu.length <= 1) {
      filterOpenKeyFn([url]);
      const defaultMenu = await getDefaultMenu();
      if (defaultMenu.openedMenu.length === 0) return history.replace("/");
      let { parentPath, path } = defaultMenu.openedMenu[0];
      history.replace(parentPath + path);
      return;
    }
    // 从顶部打开的路径，再去跳转
    const menuList = openedMenu.filter((i) => i.path !== url);
    filterOpenKeyFn([url]);
    const next = menuList[menuList.length - 1];
    history.replace(next.path);
  }, [history, openedMenu, filterOpenKeyFn])
  return { status, errTitle, subTitle, back };
}

function ErrorPage(props) {
  const { status, errTitle, subTitle, back } = useErrorPage(props);
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
